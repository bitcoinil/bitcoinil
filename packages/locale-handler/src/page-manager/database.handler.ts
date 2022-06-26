import { Client as NotionClient } from '@notionhq/client'
import PageManager from '.'
import {
  DatabaseInstance,
  DatabaseSchema,
  TableSchema
} from '../database.types'

class NotionDatabaseHandler {
  ref: typeof NotionDatabaseHandler
  page: PageManager
  databases: Record<string, DatabaseInstance>
  schema: DatabaseSchema

  private cache: Record<string, Record<string, any>>

  onReady = () => {}

  constructor(page: PageManager, schema: DatabaseSchema) {
    this.page = page
    this.databases = {}
    this.schema = schema
    this.cache = {
      databases: {}
    }
    this.ref = NotionDatabaseHandler

    this.init()
  }

  private async init() {
    const names = Object.keys(this.schema)

    // Create initial database
    await names.reduce(
      (p, databaseName) =>
        p.then(() =>
          this.databaseCreator(databaseName, this.schema[databaseName])
        ),
      Promise.resolve()
    )

    // "Hydrate database properties
    await names.reduce(
      (p, databaseName) => p.then(() => this.hydrateProperties(databaseName)),
      Promise.resolve()
    )

    this.onReady()
  }

  private handleSchemaProperties(properties: TableSchema['properties']) {
    if (!properties) return []
    const entries = Object.entries(properties)

    const [dries, wets] = entries.reduce(
      (
        [d, w]: [Record<string, any>, Record<string, any>],
        [propName, prop]: [string, any]
      ) => {
        const { type, name, relation } = prop
        if (type === 'relation' && relation) {
          const [, referenceName] = relation.database_id.match(/^self::(.*)$/i)
          return [
            d,
            { ...w, [propName]: { type, name, referenceName, ...prop } }
          ]
        }
        return [{ ...d, [propName]: { type, name, ...prop } }, w]
      },
      [{}, {}]
    )

    return [dries, wets]
  }

  private async databaseCreator(
    databaseName: string,
    databaseSchema: TableSchema
  ) {
    if (this.cache.databases[databaseName])
      return this.cache.databases[databaseName]

    const [dry, wet] = this.handleSchemaProperties(databaseSchema.properties)

    const handle = await this.page.getDatabase(databaseName, dry)

    this.cache.databases[databaseName] = {
      handle,
      props: { dry, wet },
      schema: databaseSchema
    }

    handle.attachHandler(this)

    return this.cache.databases[databaseName]
  }

  public hydrateValues = async (dbname: string, values: any) => {
    // console.log('💥🌪🌧 HYDRATING!', dbname, values)
    const db = this.cache.databases[dbname]
    // console.log('💥🌪🌧 HYDRATING Db.props!', dbname, db.props)

    const result = await Object.entries(db.props.wet).reduce(
      (p, [propName, prop]) =>
        p.then(async (acc) => {
          const ref = values[propName]
          if (ref) {
            const page = await this.page.client.pages.retrieve({
              page_id: ref
            })

            if (page) {
              // @ts-ignore
              const value = Object.values(page.properties).find(
                (v: any) => v.type === 'title'
              )
              const actual = PageManager.propertyValue(value)

              return {
                ...acc,
                [propName]: actual
              }
            }
          }
          return acc
        }),
      Promise.resolve({})
    )

    return result
  }

  private hydrateProperties = async (dbname: string) => {
    const controller = this.cache.databases[dbname]
    if (!controller) throw new Error('Controller not available for ' + dbname)
    const instanceProps = Object.entries(controller.handle.instance.properties)

    const missing = Object.entries(controller.props.wet).filter(
      ([, prop]: [string, any]) =>
        !instanceProps.find(
          ([, instanceProperty]: [string, any]) =>
            (instanceProperty.type === 'relation' &&
              instanceProperty.name === prop.name) ||
            false
        )
    )
    if (missing.length) {
      const hydrated = missing.reduce(
        (acc, [propName, prop]: [string, any]) => ({
          ...acc,
          [propName]: {
            name: prop.name,
            type: prop.type,
            relation: {
              database_id:
                this.cache.databases[prop.referenceName].handle.instance.id
            }
          }
        }),
        {}
      )
      const hydrationResult = await controller.handle.updateProperties(hydrated)
    }
  }

  updateValuesReducer = (
    data: Record<string, any>,
    validate?: (key: string, value: any, index: number) => Boolean
  ) =>
    Object.entries(data).reduce(
      (p, [key, value], index) =>
        p.then(async () => {
          if (validate?.(key, value, index) || !validate)
            await this.databases.language.set(key, {
              defaultMessage: value.defaultMessage || 'NOT SPECIFIED',
              ...(value.description ? { description: value.description } : {})
            })
        }),

      Promise.resolve()
    )

  public set(databaseName: string, databaseKey: string, data: any) {
    return this.cache.databases[databaseName].handle.set(databaseKey, data)
  }
  public get(databaseName: string, databaseKey: string) {
    return this.cache.databases[databaseName].handle.get(databaseKey)
  }
  public getAll(databaseName: string) {
    if (!this.cache.databases[databaseName])
      throw new Error(`Database '${databaseName}' not found`)
    return this.cache.databases[databaseName].handle.getAll()
  }
  public read(databaseName: string, pageSize?: number, readAll?: boolean) {
    if (!this.cache.databases[databaseName])
      throw new Error(`Database '${databaseName}' not found`)
    return this.cache.databases[databaseName].handle.read(pageSize, readAll)
  }
  public listen(databaseName: string, callback: (data: any) => void | Promise<void>) {
    if (!this.cache.databases[databaseName])
      throw new Error(`Database '${databaseName}' not found`)
    return this.cache.databases[databaseName].handle.listen(callback)
  }
}

export default NotionDatabaseHandler
