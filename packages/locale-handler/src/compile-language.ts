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
  
  verbose && console.log('🗂 Getting language')
  const items = await database.read('language', 3, false)

  console.log('Items:', items)
  console.log('Items:', items.length)
  

  verbose && console.timeLog('init', 'Langauge loaded')

  verbose && console.log('🗂 Everything ready')
  verbose && console.timeEnd('init')
}

export default init
