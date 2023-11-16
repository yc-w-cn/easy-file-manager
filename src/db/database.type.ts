import { RxDatabase } from 'rxdb'
import { FileCollection } from './schemas/file.schema'
import { FolderCollection } from './schemas/folder.schema'
import { MovieCollection } from './schemas/movie.schema'
import { StorageCollection } from './schemas/storage.schema'

export type DatabaseCollections = {
  files: FileCollection
  folders: FolderCollection
  movies: MovieCollection
  storages: StorageCollection
}

export type Database = RxDatabase<DatabaseCollections>

// const heroDocMethods: FileDocMethods = {
//   scream: function(this: HeroDocument, what: string) {
//       return this.firstName + ' screams: ' + what.toUpperCase();
//   }
// };

// const heroCollectionMethods: HeroCollectionMethods = {
//   countAllDocuments: async function(this: HeroCollection) {
//       const allDocs = await this.find().exec();
//       return allDocs.length;
//   }
// };
