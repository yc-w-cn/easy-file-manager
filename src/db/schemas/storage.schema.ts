import { MAX_TIME, MIN_TIME } from '@db/utils/date-util'
import {
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxCollection,
  RxDocument,
  RxJsonSchema,
  toTypedRxJsonSchema
} from 'rxdb'

export const storageSchemaLiteral = {
  title: 'storage schema',
  description: 'describes a storage item',
  keyCompression: true,
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 200
    },
    storageName: {
      type: 'string'
    },
    storagePath: {
      type: 'string',
      maxLength: 200 // <- the primary key must have set maxLength
    },
    createdAt: {
      type: 'number',
      minimum: MIN_TIME,
      maximum: MAX_TIME,
      multipleOf: 1
    },
    updatedAt: {
      type: 'number',
      minimum: MIN_TIME,
      maximum: MAX_TIME,
      multipleOf: 1
    }
  },
  indexes: ['createdAt', 'updatedAt'],
  required: ['storagePath', 'storageName', 'storagePath', 'createdAt', 'updatedAt']
} as const

const schemaTyped = toTypedRxJsonSchema(storageSchemaLiteral)

export type StorageDocType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaTyped>

export const storageSchema: RxJsonSchema<StorageDocType> = storageSchemaLiteral

export type StorageDocMethods = {
  scream: (v: string) => string
}

export type StorageDocument = RxDocument<StorageDocType, StorageDocMethods>

export type StorageCollectionMethods = {
  countAllDocuments: () => Promise<number>
}

export type StorageCollection = RxCollection<
  StorageDocType,
  StorageDocMethods,
  StorageCollectionMethods
>

export const storageDocMethods: StorageDocMethods = {
  scream: function (this: StorageDocument, what: string) {
    return this.storagePath + ' screams: ' + what.toUpperCase()
  }
}

export const storageCollectionMethods: StorageCollectionMethods = {
  countAllDocuments: async function (this: StorageCollection) {
    const allDocs = await this.find().exec()
    return allDocs.length
  }
}
