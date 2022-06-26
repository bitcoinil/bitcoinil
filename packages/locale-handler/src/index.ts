import arg from 'arg'

const args = arg(
  {
    '--ingest-language': Boolean,
    '--compile-language': Boolean,
    '--silent': Boolean
  },
  { permissive: true }
)

const init = async () => {
  if (args['--ingest-language']) {
    const ingest = (await import('./ingest-language')).default
    await ingest()
  } else if (args['--compile-language']) {
    const compile = (await import('./compile-language')).default
    await compile()
  } else {
    console.log('What to do?')
    console.log('`$ locale-handler --ingest-language` - ingest language into notion')
    console.log('`$ locale-handler --compile-language` - compile language from notion')
  }
}

let loaded = false
while (!loaded) {
  try {
    if (args['--silent']) init().catch(() => {})
    else init()
    loaded = true
  } catch (e) {
    console.log('Error loading:', e)
    console.log('Language loading failed... trying again...')
  }
}
