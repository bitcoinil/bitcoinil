import 'dotenv/config'
import { Client } from '@notionhq/client'
import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'
import PageManager from './page-manager'
import { databases as schema } from './language-handler'
import NotionDatabaseHandler from './page-manager/database.handler'

// console.log('WE ARE HANDKER!xxx!', process.env.NOTION_PAGE_TITLE)

const init = async (pageName: string) => {
  // Initializing a client
  const client = new Client({
    auth: process.env.NOTION_TOKEN
  })

  const page = await PageManager.initFromPageName(pageName, client)
  console.log('📄 Page initialized', page.pageId)
  const pagePromise = await new Promise(
    (r) =>
      (page.onReady = () => {
        r(null)
      })
  )
  console.log('📄 Page ready')

  const database = new NotionDatabaseHandler(page, schema)
  console.log('🗂 Database initialized', database.page.pageId)

  const databasePromise = await new Promise(
    (r) =>
      (database.onReady = () => {
        r(null)
      })
  )

  console.log('🗂 Database ready')
  
}

const pageName = 'peks'
init(pageName)
