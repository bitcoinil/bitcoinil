import { DatabaseSchema } from "../database.types"

export const databases: DatabaseSchema = {
  language: {
    properties: {
      Key: {
        name: 'title',
        type: 'title',
        title: {}
      },
      Default: {
        name: 'defaultMessage',
        type: 'rich_text',
        rich_text: {}
      },
      Description: {
        name: 'description',
        type: 'rich_text',
        rich_text: {}
      },
      Hebrew: {
        type: 'relation',
        name: 'Hebrew',
        relation: {
          database_id: 'self::he-language',
          // synced_property_name: 'Hebrew Translation'
        }
      },
      English: {
        type: 'relation',
        name: 'English',
        relation: {
          database_id: 'self::en-language',
          // synced_property_name: 'English Translation'
        }
      },
      LastUpdate: {
        type: 'last_edited_time',
        last_edited_time: {}
      }
    },
    relatedProperties: {
      Hebrew: {
        type: 'relation',
        name: 'Hebrew',
        relation: {
          database_id: 'he-language',
          // synced_property_name: 'Hebrew Translation'
        }
      },
      English: {
        type: 'relation',
        name: 'English',
        relation: {
          database_id: 'en-language',
          // synced_property_name: 'English Translation'
        }
      },
      // Arabic: {
      //   id: 'arabic',
      //   type: 'relation',
      //   relation: {
      //     database_id: dbs['ar-language'].instance.instance.id,
      //     synced_property_name: 'Arabic Translation'
      //   }
      // },
      // Russian: {
      //   id: 'russian',
      //   type: 'relation',
      //   relation: {
      //     database_id: dbs['ru-language'].instance.instance.id,
      //     synced_property_name: 'Russian Translation'
      //   }
      // }
    }
  },
  'he-language': {
    properties: {
      Message: {
        name: 'message',
        type: 'title',
        title: {}
      },
      LastUpdate: {
        type: 'last_edited_time',
        last_edited_time: {}
      }
    }
  },
  'en-language': {
    properties: {
      Message: {
        name: 'message',
        type: 'title',
        title: {}
      },
      LastUpdate: {
        type: 'last_edited_time',
        last_edited_time: {}
      }
    }
  },
  // 'ar-language': {
  //   properties: {
  //     Message: {
  //       id: 'message',
  //       type: 'title',
  //       title: {}
  //     }
  //   }
  // },
  // 'ru-language': {
  //   properties: {
  //     Message: {
  //       id: 'message',
  //       type: 'title',
  //       title: {}
  //     }
  //   }
  // }

}