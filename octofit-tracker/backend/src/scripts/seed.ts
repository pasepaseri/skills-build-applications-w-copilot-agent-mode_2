import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { username: 'alex.rivera', email: 'alex.rivera@example.com', displayName: 'Alex Rivera', fitnessLevel: 'intermediate' },
      { username: 'maya.chen', email: 'maya.chen@example.com', displayName: 'Maya Chen', fitnessLevel: 'advanced' },
      { username: 'jordan.lee', email: 'jordan.lee@example.com', displayName: 'Jordan Lee', fitnessLevel: 'beginner' },
      { username: 'sam.taylor', email: 'sam.taylor@example.com', displayName: 'Sam Taylor', fitnessLevel: 'intermediate' },
      { username: 'riley.patel', email: 'riley.patel@example.com', displayName: 'Riley Patel', fitnessLevel: 'advanced' },
      { username: 'casey.morgan', email: 'casey.morgan@example.com', displayName: 'Casey Morgan', fitnessLevel: 'beginner' },
    ]) as Array<{ username: string; _id: mongoose.Types.ObjectId }>;
    const usersByUsername = new Map<string, { username: string; _id: mongoose.Types.ObjectId }>(
      users.map((user) => [user.username, user]),
    );

    const teams = await Team.create([
      {
        name: 'Trail Blazers',
        description: 'Building endurance one step at a time.',
        members: ['alex.rivera', 'maya.chen', 'jordan.lee'].map((username) => usersByUsername.get(username)!._id),
        points: 860,
      },
      {
        name: 'Power Crew',
        description: 'Strength, consistency, and teamwork.',
        members: ['sam.taylor', 'riley.patel', 'casey.morgan'].map((username) => usersByUsername.get(username)!._id),
        points: 740,
      },
    ]) as Array<{ name: string; _id: mongoose.Types.ObjectId }>;
    const teamsByName = new Map<string, { name: string; _id: mongoose.Types.ObjectId }>(
      teams.map((team) => [team.name, team]),
    );

    await Promise.all([
      ...['alex.rivera', 'maya.chen', 'jordan.lee'].map((username) =>
        User.updateOne({ username }, { team: teamsByName.get('Trail Blazers')!._id }),
      ),
      ...['sam.taylor', 'riley.patel', 'casey.morgan'].map((username) =>
        User.updateOne({ username }, { team: teamsByName.get('Power Crew')!._id }),
      ),
    ]);

    const activitySamples = [
      ['alex.rivera', 'running', 32, 4.8, 310, 120],
      ['maya.chen', 'cycling', 45, 14, 420, 180],
      ['jordan.lee', 'walking', 28, 2.1, 130, 70],
      ['sam.taylor', 'strength', 40, undefined, 280, 140],
      ['riley.patel', 'running', 26, 4.2, 290, 160],
      ['casey.morgan', 'walking', 35, 2.7, 160, 90],
    ] as const;

    await Activity.create(activitySamples.map(([username, type, durationMinutes, distanceKm, calories, points], index) => ({
      user: usersByUsername.get(username)!._id,
      type,
      durationMinutes,
      ...(distanceKm === undefined ? {} : { distanceKm }),
      calories,
      points,
      date: new Date(Date.now() - index * 86_400_000),
    })));

    await Leaderboard.create([
      { team: teamsByName.get('Trail Blazers')!._id, points: 860, rank: 1, period: 'all-time' },
      { team: teamsByName.get('Power Crew')!._id, points: 740, rank: 2, period: 'all-time' },
      ...[
        ['maya.chen', 420],
        ['alex.rivera', 310],
        ['riley.patel', 290],
        ['sam.taylor', 280],
        ['casey.morgan', 160],
        ['jordan.lee', 130],
      ].map(([username, points], index) => ({
        user: usersByUsername.get(username as string)!._id,
        points: points as number,
        rank: index + 1,
        period: 'all-time',
      })),
    ]);

    await Workout.create([
      { user: usersByUsername.get('alex.rivera')!._id, title: 'Steady 5K Run', description: 'An easy-paced endurance session.', activityType: 'running', durationMinutes: 35, intensity: 'moderate' },
      { user: usersByUsername.get('maya.chen')!._id, title: 'Hill Cycling', description: 'Build power with short hill efforts.', activityType: 'cycling', durationMinutes: 40, intensity: 'high' },
      { user: usersByUsername.get('jordan.lee')!._id, title: 'Active Recovery Walk', description: 'A relaxed walk to build a daily habit.', activityType: 'walking', durationMinutes: 25, intensity: 'low' },
      { user: usersByUsername.get('sam.taylor')!._id, title: 'Full-Body Strength', description: 'A balanced bodyweight strength session.', activityType: 'strength', durationMinutes: 30, intensity: 'moderate' },
      { user: usersByUsername.get('riley.patel')!._id, title: 'Tempo Run', description: 'A controlled effort to improve pacing.', activityType: 'running', durationMinutes: 30, intensity: 'high' },
      { user: usersByUsername.get('casey.morgan')!._id, title: 'Beginner Strength Circuit', description: 'A gentle introduction to strength training.', activityType: 'strength', durationMinutes: 20, intensity: 'low' },
    ]);

    console.log('Database seeding complete: 6 users, 2 teams, 6 activities, 8 leaderboard entries, 6 workouts');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
