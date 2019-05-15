import * as path from 'path'

export const asset = (file: string): string => {
  if (!process.pkg) {
    if (process.env.NODE_ENV === 'dev') {
      return path.join(__dirname, `../../assets/${file}`)
    }
    return path.join(__dirname, `../assets/${file}`)
  }

  return path.join(__dirname, `assets/${file}`)
}
