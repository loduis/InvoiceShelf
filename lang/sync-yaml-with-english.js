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

function saveYaml(filename, data) {
    if (!filename.endsWith('.yml')) {
        filename += '.yml'
    }
    fs.writeFileSync(resolve(filename), YAML.dump(data, { noRefs: true }))
}

function syncYamlFiles(directory) {
  const files = fs.readdirSync(directory)
  let englishData = null
  let englishFilename = null

  // Read the English file
  files.forEach(file => {
    if ((path.extname(file) === '.yml' || path.extname(file) === '.yaml') && path.basename(file, path.extname(file)) === 'en') {
      englishData = readFileSync(file, true)
      englishFilename = file
    }
  })

  if (!englishData) {
    console.error('English file (en.yml or en.yaml) not found.')
    return
  }

  // Sync other files with the English file
  files.forEach(file => {
    if ((path.extname(file) === '.yml' || path.extname(file) === '.yaml') && file !== englishFilename) {
      const yamlData = readFileSync(file, true)
      let syncedData = syncWithEnglish(englishData, yamlData)
      syncedData = removeAdditionalKeys(englishData, syncedData)
      saveYaml(file, syncedData)
      console.log(`Synced ${file} with ${englishFilename}`)
    }
  })
}

function syncWithEnglish(englishData, yamlData) {
  const syncedData = {}

  // Add missing keys
  Object.keys(englishData).forEach(key => {
    if (yamlData.hasOwnProperty(key)) {
      if (typeof englishData[key] === 'object' && !Array.isArray(englishData[key])) {
        syncedData[key] = syncWithEnglish(englishData[key], yamlData[key])
      } else if (yamlData[key]) {
        syncedData[key] = yamlData[key]
      } else {
        syncedData[key] = englishData[key]
      }
    } else {
      syncedData[key] = englishData[key] // Use the English data if the key is missing
    }
  })

  return syncedData
}

function removeAdditionalKeys(englishData, syncedData) {
  const cleanedData = {}

  // Remove additional keys that are not in the English file
  Object.keys(syncedData).forEach(key => {
    if (englishData.hasOwnProperty(key)) {
      if (typeof englishData[key] === 'object' && !Array.isArray(englishData[key])) {
        cleanedData[key] = removeAdditionalKeys(englishData[key], syncedData[key])
      } else {
        cleanedData[key] = syncedData[key]
      }
    } else {
      console.log(`Removing additional key: ${key}`)
    }
  })

  return cleanedData
}

syncYamlFiles(__dirname)
