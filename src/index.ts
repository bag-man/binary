import { btc } from './lib/btc'
import { readFile } from './lib/file'
import { asset } from './lib/assets'

const exit = (): void => {
  process.stdout.write('\nPress any key to exit.\n')
  process.stdin.resume()
  process.stdin.on('data', process.exit.bind(process, 0))
}

const main = async (): Promise<void> => {
  await readFile(asset('data.json'))
  await btc()
  exit()
}

main()
