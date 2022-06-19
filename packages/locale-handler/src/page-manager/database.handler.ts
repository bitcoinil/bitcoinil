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

  onReady = () => {}

  constructor(page: PageManager, schema: DatabaseSchema) {
    this.page = page
    this.databases = {}
    this.schema = schema

    this.init()
  }

  private async init() {
    console.log('🔰🔰🔰 initializing database...')
    const names = Object.keys(this.schema)
    console.log('🔰🔰🔰 Database names:', names)

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
          return null
        }),
      Promise.resolve(null)
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

    const drypProps = entries.filter(([propName, prop]) => {
      // console.log('👯👯👯👯 PROP CHECK', propName, prop)
      // @ts-ignore
      const { type, name, relation } = prop
      if (type === 'relation' && relation) {
        console.log('👯👯👯👯 RELATIONAL PROP', type, name, relation)
        const [, referenceName] =  relation.database_id.match(/^self::(.*)$/i)
        console.log('👯👯👯👯 referenceName', referenceName)
      }
    })
    const wetProps = {}
    return [drypProps, wetProps]
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
    const [dry, wet] = this.handleSchemaProperties(databaseSchema.properties)
    console.log('🏁🍆🪩 Dry props:', dry)
    console.log('🏁🍆🪩 Wet props:', wet)
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

  private dbValidator = async (dbname: string, dbi: any) => {
    const { config, instance } = dbi
    // console.log('🏁🍆🪩 Validating database:', dbname, {
    //   config,
    //   instance
    // })
    // await (
    //   await import('fs/promises')
    // ).writeFile(`./db-${dbname}.json`, JSON.stringify(dbi, null, 2))
    if (config.relatedProperties) {
      const relatedProps = await config.relatedProperties(dbPromises)
      // console.log('🏁🍆🪩 Related props:', dbname, relatedProps)
      const props = Object.entries(relatedProps)

      const instanceProps = Object.entries(dbi.instance.instance.properties)
      // @ts-ignore
      const missing = props.filter(
        // @ts-ignore
        ([propname, prop]: [string, Record<string, any>]) =>
          !instanceProps.find(
            // @ts-ignore
            ([ipropname, iprop]: [string, Record<string, any>]) =>
              // @ts-ignore
              // console.log('🤹🤹🤹🤹🤹🤹 instance checking', {
              //   propname,
              //   prop,
              //   ipropname,
              //   iprop,
              //   'iprop.relation?.synced_property_name':
              //     iprop.relation?.synced_property_name
              // }) ||
              (iprop.type === 'relation' &&
                iprop.relation?.synced_property_name === propname) ||
              Object.entries(dbPromises).find(
                ([dbname, xdbi]) =>
                  // @ts-ignore
                  // console.log('🤹🤹🤹🤹🤹🤹 db instance checking', {
                  //   propname,
                  //   prop,
                  //   ipropname,
                  //   iprop,
                  //   dbname,
                  //   xdbi,
                  //   'xdbi.instance.instance.id': xdbi.instance.instance.id,
                  //   'prop.relation.database_id': prop.relation.database_id
                  // }) ||
                  xdbi.instance.instance.id === prop.relation.database_id &&
                  Object.entries(xdbi.instance.instance.properties).find(
                    // @ts-ignore
                    ([mpropname, mprop]: [string, Record<string, any>]) =>
                      // @ts-ignore
                      // console.log(
                      //   '🤹🤹🤹🤹🤹🤹 db instance properties checking',
                      //   {
                      //     propname,
                      //     prop,
                      //     ipropname,
                      //     iprop,
                      //     dbname,
                      //     xdbi,
                      //     'xdbi.instance.instance.id':
                      //       xdbi.instance.instance.id,
                      //     'prop.relation.database_id':
                      //       prop.relation.database_id,
                      //     mpropname: mpropname,
                      //     mprop: mprop
                      //   }
                      // ) ||
                      mprop.type === 'relation' &&
                      mprop.relation?.synced_property_name === propname
                  )
              )
          )
      )
      // console.log('🏁🍆🪩 Props and Instance props:', dbname, {
      //   props,
      //   instanceProps
      // })
      // console.log('🏁🍆🪩 Missing props:', dbname, missing)

      if (missing.length) {
        const missingPropsUpdate = missing.reduce(
          (acc, [propname, prop]) => ({ ...acc, [propname]: prop }),
          {}
        )
        // console.log(
        //   '🏁🍆🪩 Missing missingPropsUpdate:',
        //   dbname,
        //   missingPropsUpdate
        // )

        // const missingPropHandler = async ([propname, prop]: [string, Record<string, any>]) => {
        //   console.log('🏁🍆🪩 Missing prop handling:', `"${propname}"`, prop)
        //   const updateResult = await instance.updateProperties(props)
        //   console.log('🏁🍆🪩 Missing prop handling:', `"${propname}"`, prop)

        // }
        // // @ts-ignore
        // const resulted = await missing.reduce((p, entry) => p.then(() => missingPropHandler(entry)), pagePromise)
        const updateResult = await instance.updateProperties(missingPropsUpdate)
        console.log('🏁🍆🪩 Update result:', dbname, updateResult)
      }
    }
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
