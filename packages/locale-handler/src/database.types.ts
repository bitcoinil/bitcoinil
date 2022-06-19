import { GetDatabaseResponse, QueryDatabaseResponse, UpdateDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'

export type TableSchema = {
  properties: UpdateDatabaseParameters['properties']
  relatedProperties?: UpdateDatabaseParameters['properties']
}

export type DatabaseSchema = {
  [DatabaseName: string]: TableSchema
}

export type DatabaseInstance = {
  findDatabase: () => Promise<GetDatabaseResponse>
  read: () => Promise<QueryDatabaseResponse>
  get: (key: string) => Promise<DatabaseGetResponse>
  set: (key: string, data: DatabaseSetValueData) => Promise<DatabaseGetResponse>
}

export type DatabaseGetResponse = {
  [key: string]: unknown
}
export type DatabaseSetValueData = {
  [key: string]: unknown
}