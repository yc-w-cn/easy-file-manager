import { useEffect, useState } from 'react'
import { useRxDB } from 'rxdb-hooks'

export const useCollectionCount = (collectionName: string) => {
  const db = useRxDB()
  const [count, setCount] = useState(0)
  useEffect(() => {
    const query = db[collectionName].count()
    query.$.subscribe((amount) => {
      console.log(`updated: ${collectionName} currently has ${amount} documents.`)
      setCount(amount)
    })
  }, [])
  return count
}
