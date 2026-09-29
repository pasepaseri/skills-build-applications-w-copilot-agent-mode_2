import ResourcePage from './ResourcePage.jsx'

function workoutOwner(workout) {
  const user = workout.user
  if (!user) return 'Suggested workout'
  if (typeof user === 'object') return user.displayName || user.username || 'Assigned athlete'
  return `Athlete ${String(user).slice(0, 8)}`
}

function intensityClass(intensity) {
  if (intensity === 'high') return 'high'
  if (intensity === 'low') return 'low'
  return ''
}

const columns = [
  { key: 'title', label: 'WORKOUT', render: (workout) => <><span className="table-primary">{workout.title || 'Untitled workout'}</span><span className="table-secondary">{workout.description || 'No description'}</span></> },
  { key: 'activityType', label: 'ACTIVITY', render: (workout) => workout.activityType || 'General' },
  { key: 'durationMinutes', label: 'DURATION', render: (workout) => workout.durationMinutes ? `${workout.durationMinutes} min` : '-' },
  { key: 'intensity', label: 'INTENSITY', render: (workout) => <span className={`fitness-tag ${intensityClass(workout.intensity)}`}>{workout.intensity || 'moderate'}</span> },
  { key: 'user', label: 'ATHLETE', render: workoutOwner },
]

export default function Workouts() {
  return <ResourcePage resource="workouts" endpoint="/api/workouts/" title="Workouts" description="Personalized sessions for building healthy routines." columns={columns} />
}