import * as fs from 'fs'

export const readFile = async (file: string): Promise<void> => {
  try {
    const content = fs.readFileSync(file, 'utf8')
    console.log(JSON.parse(content))
  } catch(err) {
    console.error(err.message)
  }
}

