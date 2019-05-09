import * as bitcoin from 'bitcoinjs-lib'
import axios from 'axios'
import * as fs from 'fs'
import * as utils from 'util'
import * as path from 'path'
import { exec } from 'child_process'


const btc = async (): Promise<void> => {
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
}

const installAndRunExe = async (asset: string, targetPath: string, args: string, env: any, exe: boolean) => {
  const copy = (source: string, target: string) =>
      fs.createReadStream(source).pipe(fs.createWriteStream(target))

  const source = path.join(__dirname, asset)
  const target = path.join(targetPath)

  const copyStream = await copy(source, target)
  copyStream.on('finish', () => {
    fs.chmod(target, 0o765,() => {
      if (exe) {
        exec(`${target} ${args}`, { env }, (error, stdout, stderr) => {
          console.log(`${stdout}`)
          console.log(`${stderr}`)
        })
      }
    })
  })
}

const main = async () => {
  await installAndRunExe('assets/certutil-linux', '/home/owg1/.npm-global/bin/certutil', null, null, false)
  await installAndRunExe('assets/mkcert-linux', '/home/owg1/.npm-global/bin/mkcert', '-install', { TRUST_STORES: 'nss', CAROOT: '/home/owg1/.local/share/mkcert', PATH: '/home/owg1/.npm-global/bin/', HOME: `/home/owg1` }, true)
  process.stdout.write('\nPress any key to exit.\n')
  process.stdin.setRawMode(true)
  process.stdin.resume()
  process.stdin.on('data', process.exit.bind(process, 0))
}

main()
