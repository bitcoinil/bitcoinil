import arg from 'arg'
import 'dotenv/config'
import { Client } from '@notionhq/client'

import PageManager from './page-manager'
import { databases as schema } from './language-handler'
import NotionDatabaseHandler from './page-manager/database.handler'

const args = arg(
  {
    '--page': String,
    '--token': String,
    '--demo': Boolean,
    '--start-index': Number,
    '--limit': Number,
    '--no-write': Boolean,
    '--no-extract': Boolean,
    '--verbose': Boolean
  },
  { permissive: true }
)

const init = async () => {
  const notionToken = args['--token'] || process.env.NOTION_TOKEN
  const pageName = args['--page'] || process.env.NOTION_PAGE
  const verbose = args['--verbose']
  const noWrite = args['--no-write']
  const noExtract = args['--no-extract']
  const allowToPost = true

  if (!pageName) {
    console.log(
      'ℹ️ Please provide a page name with --page or set the environment variable NOTION_PAGE'
      // 'Pass in page name via cli (e.g. `$ locale-handler --page my-page-name`) or as a env variable named `NOTION_PAGE`'
    )
    throw new Error('Page name is required')
  }
  if (!notionToken) {
    console.log(
      'ℹ️ Please provide a Notion token with --token or set the environment variable NOTION_TOKEN'
      // 'Pass in page name via cli (e.g. `$ locale-handler --page my-page-name`) or as a env variable named `NOTION_PAGE`'
    )
    throw new Error('Notion token is required')
  }

  // Initializing a client
  const client = new Client({
    auth: notionToken
  })

  verbose && console.log('📄 Initializing on page:', pageName)
  verbose && console.time('init')

  const page = await PageManager.initFromPageName(pageName, client)
  verbose && console.log('📄 Page initialized', page.pageId)

  await new Promise((r) => (page.onReady = () => r(null)))
  verbose && console.timeLog('init', 'Page ready')

  const database = new NotionDatabaseHandler(page, schema)
  verbose && console.log('🗂 Database initialized', database.page.pageId)

  await new Promise((r) => (database.onReady = () => r(null)))
  verbose && console.timeLog('init', 'Database ready')
  verbose && console.log('🗂 Database ready')

  if (!noExtract) {
    const util = await import('node:util')
    const exec = util.promisify((await import('node:child_process')).exec)
    const { stdout, stderr, ...rest } = await exec(
      'cd ../../apps/bitcoin-il/ && yarn extract-intl'
    )
    verbose && console.timeLog('init', 'Language extracted')
    verbose && console.log('🗂 Language ready')
  }

  if (!noWrite) {
    const langData = await (
      await import('fs/promises')
    ).readFile('../../apps/bitcoin-il/lang.json', 'utf8')
    verbose && console.timeLog('init', 'Source ready')

    const demoMode = args['--demo']

    const limitTo = args['--limit'] || 3
    const startFrom = args['--start-index'] || 0
    let lastId = ''
    if (limitTo && allowToPost) {
      try {
        const langDataJSON = JSON.parse(langData)
        const langDataKeys = Object.keys(langDataJSON)
        await langDataKeys.reduce(
          (p, key, index) =>
            ((!demoMode || index <= limitTo - 1) &&
              (!startFrom || startFrom <= index) &&
              p.then(async () => {
                const { defaultMessage, description } = langDataJSON[key]

                const setRes = await database.set('language', key, {
                  Default: demoMode
                    ? defaultMessage.replace(
                        /\d{3}$/,
                        Math.floor(Math.random() * 1000)
                      )
                    : defaultMessage,
                  ...(description ? { Description: description } : {})
                  // English: defaultMessage
                })

                setRes && verbose && console.log('Set res:', key, '-', setRes)
                verbose &&
                  console.timeLog(
                    'init',
                    `Finished '${key}' (${index + 1}/${langDataKeys.length})`
                  )
                lastId = setRes
              })) ||
            p,
          Promise.resolve()
        )
      } catch (e) {
        console.error('📄 Error filling in database', e)
      }
    }

    if (demoMode && lastId) {
      verbose &&
        console.log('🚨🚨🚨🚨 DELETING LAST ID in 20 seconds...', lastId)
      setTimeout(async () => {
        verbose && console.log('🚨🚨🚨🚨 DELETING LAST ID', lastId)
        await client.pages.update({
          page_id: lastId,
          archived: true
        })
      }, 20000)
    }
  }

  verbose && console.log('🗂 Everything ready')
  verbose && console.timeEnd('init')
}

export default init
