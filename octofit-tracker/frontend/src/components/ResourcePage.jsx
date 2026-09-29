import { useCollection } from '../hooks/useCollection.js'

function ResourcePage({ resource, endpoint, title, description, columns }) {
  const { items, loading, error, reload } = useCollection(endpoint)

  return (
    <section className="resource-page">
      <div className="resource-heading">
        <div>
          <p className="eyebrow">OCTOFIT TRACKER / {resource.toUpperCase()}</p>
          <h1>{title}</h1>
          <p className="resource-description">{description}</p>
        </div>
        {!loading && !error && <p className="resource-count"><strong>{items.length}</strong> records</p>}
      </div>

      <div className="resource-body">
        {loading && (
          <div className="state-panel" role="status">
            <span className="loading-mark" aria-hidden="true" />
            <strong>Loading {resource}...</strong>
            <p>Getting the latest tracker records.</p>
          </div>
        )}

        {!loading && error && (
          <div className="state-panel" role="alert">
            <strong>Could not load {resource}</strong>
            <p>{error}</p>
            <button className="btn btn-primary" type="button" onClick={reload}>Try again</button>
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="state-panel">
            <strong>No {resource} yet</strong>
            <p>Records will appear here when they are available.</p>
            <button className="btn btn-primary" type="button" onClick={reload}>Refresh</button>
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <>
            <div className="resource-toolbar">
              <strong>All {title.toLowerCase()}</strong>
              <button className="btn btn-sm btn-outline-secondary" type="button" onClick={reload}>Refresh</button>
            </div>
            <div className="table-responsive table-frame">
              <table className="table table-hover">
                <thead>
                  <tr>{columns.map((column) => <th key={column.key} scope="col">{column.label}</th>)}</tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={item._id || item.id || `${resource}-${index}`}>
                      {columns.map((column) => (
                        <td key={column.key}>
                          {column.render ? column.render(item) : item[column.key] ?? 'Not set'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default ResourcePage