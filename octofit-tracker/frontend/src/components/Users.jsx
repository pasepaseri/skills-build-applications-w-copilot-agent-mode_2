import ResourcePage from './ResourcePage.jsx'

function userTeam(user) {
  if (!user.team) return 'No team'
  if (typeof user.team === 'object') return user.team.name || 'Team assigned'
  return `Team ${String(user.team).slice(0, 8)}`
}

function levelClass(level) {
  if (level === 'advanced') return 'high'
  if (level === 'beginner') return 'low'
  return ''
}

const columns = [
  { key: 'displayName', label: 'ATHLETE', render: (user) => <><span className="table-primary">{user.displayName || user.username || 'Unnamed athlete'}</span><span className="table-secondary">@{user.username || 'unknown'}</span></> },
  { key: 'email', label: 'EMAIL', render: (user) => user.email || 'Not set' },
  { key: 'fitnessLevel', label: 'FITNESS LEVEL', render: (user) => <span className={`fitness-tag ${levelClass(user.fitnessLevel)}`}>{user.fitnessLevel || 'beginner'}</span> },
  { key: 'team', label: 'TEAM', render: userTeam },
]

export default function Users() {
  return <ResourcePage resource="users" endpoint="/api/users/" title="Athletes" description="Student profiles, current teams, and fitness levels." columns={columns} />
}