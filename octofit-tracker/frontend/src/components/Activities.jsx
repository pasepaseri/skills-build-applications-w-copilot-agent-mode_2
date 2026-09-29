import ResourcePage from './ResourcePage.jsx'

function activityUser(activity) {
  return activity.user?.displayName || activity.user?.username || activity.user?.toString?.() || 'Unassigned'
}

function activityDate(value) {
  if (!value) return 'Not dated'
  const date = new Date(value)
  return Number.isNaN(date.valueOf()) ? 'Not dated' : date.toLocaleDateString()
}

const columns = [
  { key: 'type', label: 'ACTIVITY', render: (activity) => <span className="table-primary text-capitalize">{activity.type || 'Other'}</span> },
  { key: 'user', label: 'ATHLETE', render: activityUser },
  { key: 'durationMinutes', label: 'DURATION', render: (activity) => `${activity.durationMinutes ?? '-'} min` },
  { key: 'distanceKm', label: 'DISTANCE', render: (activity) => activity.distanceKm == null ? '-' : `${activity.distanceKm} km` },
  { key: 'points', label: 'POINTS', render: (activity) => activity.points ?? 0 },
  { key: 'date', label: 'DATE', render: (activity) => activityDate(activity.date) },
]

export default function Activities() {
  return <ResourcePage resource="activities" endpoint="/api/activities/" title="Activities" description="Recent movement logged across the school community." columns={columns} />
}