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
    return YAML.load(content)
  }
  return content
}

function saveJson(filename, data) {
    if (!filename.endsWith('.json')) {
        filename += '.json'
    }
    fs.writeFileSync(resolve(filename), JSON.stringify(data, null, 2) + "\n")
}

function convertYamlToJson(directory) {
  const files = fs.readdirSync(directory)
  files.forEach(file => {
    if (path.extname(file) === '.yml' || path.extname(file) === '.yaml') {
      const yamlData = readFileSync(file, true)
      const jsonFilename = path.basename(file, path.extname(file)) + '.json'
      saveJson(jsonFilename, yamlData)
      console.log(`Converted ${file} to ${jsonFilename}`)
    }
  })
}

convertYamlToJson(__dirname)
