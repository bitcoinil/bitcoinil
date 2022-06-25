import arg from 'arg'
import 'dotenv/config'
import { Client } from '@notionhq/client'
import fs from 'fs/promises'
import { getTsconfig } from 'get-tsconfig'

import PageManager from './page-manager'
import { databases as schema } from './language-handler'
import NotionDatabaseHandler from './page-manager/database.handler'
import _ from 'lodash'

const args = arg(
  {
    '--page': String,
    '--token': String,
    '--demo': Boolean,
    '--start-index': Number,
    '--limit': Number,
    '--listen': Boolean,
    '--output': String,
    '--verbose': Boolean
  },
  { permissive: true }
)

const init = async () => {
  const notionToken = args['--token'] || process.env.NOTION_TOKEN
  const pageName = args['--page'] || process.env.NOTION_PAGE
  const verbose = args['--verbose']

  const tsconfig = getTsconfig()

  const outputDir = args['--output'] || tsconfig?.config?.compilerOptions?.outDir

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
  if (!outputDir) {
    console.log(
      'ℹ️ Please provide an output directory with --output or set the `{ compilerOptions: { outDir: "./dist" } }` in tsconfig.json'
    )
    throw new Error('Output directory is required')
  }

  // Initializing a client
  const client = new Client({
    auth: notionToken
  })

  verbose && console.log('🚁 Initializing on page:', pageName)
  verbose && console.time('init')

  const page = await PageManager.initFromPageName(pageName, client)
  verbose && console.log('🚁 Page initialized', page.pageId)

  await new Promise((r) => (page.onReady = () => r(null)))
  verbose && console.timeLog('init', 'Page ready')

  const database = new NotionDatabaseHandler(page, schema)
  verbose && console.log('🛟 Database initialized', database.page.pageId)

  await new Promise((r) => (database.onReady = () => r(null)))
  verbose && console.timeLog('init', 'Database ready')
  verbose && console.log('🛟 Database ready')

  if (args['--listen']) {
    console.log("LISTEN!")
    database.listen('language', (data) => {
      console.log('Data for database language:', data)
    })
    database.listen('he-language', (data) => {
      console.log('Data for database he-language:', data)
    })
    database.listen('en-language', (data) => {
      console.log('Data for database en-language:', data)
    })
  }
  verbose && console.log('🛟 Database ready')
}

const initA = async () => {
  const notionToken = args['--token'] || process.env.NOTION_TOKEN
  const pageName = args['--page'] || process.env.NOTION_PAGE
  const verbose = args['--verbose']

  const tsconfig = getTsconfig()

  const outputDir = args['--output'] || tsconfig?.config?.compilerOptions?.outDir

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
  if (!outputDir) {
    console.log(
      'ℹ️ Please provide an output directory with --output or set the `{ compilerOptions: { outDir: "./dist" } }` in tsconfig.json'
    )
    throw new Error('Output directory is required')
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
  const items = await database.read('language') //, 10, false)
  verbose && console.timeLog('init', 'Languages loaded')
  
  const languages = { en: 'English', he: 'Hebrew' }
  verbose && console.log('🗂 Compiling languages...')
  const langs = Object.values(items).reduce((acc, item: any) => {
    const key = item.values.Key
    const deks = Object.entries(languages).reduce((acc, [lang, dbKey]) => {
      const value = item.hydrated[dbKey]
      if (!value) return acc

      return {
        ...acc,
        [lang]: {
          [key]: value
        }
      }
    }, {})

    const merged = _.merge(acc, deks)

    return merged

    // return { ...acc, [key]: { name: value, code: key } }
  }, {}) as Record<string, any>

  await Object.entries(langs).reduce((p, [lang, deck]: [string, any], index) => p.then(async () => {
    // sleep half a second
    const items = Object.values(deck)
    if (items.length) {
      // Keep source files
      await fs.writeFile(`${outputDir}/lib/${lang}.wet.json`, JSON.stringify(deck, null, 2))
    }
    verbose && console.timeLog('init', `Language compiled: ${lang} - ${Object.keys(deck).length} keys (${index + 1}/${Object.keys(langs).length})`)

}), Promise.resolve())
  verbose && console.timeLog('init', 'Langauges compiled')

  verbose && console.log('🗂 Everything ready')
  verbose && console.timeEnd('init')
}

export default init
