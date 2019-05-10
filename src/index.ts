import * as bitcoin from 'bitcoinjs-lib'
import axios from 'axios'
import * as fs from 'fs'
import * as path from 'path'

// Demonstrate use of external libaries
const btc = async (): Promise<void> => {
  const keyPair = bitcoin.ECPair.makeRandom()
  const address = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey }).address
  const secret = keyPair.toWIF()

  const res = await axios ({
    method: 'GET',
    url: 'https://insight.bitpay.com/api/addr/' + address
  })

  const balance = res.data.balance
  const active = !!res.data.totalReceived

  console.log({ address, secret, balance, active })
}

// Demonstrate ability to interact with bundled assets
const readFile = async (): Promise<void> => {
  const content = fs.readFileSync(path.join(__dirname, 'assets/data.json'), 'utf8')
  console.log(JSON.parse(content))
}

const exit = (): void => {
  process.stdout.write('\nPress any key to exit.\n')
  process.stdin.resume()
  process.stdin.on('data', process.exit.bind(process, 0))
}

const main = async (): Promise<void> => {
  await readFile()
  await btc()
  exit()
}

main()
