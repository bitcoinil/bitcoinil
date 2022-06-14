import { Client } from '@notionhq/client'
import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'

type Cache = {
  confBlockId?: string
  containers: Record<string, any>
  items: Record<string, string>
  values: Record<string, any>
  fetching: Record<string, Promise<any> | null | false>
  blocks: Record<string, ListBlockChildrenResponse>
}

type BaseBlock = {
  id: string
}

type ToggleBlock = BaseBlock & {
  type: 'toggle-block'
  keys: () => string[]
  set: (key: string, value: any) => Promise<void>
  get: (key: string) => Promise<any>
}

type DatabaseBlock = BaseBlock & {
  type: 'database-block'
  rows: () => number
}

type BlockConfig<K extends string> = Record<
  K,
  { type: ToggleBlock['type'] | DatabaseBlock['type'] }
>

type ABlock = ToggleBlock | DatabaseBlock

type BlockSpace = {
  type?: string
  id: string
  keys: () => string[]
  set: (key: string, value: any) => Promise<void>
  get: (key: string) => Promise<any>
}

type BlockHandler = {
  find: (children: ListBlockChildrenResponse) => Record<string, any>
  create: () => Promise<any>
  read: () => Promise<any>
  write: (key: string, value: any) => Promise<void>
  get: (key?: string) => Promise<any>
}

type BlockHandlers = {
  [handlerType: string]: (
    parentBlockId: string,
    name: string,
    cacheObject: Record<string, any>,
    properties?: Record<string, any>
  ) => BlockHandler
}

class PageManager {
  static BLOCK_PREFIX = '🧧 '
  static KEY_VALUE_PREFIX = `⚙️ `

  public onReady = () => {}

  protected pageName: string = ''
  protected pageId: string = ''
  private client: Client
  // private cache: Cache = { /**
  public cache: Cache = {
    //  */
    containers: {},
    items: {},
    values: {},
    fetching: {},
    blocks: {}
  }

  static async initFromPageName(pageName: string, notion: Client) {
    const pageId = await this.findPageIdByName(pageName, notion)
    if (!pageId) throw new Error('Page not found')

    const pageManager = new PageManager(pageId, notion)
    pageManager.pageName = pageName

    // console.log('🍈🍉 Page manager initialized from page name:', {
    //   pageName,
    //   pageId,
    //   pageManager
    // })

    return pageManager
  }

  static async findPageIdByName(pageName: string, client: Client) {
    const response = await client.search({
      query: pageName,
      sort: {
        direction: 'ascending',
        timestamp: 'last_edited_time'
      }
    })

    return response.results[0]?.id
  }

  constructor(pageId: string, client: Client) {
    this.pageId = pageId
    this.client = client

    this.init()
  }

  public async getOption(optionName: string) {
    console.log('🎀🎈💌 GETTING OPTION:', optionName)
    // @ts-ignore
    return this.blocks.configuration?.get(optionName)
  }

  public async setOption(optionName: string, value: any) {
    // @ts-ignore
    return this.blocks.configuration?.set(optionName, value)
  }

  public async getDatabase(dbName: string, properties: Record<string, any>) {
    // // @ts-ignore
    // let dbId = this.blocks.databases?.get(dbName)
    this.cache.containers[`database-${dbName}`] = {
      dbName
    }
    const cache = this.cache.containers[`database-${dbName}`]
    const dbHandler = this.blockHandler.database(
      this.pageId,
      dbName,
      cache,
      properties
    )
    console.log('🍈🍈🍈 DB Handler', dbName, dbHandler)

    // @ts-ignore
    let db = await dbHandler.find()
    if (db) {
      console.log('🍈🍈🍈 DB found', dbName, db)
      await dbHandler.read()
    } else {
      console.log('🍈🍈🍈 DB NOT found', dbName, db)
      const res = await dbHandler.create()
      if (res) {
        console.log('Res of create db:', res)
        // @ts-ignore
        this.blocks.databases.set(dbName, res.id)
        db = res
      }
    }

    return {
      read: () => dbHandler.read(),
      get: (key: string) => dbHandler.get(key),
      set: (key: string, value: any) => dbHandler.write(key, value)
    }
    // if (dbId) {
    //   console.log('🍈🍈🍈 DBTHERE', dbName, dbId)
    // } else {
    //   console.log('🍈🍈🍈 DBNOTHERE', dbName)
    //   const res = await this.createDatabase()
    //   console.log('Res of create db:', res)
    //   // @ts-ignore
    //   this.blocks.databases?.set(dbName, res.id)
    //   dbId = res.id
    // }
  }

  private async init() {
    await this.initBlocks()

    // console.log('ALL READY', this.cache)
    this.onReady?.()
  }

  private async initBlocks() {
    const children = await this.getBlock(this.pageId)
    const conf = this.blocksConfiguration
    // Iterate all `this.block` entries to initialize and load the blocks
    const nextBlocks = await Promise.all(
      Object.entries(conf).map(async ([blockName, options]) => {
        this.cache.containers[blockName] = {
          ...(this.cache.containers[blockName] || {})
        }
        const cache = this.cache.containers[blockName]
        const blockType = options.type
        const handler = this.blockHandler[blockType]
        const actions = handler(this.pageId, blockName, cache)

        let block = actions.find(children)
        if (!block) {
          // console.log('no block found - create!:', block)
          block = await actions.create()
          // console.log('block created:', block)
        }

        const [results, conf] = await actions.read()
        const blockApp = {
          ...options,
          id: block.id,
          get: actions.get,
          set: actions.write,
          keys: () => Object.keys(cache.values)
        } as ABlock

        // const [results, conf] = actions.read(block.id)
        // console.log('Block results:', results)
        // console.log('Block name:', blockName, 'conf:', conf)

        // store in local cache
        // results.forEach(({ key, value, blockId }: Record<string, string>) => {
        //   this.cache.items[`${blockName}-${key}`] = blockId
        //   this.cache.values[`${blockName}-${key}`] =
        //     PageManager.parseValue(value)
        // })

        return [blockName, blockApp]
      })
    )

    this.blocks = nextBlocks.reduce(
      (acc, [blockName, block]) => ({ ...acc, [blockName as string]: block }),
      {}
    )
  }

  private blocksConfiguration = {
    configuration: {
      type: 'toggle-block'
    },
    databases: {
      type: 'toggle-block'
    },
    general: {
      type: 'toggle-block'
    }
  } as const

  private blocks = {}

  private blockHandler: BlockHandlers = {
    'toggle-block': (
      parentBlockId: string,
      blockName: string,
      cacheObject: Record<string, any>
    ) => ({
      find: (children: ListBlockChildrenResponse) => {
        // console.log('🪆🪆🪆🪆 FINDING BLOCK', {
        //   parentBlockId,
        //   blockName,
        //   cacheObject,
        //   children
        // })
        if (cacheObject.block) return cacheObject.block

        const block = this.findToggleBlock(blockName, children)

        // console.log('🪆🪆🪆🪆 BLOCK FIND RESULT', block)
        if (!block) return null
        // console.log('🪆🪆🪆🪆 FOUND BLOCK', block)

        cacheObject.block = block
        cacheObject.blockId = block.id
        return block
      },
      create: async () => {
        // console.log('🪆🪆🪆🪆 CREATING', { parentBlockId, blockName })
        const res = await this.writeToggleBlock(parentBlockId, blockName, {
          created: new Date().toISOString()
        })
        cacheObject.block = res
        cacheObject.blockId = res.id
        // console.log('🪆🪆🪆🪆 CREATE CONFIGURATION BLOCK', res)
        return res
      },
      read: async () => {
        const blockId = cacheObject.blockId
        // console.log('🪆🪆🪆🪆 Reading block:', `"${blockName}"`, blockId)
        const children = await this.getBlock(blockId)
        const [results, config] = this.parseToggleBlock(children)

        // console.log('🪆🪆🪆🪆 Parsed block data:', { results, config })

        // store in local cache
        results.forEach(({ key, value, blockId }: Record<string, string>) => {
          cacheObject.ids = { ...(cacheObject.ids || {}), [key]: blockId }
          cacheObject.values = {
            ...(cacheObject.values || {}),
            [key]: PageManager.parseValue(value)
          }
        })

        return [results, config]
      },
      write: async (key: string, value: any) => {
        const blockId = cacheObject.ids[key]

        console.log('WRITING KEY TO MEAN VALUE:', { key, value, blockId })
        if (!blockId) {
          const result = await this.writeNewToggleValue(
            cacheObject.blockId,
            key,
            value
          )
          // console.log('✈️ Set result', result)
          cacheObject.ids = { ...(cacheObject.ids || {}), [key]: result.id }
        } else {
          const result = await this.updateToggleValue(blockId, key, value)
          console.log('✈️ Update result', result)
          return result
          // console.log('WRITING KEY TO MEAN VALUE:', { key, value, blockId })
        }
        cacheObject.values = {
          ...(cacheObject.values || {}),
          [key]: value
        }
      },
      get: (key?: string) => {
        console.log('🚪🚪🚪🚪 GETTING', key, cacheObject.values)
        if (!key) return cacheObject.values
        return cacheObject.values[key]
      }
    }),
    // @ts-ignore
    database: (
      parentBlockId: string,
      dbName: string,
      cacheObject: Record<string, any>,
      dbProperties: Record<string, any>
    ) => ({
      find: async () => {
        if (cacheObject.db) return cacheObject.dbHandler

        // @ts-ignore
        const dbId = this.blocks.databases.get(dbName)
        console.log('found db id:', dbId)

        if (!dbId) return null

        const db = await this.client.databases.retrieve({
          database_id: dbId
        })

        console.log('retreived db:', db)
        cacheObject.db = db
        cacheObject.dbId = dbId
        return db
      },
      create: async () => {
        const res = await this.createDatabase(this.pageId, dbName, dbProperties)
        console.log('db craeted', res)
        cacheObject.db = res
        cacheObject.dbId = res.id

        return res
      },
      read: async () => {
        console.log('🍥🧧🥥 Read DATABASE:')
        const response = await this.client.databases.query({
          database_id: cacheObject.dbId
        })

        // // write to example.result.json
        // await (await import('fs/promises')).writeFile('./example.result.json', JSON.stringify(response, null, 2))

        console.log('🍥🧧🥥 Read response:', response)

        return response
      },
      write: async (key: string, data: any) => {
        const [indexName, indexProperty] = Object.entries(dbProperties).find(
          ([dbName, prop]) => prop.type === 'title'
        ) as any

        console.log('🍥🔰🥥 IndexProperty', indexName, indexProperty)

        const properties = Object.entries(data)
          .map(([key, value]) => {
            console.log('🍥🔰🥥 Data value', { value, key })
            const [dbName, prop] = Object.entries(dbProperties).find(
              ([dbName, property]) => property.id === key
            ) as any
            console.log('🍥🔰🥥 Property', prop)
            if (prop.type === 'number') {
              return {
                [dbName]: {
                  [prop.type]: Number(value)
                }
              }
            }
          })
          .reduce((acc, curr) => ({ ...acc, ...curr }), {})
        console.log('🍥🔰🥥 Resulting properties object', properties)

        // Find row ID
        const queryObject = {
          database_id: cacheObject.dbId,
          // @ts-ignore
          filter: {
            property: indexName,
            [indexProperty.type]: {
              equals: key
            }
          }
        } as any

        console.log('🍥🔰🥥 query object', queryObject)
        const response = await this.client.databases.query(queryObject)
        console.log('🍥🔰🥥 Resulting query result', response)
        if (response.results.length) {
          console.log('🍥🔰🥥 Result', response.results)

          const updateObject = {
            // @ts-ignore
            page_id: response.results[0].id,
            // @ts-ignore
            properties
          }
          console.log('🍥🔰🥥 Update object', updateObject.properties.Counts)

          // @ts-ignore
          const updateResponse = await this.client.pages.update(updateObject)

          console.log('🍥🔰🥥 Result of update', updateResponse)
        } else {
          console.log('🍥🔰🥥 No result found')

          const properties = PageManager.dataToProperties(dbProperties)
          console.log('🍥🔰🥥 Proeprties for write', properties)

          const response = await this.client.pages.create({
            parent: {
              database_id: cacheObject.dbId
            },
            icon: {
              type: 'emoji',
              emoji: '🥬'
            },
            properties
          })
          console.log('🍥🔰🥥 Write response', response)
        }
        // const rowId =

        // const response = await this.client.pages.update({
        //   page_id: cacheObject.dbId,
        //   properties: {
        //     'In stock': {
        //       checkbox: true,
        //     },
        //   },
        // });
      },
      get: async (key: string) => {}
    })
  }

  private findToggleBlock(name: string, children: ListBlockChildrenResponse) {
    return (
      children?.results?.length > 0 &&
      children.results.find(
        (block: any) =>
          block.type === 'toggle' &&
          block.toggle.rich_text?.[0]?.plain_text ===
            `${PageManager.BLOCK_PREFIX}${name}`
      )
    )
  }

  private async getBlock(
    blockId: string,
    forceUpdate = false
  ): Promise<ListBlockChildrenResponse> {
    if (!forceUpdate && this.cache.blocks[blockId])
      return this.cache.blocks[blockId]

    if (this.cache.fetching[blockId]) return this.cache.fetching[blockId]

    const prom: Record<string, any> = {}

    const promise = new Promise((rs, rj) => {
      prom.resolve = rs
      prom.reject = rj
    })
    this.cache.fetching[blockId] = promise

    const response = await this.client.blocks.children.list({
      block_id: blockId,
      page_size: 500
    })
    // console.log('Response for block:', response)
    // console.log('Response for block:', JSON.stringify(response, null, 1))

    this.cache.blocks[blockId] = response
    prom.resolve(response)
    this.cache.fetching[blockId] = null

    return response
  }

  private async writeToggleBlock(blockId: string, name: string, data: any) {
    const response = await this.client.blocks.children.append({
      block_id: blockId,
      children: [
        {
          type: 'toggle',
          //...other keys excluded
          toggle: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: PageManager.BLOCK_PREFIX + name,
                  link: null
                }
              }
            ],
            color: 'default',
            children: PageManager.dataToToggleChildren(data) as any
          }
        }
      ]
    })
    // console.log('Writing response:', response)
    // console.log('Writing response:', JSON.stringify(response, null, 2))

    // const children = await getBlock(response.results[0].id)
    return response.results[0]
  }

  private async writeNewToggleValue(
    blockId: string,
    key: string,
    data: any,
    linkUrl = ''
  ) {
    // decode: decodeURI
    // const keyContent = PageManager.encodeKey(key)

    const response = await this.client.blocks.children.append({
      block_id: blockId,
      children: [
        {
          type: 'toggle',
          //...other keys excluded
          toggle: {
            rich_text: PageManager.getKeyValueRichText(key, data) as any,
            color: 'gray',
            children: PageManager.getValueChildren(data) as any
          }
        }
      ]
    })
    // console.log('Writing response:', response)
    // console.log('Writing response:', JSON.stringify(response, null, 2))

    // const children = await getBlock(response.results[0].id)
    return response.results[0]
  }

  private async updateToggleValue(blockId: string, key: string, value: any) {
    // console.log('🍥🍆 WANT TO UPDATE CONFIG', blockId, value)
    // const key = Object.entries(this.cache.items).find(([k, id]: string[]) => id === blockId)?.[0]
    // console.log('🍥🍆 WANT TO UPDATE CONFIG KEY', key)

    if (!key) throw new Error('Key for blockId not found')

    const response = await this.client.blocks.update({
      block_id: blockId,
      toggle: {
        rich_text: PageManager.getKeyValueRichText(key, value) as any,
        color: 'gray'
      }
    })

    // console.log('🍥🍆  What is response of update?', response)
    // this.cache.values[key] = value
    const children = await this.getBlock(blockId, true)
    // console.log('🍥🍆  What is children of update?', children)
    await Promise.all(
      children.results.map((block: any) =>
        this.client.blocks.delete({
          block_id: block.id
        })
      )
    )
    await this.client.blocks.children.append({
      block_id: blockId,
      children: PageManager.getValueChildren(value) as any
    })

    return response
  }

  private async createDatabase(
    parentId: string,
    dbName: string,
    properties: any
  ) {
    // const myDb = await this.client.search({
    //   filter: { value: 'database', property: 'object' }
    // })

    // @ts- ignore
    const myDb = await this.client.databases.create({
      parent: {
        page_id: parentId
      },
      title: [
        {
          type: 'text',
          text: {
            content: dbName
          }
        }
      ],
      properties
    })

    // console.log('myDb Result:', myDb)
    console.log('myDb Result:', JSON.stringify(myDb, null, 1))
    // write to databases.json for inspection
    //   await (
    //     await import('fs/promises')
    //   ).writeFile('./databases.json', JSON.stringify(myDb, null, 2))

    return myDb
  }

  private parseToggleBlock(items: ListBlockChildrenResponse) {
    const results = items.results
      .filter(
        (block: any) =>
          block.type === 'toggle' &&
          block.toggle.rich_text?.[0]?.plain_text ===
            PageManager.KEY_VALUE_PREFIX
      )
      .map((block: any) =>
        block.toggle.rich_text
          .map((text: any) => [
            text.href.match(/^https:\/\/notion.settings.config\/(.*)\/$/)?.[1],
            text.plain_text
          ])
          .filter(
            ([itemType]: string[]) => ['key', 'value'].indexOf(itemType) >= 0
          )
          .reduce(
            (acc: any, [key, value]: string[]) => ({
              ...acc,
              [key]: value
            }),
            {
              blockId: block.id
            }
          )
      )
    // console.log('🥎🎟 RESULTS OF ITEMS:', results)

    // // store in local cache
    // results.forEach(({ key, value, blockId }: Record<string, string>) => {
    //   this.cache.items[key] = blockId
    //   this.cache.values[key] = PageManager.parseValue(value)
    // })

    const configed = results.reduce(
      (acc: any, setting: Record<string, string>) => ({
        ...acc,
        [setting.key]: PageManager.parseValue(setting.value)
      }),
      {}
    )
    // console.log('🥎🎟 CONFIGED:', configed)

    return [results, configed]
  }

  static dataToToggleChildren(data: any) {
    return Object.entries(data).map(([key, value]: [string, any]) => ({
      type: 'toggle',
      //...other keys excluded
      toggle: {
        rich_text: PageManager.getKeyValueRichText(key, value) as any,
        color: 'gray',
        children: PageManager.getValueChildren(value) as any
      }
    }))
  }

  static getKeyValueRichText(key: string, data: any) {
    const value = JSON.stringify(data)

    return [
      {
        type: 'text',
        text: {
          content: PageManager.KEY_VALUE_PREFIX,
          link: {
            url: 'https://notion.settings.config/key-value-prefix/'
          }
        }
      },
      {
        type: 'text',
        text: {
          content: key,
          link: {
            url: 'https://notion.settings.config/key/'
          }
        },
        annotations: {
          code: true,
          color: 'green'
        }
      },
      {
        type: 'text',
        text: {
          content: '=',
          link: {
            url: 'https://notion.settings.config/equal/'
          }
        }
      },
      {
        type: 'text',
        text: {
          content: value,
          link: {
            url: 'https://notion.settings.config/value/'
          }
        },
        annotations: {
          code: true,
          color: 'blue'
        }
      }
    ]
  }

  static getValueChildren(data: any) {
    const formattedValue = JSON.stringify(data, null, 2)

    return [
      {
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: formattedValue,
                link: {
                  url: 'https://notion.settings.config/formatted-value/'
                }
              },
              annotations: {
                code: true
              }
            }
          ]
        }
      }
    ]
  }

  static parseValue(value: string) {
    try {
      const result = JSON.parse(value)
      return result
    } catch (error) {
      return null
    }
  }

  static dataToProperties(dbProperties: Record<string, any>) {
    const [indexName, indexProperty] = Object.entries(dbProperties).find(
      ([dbName, prop]) => prop.type === 'title'
    ) as any

    const properties = Object.entries({
      [indexProperty.id]: key,
      ...data
    })
      .map(([key, value]) => {
        console.log('🍥🔰🥥 Data value', { value, key })
        const [dbName, prop] = Object.entries(dbProperties).find(
          ([dbName, property]) => property.id === key
        ) as any
        console.log('🍥🔰🥥 Property', prop)
        if (prop.type === 'title') {
          return {
            [dbName]: {
              title: [
                {
                  text: {
                    content: value
                  }
                }
              ]
            }
          }
        }
        if (prop.type === 'number') {
          return {
            [dbName]: {
              [prop.type]: Number(value)
            }
          }
        }
      })
      .reduce((acc, exp) => ({ ...acc, ...exp }), {}) as any
  }
}

export default PageManager
