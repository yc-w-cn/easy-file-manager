import { MAX_TIME, MIN_TIME } from '@db/utils/date-util'
import {
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxCollection,
  RxDocument,
  RxJsonSchema,
  toTypedRxJsonSchema
} from 'rxdb'

export const movieSchemaLiteral = {
  title: 'movie item schema',
  description: 'describes movie item',
  keyCompression: true,
  version: 0,
  primaryKey: 'destination',
  type: 'object',
  properties: {
    destination: {
      type: 'string',
      maxLength: 200 // <- the primary key must have set maxLength
    },
    type: {
      type: 'string'
    },
    tags: {
      type: 'array',
      uniqueItems: true,
      items: {
        type: 'string'
      }
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
  required: ['destination', 'type', 'tags', 'createdAt', 'updatedAt']
} as const

const schemaTyped = toTypedRxJsonSchema(movieSchemaLiteral)

export type MovieDocType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaTyped>

export const movieSchema: RxJsonSchema<MovieDocType> = movieSchemaLiteral

export type MovieDocMethods = {
  scream: (v: string) => string
}

export type MovieDocument = RxDocument<MovieDocType, MovieDocMethods>

export type MovieCollectionMethods = {
  countAllDocuments: () => Promise<number>
}

export type MovieCollection = RxCollection<MovieDocType, MovieDocMethods, MovieCollectionMethods>

export const movieDocMethods: MovieDocMethods = {
  scream: function (this: MovieDocument, what: string) {
    return this.destination + ' screams: ' + what.toUpperCase()
  }
}

export const movieCollectionMethods: MovieCollectionMethods = {
  countAllDocuments: async function (this: MovieCollection) {
    const allDocs = await this.find().exec()
    return allDocs.length
  }
}
