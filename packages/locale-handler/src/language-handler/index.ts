export const databases = {
  language: {
    properties: {
      Key: {
        id: 'title',
        type: 'title',
        title: {}
      },
      Default: {
        id: 'default',
        rich_text: {}
      },
      Description: {
        id: 'description',
        rich_text: {}
      },
    },
    relatedProperties: (dbs) => ({
      Hebrew: {
        id: 'hebrew',
        type: 'relation',
        database_id: dbs['he-language'].instance.instance.id
      },
      English: {
        id: 'english',
        type: 'relation',
        database_id: dbs['en-language'].instance.instance.id
      },
    })
  },
  'he-language': {
    properties: {
      Message: {
        id: 'message',
        type: 'title',
        title: {}
      }
    }
  },
  'en-language': {
    properties: {
      Message: {
        id: 'message',
        type: 'title',
        title: {}
      }
    }
  }

}