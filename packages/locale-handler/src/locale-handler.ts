import 'dotenv/config'
import { Client } from '@notionhq/client'
import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'
import PageManager from './page-manager'

// console.log('WE ARE HANDKER!xxx!', process.env.NOTION_PAGE_TITLE)

// // Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN
})

type ConfCache = {
  confBlockId?: string
  items: Record<string, string>
  values: Record<string, any>
  fetching: Record<string, Promise<any> | null | false>
  blocks: Record<string, ListBlockChildrenResponse>
}

const confCache: ConfCache = {
  items: {},
  values: {},
  fetching: {},
  blocks: {}
}

const getPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({ page_id: pageId })
  console.log('Response for page:', response)

  return response
}
const getBlock = async (blockId: string, forceUpdate = false) => {
  if (!forceUpdate && confCache.blocks[blockId])
    return confCache.blocks[blockId]

  if (confCache.fetching[blockId]) return confCache.fetching[blockId]

  const prom: Record<string, any> = {}

  const promise = new Promise((rs, rj) => {
    prom.resolve = rs
    prom.reject = rj
  })
  confCache.fetching[blockId] = promise

  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 500
  })
  // console.log('Response for block:', response)
  console.log('Response for block:', JSON.stringify(response, null, 1))

  confCache.blocks[blockId] = response
  prom.resolve(response)
  confCache.fetching[blockId] = null

  return response
}

const getSetting = async (blockId: string) => {
  const children = await getBlock(blockId)

  const value = children

  // console.log('🚸🚸🚸 Children:', children)
  console.log('🚸🚸🚸 Children:', JSON.stringify(children, null, 2))
}

const writeConfBlock = async (blockId: string, data: any) => {
  const response = await notion.blocks.children.append({
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
                content: '$$Locale Configuration Block$$',
                link: null
              }
            }
          ],
          color: 'default',
          children: [
            {
              object: 'block',
              type: 'paragraph',
              paragraph: {
                rich_text: [
                  {
                    type: 'text',
                    text: {
                      content: 'Encanto picato regni peru',
                      link: {
                        url: 'https://en.wikipedia.org/wiki/bitcoin_il'
                      }
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    ]
  })
  // console.log('Writing response:', response)
  console.log('Writing response:', JSON.stringify(response, null, 2))

  // const children = await getBlock(response.results[0].id)
  return response.results[0]
}

const KEY_VALUE_PREFIX = `⚙️ `
const encodeKey = (key: string) => {
  const keyValue = encodeURI(key)
  const keyContent = `${KEY_VALUE_PREFIX}${keyValue}`
  return keyContent
}

const getKeyValueRichText = (key: string, data: any) => {
  const value = JSON.stringify(data)

  return [
    {
      type: 'text',
      text: {
        content: KEY_VALUE_PREFIX,
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

const getValueChildren = (data: any) => {
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

const updateConfigValue = async (blockId: string, value: any) => {
  console.log('🍥🍆 WANT TO UPDATE CONFIG', blockId, value)
  const key = Object.entries(confCache.items).find(
    ([k, id]: string[]) => id === blockId
  )?.[0]
  console.log('🍥🍆 WANT TO UPDATE CONFIG KEY', key)

  if (!key) throw new Error('Key for blockId not found')

  const response = await notion.blocks.update({
    block_id: blockId,
    toggle: {
      rich_text: getKeyValueRichText(key, value) as any,
      color: 'gray'
    }
  })

  console.log('🍥🍆  What is response of update?', response)
  confCache.values[key] = value
  const children = await getBlock(blockId, true)
  console.log('🍥🍆  What is children of update?', children)
  await Promise.all(
    children.results.map((block: any) =>
      notion.blocks.delete({
        block_id: block.id
      })
    )
  )
  await notion.blocks.children.append({
    block_id: blockId,
    children: getValueChildren(value) as any
  })

  return response
}

const writeNewConfigValue = async (
  blockId: string,
  key: string,
  data: any,
  linkUrl = ''
) => {
  // decode: decodeURI
  const keyContent = encodeKey(key)

  const response = await notion.blocks.children.append({
    block_id: blockId,
    children: [
      {
        type: 'toggle',
        //...other keys excluded
        toggle: {
          rich_text: getKeyValueRichText(key, data) as any,
          color: 'gray',
          children: getValueChildren(data) as any
        }
      }
    ]
  })
  // console.log('Writing response:', response)
  console.log('Writing response:', JSON.stringify(response, null, 2))

  // const children = await getBlock(response.results[0].id)
  return response.results[0]
}

const getConf = async (parentBlockId: string) => {
  if (!parentBlockId) throw new Error('No parent block id provided')

  const children = await getBlock(parentBlockId)

  const confBlockId = (
    (children?.results?.length > 0 &&
      children.results.find(
        (block: any) =>
          block.type === 'toggle' &&
          block.toggle.rich_text?.[0]?.plain_text ===
            '$$Locale Configuration Block$$'
      )) ||
    (await writeConfBlock(parentBlockId, {}))
  ).id

  if (!confBlockId) throw new Error('No conf block id')

  confCache.confBlockId = confBlockId

  const confChildren = await getBlock(confBlockId)
  const prefix = '⚙️ '

  // const matcher = new RegExp(`^${prefix}(.*)$`)

  console.log('✈️ Conf Block', confChildren)
  // if (!confBlock) throw new Error('Unable to create configuration block')
  // const confs = await Promise.all(
  //   confChildren.results.map((block: any) => {
  //     if (block.type === 'toggle') {
  //       const key = block.toggle.rich_text?.[0]?.plain_text.match(matcher)?.[1]
  //       if (key && !confCache.fetching[key]) {
  //         confCache.fetching[key] = true
  //         confCache.items[key] = block.id

  //         return getSetting(block.id).then((settings: any) => {
  //           console.log('RECEIVED SETTINGS FOR:', key, block.id, settings)
  //         })
  //       }
  //     }
  //   })
  // )

  const parseValue = (value: string) => {
    try {
      const result = JSON.parse(value)
      return result
    } catch (error) {
      return null
    }
  }

  const getSettings = async (key?: string, forceUpdate = false) => {
    // ...
    if (!forceUpdate && key && confCache.items.hasOwnProperty(key))
      return key ? confCache.values : confCache.values[key]

    const items = await getBlock(confBlockId)
    console.log('🥎🎟 GET ITEMS:', items)
    // await (await import('fs/promises')).writeFile('./items-sample.json', JSON.stringify(items, null, 2))

    const results = items.results
      .filter(
        (block: any) =>
          block.type === 'toggle' &&
          block.toggle.rich_text?.[0]?.plain_text === prefix
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
    console.log('🥎🎟 RESULTS OF ITEMS:', results)

    // store in local cache
    results.forEach(({ key, value, blockId }: Record<string, string>) => {
      confCache.items[key] = blockId
      confCache.values[key] = parseValue(value)
    })

    const configed = results.reduce(
      (acc: any, setting: Record<string, string>) => ({
        ...acc,
        [setting.key]: parseValue(setting.value)
      }),
      {}
    )
    console.log('🥎🎟 CONFIGED:', configed)

    return configed
  }

  const set = async (key: string, value: any) => {
    console.log('✈️ SETTING VALUE OF', key, value)
    if (!confCache.items.hasOwnProperty(key)) {
      const result = await writeNewConfigValue(confBlockId, key, value)
      console.log('✈️ Set result', result)
      confCache.items = { ...confCache.items, [key]: result.id }
      confCache.values = { ...confCache.values, [key]: value }
    } else {
      const result = await updateConfigValue(confCache.items[key], value)
      console.log('✈️ Update result', result)
      // confCache.items = { ...confCache.items, [key]: result.id }
    }
  }

  const conf = await getSettings()
  return {
    id: confBlockId,
    get: getSettings,
    set,
    conf
    //   get: (key: string) => {
    //     const value = confBlock?.toggle?.children?.find(
    //       (child: any) => child.type === 'paragraph'
    //     )?.paragraph?.rich_text?.[0]?.text?.content

    //     return value
    //   }
  }
}

if (true)
  (async () => {
    const DEFAULT_PAGENAME = 'xms-configuration'
    const page = await PageManager.initFromPageName(
      process.env.XXXNOTION_PAGE_TITLE || DEFAULT_PAGENAME,
      notion
    )
    // console.log('🥥🥝 WE GOT PAGE MANGER:', page)
    page.onReady = async () => {
      console.log('Page Manager loaded and ready:', page)
      console.log('🥥🥝 Page Manager containers:', page.cache.containers)
      // page.setOption('showPageName', false)

      // const moarValue = await page.getOption('moar')
      // console.log('🪩 Received moar value:', moarValue)

      // console.log('Wait for two seconds and continue')
      // await new Promise((resolve) => setTimeout(resolve, 2000))

      // // create random set of emojis
      // const emojis = Array.from({ length: 10 }, () =>
      //   String.fromCodePoint(
      //     Math.floor(Math.random() * (0x1f600 - 0x1f64f + 1)) + 0x1f600
      //   )
      // )
      // console.log('Random emojis set:', emojis)

      // const setResult = await page.setOption('moar', emojis[0])
      // console.log('🍔 Set moar value', setResult)

      // console.log('Waiting two seconds and getting the value...')
      // await new Promise((resolve) => setTimeout(resolve, 2000))
      // const getResult = await page.getOption('moar')
      // console.log('🍔 Got moar value', getResult)

      // read lang.json file
      const data = await (await import('fs/promises')).readFile('./lang.json', 'utf8')
      // const data = await import('./lang.json')
      console.log('le data:', data)

      try {
        const lang = JSON.parse(data)
        console.log('🥥🥝 Lang data:', lang)
        const properties = {
          "Name": {
            id: 'title',
            type: 'title',
            title: {}
          },
          "Counts": {
            id: 'counts',
            type: "number",
            number: {
              format: 'number_with_commas'
            }
          }
      }
        const langdb = await page.getDatabase('smoothie', properties)
        // console.log('🥥🥝 Lang DB:', langdb)
        // const dbdata = await langdb.read()
        // console.log('🥥🥝 Lang DB data:', dbdata)
        const writeResult = await langdb.set('some key', {
          counts: 123
        })
        console.log('🥥🥝 Write result:', writeResult)
      } catch (error) {
        console.log('🥥🥝 Bad lang data:', error)

      }

    }
    if (page) return true

    const response = await notion.search({
      query: process.env.NOTION_PAGE_TITLE,
      sort: {
        direction: 'ascending',
        timestamp: 'last_edited_time'
      }
    })

    console.log(JSON.stringify(response, null, 2))
    // console.log(response)
    if (response.results?.length === 0) {
      console.log('Not found')
      console.log(
        `Please create page with title: "${process.env.NOTION_PAGE_TITLE}" and share with integration`
      )
      return
    }

    const pageId = response.results[0].id
    console.log('Page ID:', pageId)
    // const page = await getPage(pageId)
    const conf = await getConf(pageId)
    console.log('Config:', conf)
    // const children = await getBlock(pageId)
    if (page) return true

    // const resultOfSet = await conf.set('allocateRam', '1000gb')
    // console.log('Result of set:', resultOfSet)
    // const resultOfSet2 = await conf.set('locale', 'en-US')
    // console.log('Result of set:', resultOfSet2)
    // const resultOfSet3 = await conf.set('ttl', 12)
    // console.log('Result of set:', resultOfSet3)
    // const resultOfSet4 = await conf.set('xcode', false)
    // console.log('Result of set:', resultOfSet4)
    // const resultOfSet5 = await conf.set('newcode', 'SmaASHING!')
    // console.log('Result of set:', resultOfSet5)

    // const locale = await conf.get('locale')
    // console.log('Locale:', locale)
    // const ttl = await conf.get('ttl')
    // console.log('ttl:', ttl)

    // if (children.results.length > 0) {
    //   const confBlock = children.results.find(
    //     (block: any) =>
    //       block.type === 'toggle' &&
    //       block.toggle.rich_text?.[0]?.plain_text ===
    //         '$$Locale Configuration Block$$'
    //   )
    //   // console.log('Conf block:', confBlock)
    //   console.log('Conf block:', JSON.stringify(confBlock, null, 2))
    // }

    // const written = await writeConfBlock(pageId, {})

    console.log('🏁🏁🏁 Cache at the end:', confCache)
  })()
