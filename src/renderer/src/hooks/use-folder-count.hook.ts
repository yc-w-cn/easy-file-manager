import { Database } from '@db/database.type'
import { useEffect, useState } from 'react'
import { useRxDB } from 'rxdb-hooks'

export const useFolderCount = (folderFilter: string | null) => {
  const db: Database = useRxDB() as any
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (folderFilter === null) return
    const query = db.folders.count(
      folderFilter
        ? {
            selector: {
              fullFolderPath: { $regex: `${folderFilter}.*` }
            }
          }
        : {}
    )
    query.$.subscribe((amount) => {
      console.log(`updated: folders currently has ${amount} documents.`)
      setCount(amount)
    })
  }, [folderFilter])
  return count
}
