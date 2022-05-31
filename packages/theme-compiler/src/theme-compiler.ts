import path from 'path'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import rimraf from 'rimraf'
import makeThemes from './make-themes'

yargs(hideBin(process.argv))
  .command('compile <source>', 'compile path of themes', {
    base: {
      type: 'string',
      alias: 'b',
      describe: 'base path of execution (source and output dirs affected)',
    },
    source: {
      default: './'
    },
    output: {
      alias: 'o',
      default: './dist'
    },
    clean: {
      type: 'boolean',
      default: true
    }
  }, async (argv) => {
    const { source, output, base, clean } = argv
    const basePath = base || path.dirname(process.argv[1])

    clean && rimraf.sync(path.join(basePath, output))
    await makeThemes(path.join(basePath, source), path.join(basePath, output))
  })
  .demandCommand(1)
  .parse()
  