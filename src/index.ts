import * as bitcoin from 'bitcoinjs-lib'
import axios from 'axios'

const main = async (): Promise<void> => {

  const keyPair = bitcoin.ECPair.makeRandom()
  const address = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey }).address
  const secret = keyPair.toWIF()

  const res = await axios({
    method: 'GET',
    url: 'https://insight.bitpay.com/api/addr/' + address,
  })

  const balance = res.data.balance
  const active = !!res.data.totalReceived

  console.log({ address, secret, balance, active })
  exit()
}

const exit = () => {
  process.stdout.write('\nPress any key to exit.\n')
  process.stdin.setRawMode(true)
  process.stdin.resume()
  process.stdin.on('data', process.exit.bind(process, 0))
}

main()
