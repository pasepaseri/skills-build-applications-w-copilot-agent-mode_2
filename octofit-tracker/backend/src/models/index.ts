import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, trim: true, unique: true },
  email: { type: String, required: true, trim: true, lowercase: true, unique: true },
  displayName: { type: String, trim: true },
  fitnessLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
}, { timestamps: true });

const teamSchema = new Schema({
  name: { type: String, required: true, trim: true, unique: true },
  description: { type: String, trim: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  points: { type: Number, default: 0, min: 0 },
}, { timestamps: true });

const activitySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['running', 'walking', 'strength', 'cycling', 'other'], required: true },
  durationMinutes: { type: Number, required: true, min: 1 },
  distanceKm: { type: Number, min: 0 },
  calories: { type: Number, min: 0 },
  points: { type: Number, default: 0, min: 0 },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

const leaderboardSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  points: { type: Number, required: true, min: 0 },
  rank: { type: Number, min: 1 },
  period: { type: String, default: 'all-time' },
}, { timestamps: true });

const workoutSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  activityType: { type: String, enum: ['running', 'walking', 'strength', 'cycling', 'other'] },
  durationMinutes: { type: Number, min: 1 },
  intensity: { type: String, enum: ['low', 'moderate', 'high'], default: 'moderate' },
  completedAt: { type: Date },
}, { timestamps: true });

export const User = models.User || model('User', userSchema);
export const Team = models.Team || model('Team', teamSchema);
export const Activity = models.Activity || model('Activity', activitySchema);
export const Leaderboard = models.Leaderboard || model('Leaderboard', leaderboardSchema);
export const Workout = models.Workout || model('Workout', workoutSchema);