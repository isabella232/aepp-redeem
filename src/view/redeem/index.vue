<template>
  <app-panel>
    <img class="view-redeem-cards" :src="require('../../assets/cards.svg')" alt="Paper Wallet">
    <div class="view-redeem-text">
      <h2>
        <span>Received a Paper Wallet?</span>
        <span>Redeem it here</span>
      </h2>
      <h3>Scan and transfer it to an æternity account.</h3>
    </div>
    <ae-button
      face="round"
      fill="primary"
      @click="scanner = true"
    >
      Scan paper wallet
    </ae-button>
    <app-scan
      @decoded="decoded"
      @error="error"
      @close="scanner = false"
      v-if="scanner"
    />
  </app-panel>
</template>
<script>
import AppPanel from '../../components/app-panel'
import AppScan from '../../components/app-scan'
import AeButton from '@aeternity/aepp-components/dist/ae-button'
import {
  generateKeyPairFromSecret,
  hexStringToByte
} from '@aeternity/aepp-sdk/es/utils/crypto'

export default {
  name: 'view-redeem',
  data() {
    return { scanner: false }
  },
  components: {
    AppPanel,
    AppScan,
    AeButton
  },
  methods: {
    decoded(key) {
      this.scanner = false
      this.$store.commit('setPrivKey', key)
      this.$store.commit('setKeypair', generateKeyPairFromSecret(
        hexStringToByte(key)
      ))
      this.$router.push({ name: 'transfer' })
    },
    error() {
      this.scanner = false
      alert('We tried to open your camera but something went wrong')
    }
  }
}
</script>
<style lang="scss" scoped>
.view-redeem-cards {
  width: 380px;

  @media screen and (max-width: 768px) {
    width: auto;
  }
}

.view-redeem-text {
  margin-bottom: 3rem;

  > h2 {
    @extend %face-sans-l;

    font-size: rem(23px);
    font-weight: 500;

    > span {
      display: block;
    }

    span:first-child {
      color: $color-primary;
    }
    span:last-child {
      color: $color-neutral-minimum;
    }
  }

  > h3 {
    @extend %face-sans-base;

    font-size: rem(17px);
    color: $color-neutral-negative-2;
    font-weight: 500;
  }
}
</style>
