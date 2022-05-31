import compileThemes from './compile-themes'
import fs from 'fs'
import path from 'path'

const makeThemes = async (themesPath: string, outputDir: string) => {
  const pathThemes: string[] = fs.readdirSync(themesPath)
  
  const availableThemes = pathThemes.filter((theme) => theme.endsWith('-theme'))
  const themesSources = availableThemes.map((theme) =>
    path.join(themesPath, theme)
  )
  const themes = await compileThemes(themesSources, {
    outputDir: path.join(outputDir, 'themes')
  })

  const indexJs = `exports.default = ${JSON.stringify(themes, null, 2)}`
  await fs.promises.writeFile(path.join(outputDir, 'index.js'), indexJs)

  const moduleJs = `
export const version = '${themes.version}';
export const themes = ${JSON.stringify(themes.themes, null, 2)};
export default { themes, version };`
  await fs.promises.writeFile(path.join(outputDir, 'index.mjs'), moduleJs)


  const types = `import { CompiledTheme, CompiledVariant } from '@djitsu/theme-compiler';
declare const themes: CompiledTheme[];
declare const version: string;
export { version, themes, CompiledTheme, CompiledVariant };`

  await fs.promises.writeFile(path.join(outputDir, 'index.d.ts'), types)
}

export default makeThemes
