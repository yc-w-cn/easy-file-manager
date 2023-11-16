import { addRxPlugin, createRxDatabase } from 'rxdb'
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder'
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie'
import { fileCollectionMethods, fileDocMethods, fileSchema } from '@db/schemas/file.schema'
import { folderCollectionMethods, folderDocMethods, folderSchema } from '@db/schemas/folder.schema'
import { movieCollectionMethods, movieDocMethods, movieSchema } from '@db/schemas/movie.schema'
import {
  storageCollectionMethods,
  storageDocMethods,
  storageSchema
} from '@db/schemas/storage.schema'
import { Database, DatabaseCollections } from './database.type'
import { wrappedKeyCompressionStorage } from 'rxdb/plugins/key-compression'
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode'
import config from '@renderer/config'

// Plugins
addRxPlugin(RxDBQueryBuilderPlugin)
if (process.env.NODE_ENV !== 'production') {
  addRxPlugin(RxDBDevModePlugin)
}

export const initialize = async (): Promise<Database> => {
  const db: Database = await createRxDatabase<DatabaseCollections>({
    name: 'easy-file-manager' + new Date().getTime(),
    storage: wrappedKeyCompressionStorage({
      storage: getRxStorageDexie()
    }),
    ignoreDuplicate: true,
    allowSlowCount: true // TODO
  })

  console.log('creating item-collection...')

  await db.addCollections({
    files: {
      schema: fileSchema,
      methods: fileDocMethods,
      statics: fileCollectionMethods
    },
    folders: {
      schema: folderSchema,
      methods: folderDocMethods,
      statics: folderCollectionMethods
    },
    movies: {
      schema: movieSchema,
      methods: movieDocMethods,
      statics: movieCollectionMethods
    },
    storages: {
      schema: storageSchema,
      methods: storageDocMethods,
      statics: storageCollectionMethods
    }
  })

  const defaultPath = config.storage.defaultPath

  if (defaultPath) {
    await db.storages.upsert({
      id: String(new Date().getTime()),
      storageName: defaultPath,
      storagePath: defaultPath,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime()
    })
  }

  return db
}
