import { Database } from '@db/database.type'
import { useEffect, useState } from 'react'
import { useRxDB } from 'rxdb-hooks'

export const useMovieCount = (movieFilter: string | null) => {
  const db: Database = useRxDB() as any
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (movieFilter === null) return
    const query = db.movies.count(
      movieFilter
        ? {
            selector: {
              destination: { $regex: `${movieFilter}.*` }
            }
          }
        : {}
    )
    query.$.subscribe((amount) => {
      console.log(`updated: movies currently has ${amount} documents.`)
      setCount(amount)
    })
  }, [movieFilter])
  return count
}
