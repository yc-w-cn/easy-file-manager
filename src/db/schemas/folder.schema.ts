import { MAX_TIME, MIN_TIME } from '@db/utils/date-util'
import {
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxCollection,
  RxDocument,
  RxJsonSchema,
  toTypedRxJsonSchema
} from 'rxdb'

export const folderSchemaLiteral = {
  title: 'folder item schema',
  description: 'describes a folder item',
  keyCompression: true,
  version: 0,
  primaryKey: 'fullFolderPath',
  type: 'object',
  properties: {
    fullFolderPath: {
      type: 'string',
      maxLength: 200 // <- the primary key must have set maxLength
    },
    folderName: {
      type: 'string'
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
  required: ['fullFolderPath', 'folderName', 'createdAt', 'updatedAt']
} as const

const schemaTyped = toTypedRxJsonSchema(folderSchemaLiteral)

export type FolderDocType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaTyped>

export const folderSchema: RxJsonSchema<FolderDocType> = folderSchemaLiteral

export type FolderDocMethods = {
  scream: (v: string) => string
}

export type FolderDocument = RxDocument<FolderDocType, FolderDocMethods>

export type FolderCollectionMethods = {
  countAllDocuments: () => Promise<number>
}

export type FolderCollection = RxCollection<
  FolderDocType,
  FolderDocMethods,
  FolderCollectionMethods
>

export const folderDocMethods: FolderDocMethods = {
  scream: function (this: FolderDocument, what: string) {
    return this.folderName + ' screams: ' + what.toUpperCase()
  }
}

export const folderCollectionMethods: FolderCollectionMethods = {
  countAllDocuments: async function (this: FolderCollection) {
    const allDocs = await this.find().exec()
    return allDocs.length
  }
}
