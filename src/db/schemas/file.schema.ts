import { MAX_TIME, MIN_TIME } from '@db/utils/date-util'
import {
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxCollection,
  RxDocument,
  RxJsonSchema,
  toTypedRxJsonSchema
} from 'rxdb'

export const fileSchemaLiteral = {
  title: 'file item schema',
  description: 'describes a file item',
  keyCompression: true,
  version: 0,
  primaryKey: 'fullFilePath',
  type: 'object',
  properties: {
    fullFilePath: {
      type: 'string',
      maxLength: 200 // <- the primary key must have set maxLength
    },
    fileName: {
      type: 'string'
    },
    fileSize: {
      type: 'number'
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
  required: ['fullFilePath', 'fileName', 'fileSize', 'createdAt', 'updatedAt']
} as const

const schemaTyped = toTypedRxJsonSchema(fileSchemaLiteral)

export type FileDocType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaTyped>

export const fileSchema: RxJsonSchema<FileDocType> = fileSchemaLiteral

export type FileDocMethods = {
  scream: (v: string) => string
}

export type FileDocument = RxDocument<FileDocType, FileDocMethods>

export type FileCollectionMethods = {
  countAllDocuments: () => Promise<number>
}

export type FileCollection = RxCollection<FileDocType, FileDocMethods, FileCollectionMethods>

export const fileDocMethods: FileDocMethods = {
  scream: function (this: FileDocument, what: string) {
    return this.fileName + ' screams: ' + what.toUpperCase()
  }
}

export const fileCollectionMethods: FileCollectionMethods = {
  countAllDocuments: async function (this: FileCollection) {
    const allDocs = await this.find().exec()
    return allDocs.length
  }
}
