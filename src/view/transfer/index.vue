<template>
  <div>
    <h1>Transfer</h1>
  </div>
</template>
<script>
import { generateKeyPairFromSecret } from '@aeternity/aepp-sdk/es/utils/crypto'
import Wallet from '@aeternity/aepp-sdk/es/ae/wallet'
import MemoryAccount from '@aeternity/aepp-sdk/es/account/memory'

export default {
  name: 'view-transfer',
}
</script>
<style lang="scss" scoped></style>
