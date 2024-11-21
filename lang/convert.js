import YAML from 'js-yaml'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url)).replace(
  'dist/server', 'src'
)
const resolve = (filename) => path.resolve(__dirname, filename)
const readFileSync = (filename, parse = false) => {
  const content = fs.readFileSync(resolve(filename), { encoding: 'utf-8' })
  if (parse) {
    return JSON.parse(content)
  }
  return content
}

function saveYaml(filename, data) {
    if (!filename.endsWith('.yml')) {
        filename += '.yml'
    }
    fs.writeFileSync(resolve(filename), YAML.dump(data, { noRefs: true }))
}

function convertJsonToYaml(directory) {
  const files = fs.readdirSync(directory)
  files.forEach(file => {
    if (path.extname(file) === '.json') {
      const jsonData = readFileSync(file, true)
      const yamlFilename = path.basename(file, '.json') + '.yml'
      saveYaml(yamlFilename, jsonData)
      console.log(`Converted ${file} to ${yamlFilename}`)
    }
  })
}

convertJsonToYaml(__dirname)
