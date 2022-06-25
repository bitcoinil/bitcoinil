import 'dotenv/config'
import { Client } from '@notionhq/client'
import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'
import PageManager from './page-manager'
import { databases as schema } from './language-handler'
import NotionDatabaseHandler from './page-manager/database.handler'

// console.log('WE ARE HANDKER!xxx!', process.env.NOTION_PAGE_TITLE)

const init = async (pageName: string) => {
  const loadData = true
  const allowToPost = true

  // Initializing a client
  const client = new Client({
    auth: process.env.NOTION_TOKEN
  })

  console.log('📄 Initializing on page:', pageName)
  console.time('init')
  const page = await PageManager.initFromPageName(pageName, client)
  // console.log('📄 Page initialized', page.pageId)
  await new Promise((r) => (page.onReady = () => r(null)))
  console.timeLog('init', 'Page ready')

  const database = new NotionDatabaseHandler(page, schema)
  // console.log('🗂 Database initialized', database.page.pageId)

  await new Promise((r) => (database.onReady = () => r(null)))

  console.timeLog('init', 'Database ready')

  // console.log('🗂 Database ready')

  if (loadData) {
    const langData = await (
      await import('fs/promises')
    ).readFile('../../apps/bitcoin-il/lang.json', 'utf8')
    console.timeLog('init', 'Source ready')

    const demoMode = true

    const limitTo = 3
    let lastId = ''
    if (limitTo && allowToPost) {
      try {
        const langDataJSON = JSON.parse(langData)
        const langDataKeys = Object.keys(langDataJSON)
        await langDataKeys.reduce(
          (p, key, index) =>
            (index <= limitTo - 1 &&
              p.then(async () => {
                const { defaultMessage, description } = langDataJSON[key]

                const setRes = await database.set('language', key, {
                  Default: demoMode
                    ? defaultMessage.replace(
                        /\d{3}$/,
                        Math.floor(Math.random() * 1000)
                      )
                    : defaultMessage,
                  Description: description
                  // English: defaultMessage
                })

                console.log('Set res:', setRes)
                if (setRes) lastId = setRes
              })) ||
            p,
          Promise.resolve()
        )
      } catch (e) {
        console.error('📄 Error filling in database', e)
      }
    }

    if (demoMode && lastId) {
      console.log('🚨🚨🚨🚨 DELETING LAST ID in 20 seconds...', lastId)
      setTimeout(async () => {
        console.log('🚨🚨🚨🚨 DELETING LAST ID', lastId)
        await client.pages.update({
          page_id: lastId,
          archived: true
        })
      }, 20000)
    }
  }

  console.log('🗂 Everything ready')
  console.timeEnd('init')
}

const pageName = 'peks'
init(pageName)
