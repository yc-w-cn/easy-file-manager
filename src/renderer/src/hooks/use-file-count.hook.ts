import { Database } from '@db/database.type'
import { useEffect, useState } from 'react'
import { useRxDB } from 'rxdb-hooks'

export const useFileCount = (fileFilter: string | null) => {
  const db: Database = useRxDB() as any
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (fileFilter === null) return
    const query = db.files.count(
      fileFilter
        ? {
            selector: {
              fullFilePath: { $regex: `${fileFilter}.*` }
            }
          }
        : {}
    )
    query.$.subscribe((amount) => {
      console.log(`updated: files currently has ${amount} documents.`)
      setCount(amount)
    })
  }, [fileFilter])
  return count
}
