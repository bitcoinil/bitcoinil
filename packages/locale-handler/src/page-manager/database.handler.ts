import { Client as NotionClient } from '@notionhq/client'
import PageManager from '.'
import {
  DatabaseInstance,
  DatabaseSchema,
  TableSchema
} from '../database.types'

class NotionDatabaseHandler {
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

    this.init()
  }

  private async init() {
    console.log('🔰🔰🔰 initializing database...')
    const names = Object.keys(this.schema)
    console.log('🔰🔰🔰 Database names:', names)

    // Create initial database
    await names.reduce(
      (p, databaseName) =>
        p.then(async () => {
          console.log('🔰🔰🔰 Database name:', databaseName)
          const databaseSchema = this.schema[databaseName]
          console.log('🔰🔰🔰 Database schema:', databaseSchema)
          const instance = await this.databaseCreator(
            databaseName,
            databaseSchema
          )
          console.log('🔰🔰🔰 Database instance:', instance)
        }),
      Promise.resolve()
    )

    // "Hydrate database properties
    await names.reduce(
      (p, databaseName) =>
        p.then(async () => {
          console.log('🔰🔰🔰 Database name:', databaseName)
          await this.hydrateProperties(databaseName)
        }),
      Promise.resolve()
    )

    // const dbPromises = (await Object.entries(this.schema).reduce(
    //   (p, [dbname, db]: [string, any]) => p.then(() => dbCreator(dbname, db)),
    //   pagePromise
    // )) as Record<string, any>

    this.onReady()
  }

  private handleSchemaProperties(properties: TableSchema['properties']) {
    if (!properties) return []
    const entries = Object.entries(properties)

    const [dries, wets] = entries.reduce(
      (
        [d, w]: [Record<string, any>, Record<string, any>],
        [propName, prop]
      ) => {
        // console.log('👯👯👯👯 PROP CHECK', propName, prop)

        // @ts-ignore
        const { type, name, relation } = prop
        if (type === 'relation' && relation) {
          console.log('👯👯👯👯 RELATIONAL PROP', type, name, relation)
          const [, referenceName] = relation.database_id.match(/^self::(.*)$/i)
          console.log('👯👯👯👯 referenceName', referenceName)
          return [d, { ...w, [propName]: { type, name, referenceName, ...prop } }]
        }
        return [{ ...d, [propName]: { type, name, ...prop } }, w]
      },
      [{}, {}]
    )
    console.log('👯👯👯👯 DRIES AND WETS', { dries, wets })

    // return [drypProps, wetProps]
    return [dries, wets]
  }

  private async databaseCreator(
    databaseName: string,
    databaseSchema: TableSchema
  ) {
    console.log(
      '🏁🍆🪩 Creating/validating database:',
      databaseName,
      databaseSchema
    )
    if (this.cache.databases[databaseName])
      return this.cache.databases[databaseName]

    const [dry, wet] = this.handleSchemaProperties(databaseSchema.properties)

    console.log('🏁🍆🪩 Dry props:', dry)
    console.log('🏁🍆🪩 Wet props:', wet)

    const handle = await this.page.getDatabase(databaseName, dry)
    console.log('🏁🍆🪩 DB Thing:', handle)

    this.cache.databases[databaseName] = {
      handle,
      props: { dry, wet },
      schema: databaseSchema
    }

    return this.cache.databases[databaseName]

    // try {
    //   const dbThing = await this.page.getDatabase(databaseName, databaseSchema.properties)
    //   // console.log('🏁🍆🪩 dbThing:', dbname, dbThing)
    //   Object.assign(kdbs, { [dbname]: { config: db, instance: dbThing } })
    //   return kdbs
    // } catch (error) {
    //   // console.log('🏁🍆🪩 Error creating database:', dbname, error)
    //   throw error
    // }
  }

  private hydrateProperties = async (dbname: string) => {
    const controller = this.cache.databases[dbname]
    if (!controller) throw new Error('Controller not available for ' + dbname)
    console.log('🔰🪩🪩 Controller:', `"${dbname}"`, controller)
    const instanceProps = Object.entries(controller.handle.instance.properties)
    console.log('🔰🪩🪩 Instance Props:', `"${dbname}"`, instanceProps)

    const missing = Object.entries(controller.props.wet).filter(
      ([propName, prop]) =>
        // @ts-ignore
        console.log('🤹🤹🤹🤹🤹🤹 instance checking', {
          dbname,
          propName,
          prop
        }) ||
        !instanceProps.find(
          ([instanceName, instanceProperty]: [string, any]) =>
            // @ts-ignore
            console.log('🤹🤹🤹🤹🤹🤹 instance checking', {
              dbname,
              propName,
              prop,
              instanceName,
              instanceProperty
            }) ||
            (instanceProperty.type === 'relation' &&
              console.log('🤹🤹 RELATION FOUND')) ||
            false
        )
    )
    console.log('🔰🪩🪩 Missing:', `"${dbname}"`, missing)

    const hydrated = missing.reduce(
      (acc, [propName, prop]: [string, any]) => ({
        ...acc,
        [propName]: {
          name: prop.name,
          type: prop.type,
          relation: {
            database_id: this.cache.databases[prop.referenceName].handle.instance.id
          }
        }
      }),
      {}
    )
    console.log('🔰🪩🪩 Hydrated missing props:', `"${dbname}"`, hydrated)

    const hydrationResult = await controller.handle.updateProperties(hydrated)
    console.log('🔰🪩🪩 Hydration result:', `"${dbname}"`, hydrationResult)
    // await missing.reduce(
    //   (p, [propName, prop]) =>
    //     p.then(async () => {
    //       console.log('🔰🪩🪩 Hydrating missing prop:', `"${dbname}"`, prop)
    //     }),
    //   Promise.resolve()
    // )

    // const missed = props.filter(
    //       // @ts-ignore
    //       ([propname, prop]: [string, Record<string, any>]) =>
    //         !instanceProps.find(
    //           // @ts-ignore
    //           ([ipropname, iprop]: [string, Record<string, any>]) =>
    //             // @ts-ignore
    //             // console.log('🤹🤹🤹🤹🤹🤹 instance checking', {
    //             //   propname,
    //             //   prop,
    //             //   ipropname,
    //             //   iprop,
    //             //   'iprop.relation?.synced_property_name':
    //             //     iprop.relation?.synced_property_name
    //             // }) ||
    //             (iprop.type === 'relation' &&
    //               iprop.relation?.synced_property_name === propname) ||
    //             Object.entries(dbPromises).find(
    //               ([dbname, xdbi]) =>
    //                 // @ts-ignore
    //                 // console.log('🤹🤹🤹🤹🤹🤹 db instance checking', {
    //                 //   propname,
    //                 //   prop,
    //                 //   ipropname,
    //                 //   iprop,
    //                 //   dbname,
    //                 //   xdbi,
    //                 //   'xdbi.instance.instance.id': xdbi.instance.instance.id,
    //                 //   'prop.relation.database_id': prop.relation.database_id
    //                 // }) ||
    //                 xdbi.instance.instance.id === prop.relation.database_id &&
    //                 Object.entries(xdbi.instance.instance.properties).find(
    //                   // @ts-ignore
    //                   ([mpropname, mprop]: [string, Record<string, any>]) =>
    //                     // @ts-ignore
    //                     // console.log(
    //                     //   '🤹🤹🤹🤹🤹🤹 db instance properties checking',
    //                     //   {
    //                     //     propname,
    //                     //     prop,
    //                     //     ipropname,
    //                     //     iprop,
    //                     //     dbname,
    //                     //     xdbi,
    //                     //     'xdbi.instance.instance.id':
    //                     //       xdbi.instance.instance.id,
    //                     //     'prop.relation.database_id':
    //                     //       prop.relation.database_id,
    //                     //     mpropname: mpropname,
    //                     //     mprop: mprop
    //                     //   }
    //                     // ) ||
    //                     mprop.type === 'relation' &&
    //                     mprop.relation?.synced_property_name === propname
    //                 )
    //             )
    //         )
    //     )

    // const { config, instance } = dbi
    // console.log('🏁🍆🪩 Validating database:', dbname, {
    //   config,
    //   instance
    // })
    // await (
    //   await import('fs/promises')
    // ).writeFile(`./db-${dbname}.json`, JSON.stringify(dbi, null, 2))
    // if (config.relatedProperties) {
    //   const relatedProps = await config.relatedProperties(dbPromises)
    //   // console.log('🏁🍆🪩 Related props:', dbname, relatedProps)
    //   const props = Object.entries(relatedProps)

    //   const instanceProps = Object.entries(dbi.instance.instance.properties)
    //   // @ts-ignore
    //   const missing = props.filter(
    //     // @ts-ignore
    //     ([propname, prop]: [string, Record<string, any>]) =>
    //       !instanceProps.find(
    //         // @ts-ignore
    //         ([ipropname, iprop]: [string, Record<string, any>]) =>
    //           // @ts-ignore
    //           // console.log('🤹🤹🤹🤹🤹🤹 instance checking', {
    //           //   propname,
    //           //   prop,
    //           //   ipropname,
    //           //   iprop,
    //           //   'iprop.relation?.synced_property_name':
    //           //     iprop.relation?.synced_property_name
    //           // }) ||
    //           (iprop.type === 'relation' &&
    //             iprop.relation?.synced_property_name === propname) ||
    //           Object.entries(dbPromises).find(
    //             ([dbname, xdbi]) =>
    //               // @ts-ignore
    //               // console.log('🤹🤹🤹🤹🤹🤹 db instance checking', {
    //               //   propname,
    //               //   prop,
    //               //   ipropname,
    //               //   iprop,
    //               //   dbname,
    //               //   xdbi,
    //               //   'xdbi.instance.instance.id': xdbi.instance.instance.id,
    //               //   'prop.relation.database_id': prop.relation.database_id
    //               // }) ||
    //               xdbi.instance.instance.id === prop.relation.database_id &&
    //               Object.entries(xdbi.instance.instance.properties).find(
    //                 // @ts-ignore
    //                 ([mpropname, mprop]: [string, Record<string, any>]) =>
    //                   // @ts-ignore
    //                   // console.log(
    //                   //   '🤹🤹🤹🤹🤹🤹 db instance properties checking',
    //                   //   {
    //                   //     propname,
    //                   //     prop,
    //                   //     ipropname,
    //                   //     iprop,
    //                   //     dbname,
    //                   //     xdbi,
    //                   //     'xdbi.instance.instance.id':
    //                   //       xdbi.instance.instance.id,
    //                   //     'prop.relation.database_id':
    //                   //       prop.relation.database_id,
    //                   //     mpropname: mpropname,
    //                   //     mprop: mprop
    //                   //   }
    //                   // ) ||
    //                   mprop.type === 'relation' &&
    //                   mprop.relation?.synced_property_name === propname
    //               )
    //           )
    //       )
    //   )
    //   // console.log('🏁🍆🪩 Props and Instance props:', dbname, {
    //   //   props,
    //   //   instanceProps
    //   // })
    //   // console.log('🏁🍆🪩 Missing props:', dbname, missing)

    //   if (missing.length) {
    //     const missingPropsUpdate = missing.reduce(
    //       (acc, [propname, prop]) => ({ ...acc, [propname]: prop }),
    //       {}
    //     )
    //     // console.log(
    //     //   '🏁🍆🪩 Missing missingPropsUpdate:',
    //     //   dbname,
    //     //   missingPropsUpdate
    //     // )

    //     // const missingPropHandler = async ([propname, prop]: [string, Record<string, any>]) => {
    //     //   console.log('🏁🍆🪩 Missing prop handling:', `"${propname}"`, prop)
    //     //   const updateResult = await instance.updateProperties(props)
    //     //   console.log('🏁🍆🪩 Missing prop handling:', `"${propname}"`, prop)

    //     // }
    //     // // @ts-ignore
    //     // const resulted = await missing.reduce((p, entry) => p.then(() => missingPropHandler(entry)), pagePromise)
    //     const updateResult = await instance.updateProperties(missingPropsUpdate)
    //     console.log('🏁🍆🪩 Update result:', dbname, updateResult)
    //   }
    // }
  }

  updateValuesReducer = (
    data: Record<string, any>,
    validate?: (key: string, value: any, index: number) => Boolean
  ) =>
    Object.entries(data).reduce(
      (p, [key, value], index) =>
        p.then(async () => {
          console.log('🗝🔑 Key and value:', index, key, value)
          if (validate?.(key, value, index) || !validate)
            await this.databases.language.set(key, {
              defaultMessage: value.defaultMessage || 'NOT SPECIFIED',
              ...(value.description ? { description: value.description } : {})
            })
          return Promise.resolve(null)
        }),
      // @xts-ignore
      // p.then(async () => {
      //   // console.log('🗝🔑 Key and value:', index, key, value)
      //   // if (validate?.(key, value, index) || !validate)
      //   //   await this.databases.language.set(key, {
      //   //     defaultMessage: value.defaultMessage || 'NOT SPECIFIED',
      //   //     ...(value.description ? { description: value.description } : {})
      //   //   })
      //   // // await new Promise((r) => setTimeout(r, 30))
      // }),
      Promise.resolve(null)
    )
}

export default NotionDatabaseHandler
