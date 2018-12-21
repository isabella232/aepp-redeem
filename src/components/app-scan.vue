<template>
  <div class="app-scan">
    <qrcode-stream @decode="onDecode" />
  </div>
</template>
<script>
import { QrcodeStream } from 'vue-qrcode-reader'
import Wallet from '@aeternity/aepp-sdk/es/ae/wallet'
import MemoryAccount from '@aeternity/aepp-sdk/es/account/memory'
import {
  aeEncodeKey,
  generateKeyPairFromSecret,
  hexStringToByte,
  addressToHex
} from '@aeternity/aepp-sdk/es/utils/crypto'

export default {
  name: 'app-scan',
  components: {
    QrcodeStream
  },
  methods: {
    async onDecode (privateKey) {
      const keypair = generateKeyPairFromSecret(
        hexStringToByte(privateKey)
      );

      this.$emit('decoded', keypair)

      console.log(keypair)

      await Wallet({
        url: 'https://sdk-testnet.aepps.com',
        internalUrl: 'https://sdk-testnet.aepps.com',
        accounts: [MemoryAccount({
          keypair: {
            publicKey: aeEncodeKey(keypair.publicKey),
            secretKey: privateKey
          }
        })],
        address: aeEncodeKey(keypair.publicKey), // this is AK_THE_ADDRESS
        onTx: () => {},
        onChain: () => {},
        onAccount: () => {},
        onContract: () => {},
        networkID: 'ae_uat'
      }).then((client) => {
        console.log(client)
        client.balance(aeEncodeKey(keypair.publicKey), { format: false }).then((res) => {
          console.log(res)

          console.log(addressToHex('ak_LAqgfAAjAbpt4hhyrAfHyVg9xfVQWsk1kaHaii6fYXt6AJAGe'))
          console.log(hexStringToByte(addressToHex('ak_LAqgfAAjAbpt4hhyrAfHyVg9xfVQWsk1kaHaii6fYXt6AJAGe')))

          client
          .spend(res, 'ak_LAqgfAAjAbpt4hhyrAfHyVg9xfVQWsk1kaHaii6fYXt6AJAGe')
          .then((response) => {
            console.log('resp', response)
          })
        })
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.app-scan {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: $color-white;
}
</style>
