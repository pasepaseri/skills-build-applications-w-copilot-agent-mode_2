import { useEffect, useState } from 'react'
import { apiUrl } from '../api.js'

function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.data?.results)) return payload.data.results
  return []
}

export function useCollection(endpoint) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [requestId, setRequestId] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadCollection() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(apiUrl(endpoint), { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        setItems(normalizeCollection(await response.json()))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Unable to load this collection.')
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadCollection()
    return () => controller.abort()
  }, [endpoint, requestId])

  return { items, loading, error, reload: () => setRequestId((id) => id + 1) }
}