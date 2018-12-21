<template>
  <div class="app-scan">
    <qrcode-stream @decode="onDecode" />
  </div>
</template>
<script>
import Wallet from '@aeternity/aepp-sdk/es/ae/wallet'
import MemoryAccount from '@aeternity/aepp-sdk/es/account/memory'
import { QrcodeStream } from 'vue-qrcode-reader'
import {
  generateKeyPairFromSecret,
  hexStringToByte
} from '@aeternity/aepp-sdk/es/utils/crypto'

export default {
  name: 'app-scan',
  components: {
    QrcodeStream
  },
  data: function () {
    return { keypair: {} }
  },
  methods: {
    async onDecode (privateKey) {
      const keypair = generateKeyPairFromSecret(
        hexStringToByte(privateKey)
      );

      this.$emit('decoded', keypair)
      Object.assign(this.$data, { keypair })

      await Wallet({
        url: 'https://sdk-testnet.aepps.com',
        internalUrl: 'https://sdk-testnet.aepps.com',
        accounts: [MemoryAccount({ keypair })],
        address: keypair.publicKey,
        onTx: () => {},
        onChain: () => {},
        onAccount: () => {},
        onContract: () => {},
        networkID: 'ae_uat'
      }).then((response) => {
        console.log(response.Ae.getBalance())
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
