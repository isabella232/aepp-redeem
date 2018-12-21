<template>
  <app-panel>
    <template v-if="!loading">
      <div class="view-transfer-text">
        <h2>
          This paper wallet contains <span>{{ Math.floor(balance / 1000000000000000000) }} AE</span>
        </h2>
        <h3>
          Scan and transfer it to an æternity account
        </h3>
      </div>
      <ae-input v-model="address" label="Address">
        <ae-toolbar align="right" slot="footer">
          <ae-button @click="scanner = true" face="toolbar">
            <ae-icon name="camera" />
            Scan
          </ae-button>
        </ae-toolbar>
      </ae-input>
      <div class="view-transfer-action">
        <ae-button
          face="round"
          fill="primary"
          extend
          @click="send"
          :disabled="!address"
        >
          Redeem
        </ae-button>
        <ae-button
          face="flat"
          fill="neutral"
          @click="cancel"
        >
          Cancel
        </ae-button>
      </div>
      <app-scan
        @decoded="decoded"
        @error="error"
        @close="scanner = false"
        v-if="scanner"
      />
    </template>
    <img
      class="loading"
      alt="Loading"
      :src="require('../../assets/loader.magenta.svg')"
      v-else
    />
  </app-panel>
</template>
<script>
import { mapState } from 'vuex'
import { BigNumber } from 'bignumber.js';
import Wallet from '@aeternity/aepp-sdk/es/ae/wallet'
import MemoryAccount from '@aeternity/aepp-sdk/es/account/memory'
import {
  aeEncodeKey,
} from '@aeternity/aepp-sdk/es/utils/crypto'

import AeInput from '@aeternity/aepp-components/dist/ae-input'
import AeButton from '@aeternity/aepp-components/dist/ae-button'
import AeIcon from '@aeternity/aepp-components/dist/ae-icon'
import AeToolbar from '@aeternity/aepp-components/dist/ae-toolbar'
import AppScan from '../../components/app-scan'
import AppPanel from '../../components/app-panel'

export default {
  name: 'view-transfer',
  data() {
    return {
      scanner: false,
      balance: 0,
      client: null,
      loading: true
    }
  },
  components: {
    AppScan,
    AppPanel,
    AeInput,
    AeButton,
    AeIcon,
    AeToolbar
  },
  computed:{
    address: {
      get: function () {
        return this.$store.state.address
      },
      set: function (address) {
        this.$store.commit('setAddress', address)
      }
    },
    ... mapState([
      'privKey',
      'keypair'
    ])
  },
  methods: {
    send() {
      return this.client
      .spend(
        BigNumber(this.balance).minus(20000).toString(10),
        this.address,
        { fee: 20000 }
      ).then(
        (tx) => this.$router.push({
          name: 'status',
          params: {
            hash: tx.hash
          }
        })
      )
    },
    cancel() {
      this.$store.commit('setPrivKey', null)
      this.$store.commit('setKeypair', null)
      this.$store.commit('setAddress', null)
      this.$router.push({ name: 'redeem' })
    },
    decoded(address) {
      this.scanner = false
      this.$store.commit('setAddress', address)
    },
    error() {
      this.scanner = false
      alert('We tried to open your camera but something went wrong')
    },
  },
  created() {
    if (this.keypair && this.privKey) return
    this.$router.push({ name: 'redeem' })
  },
  async mounted() {
    /**
     * Instantiate user wallet client
     */
    this.client = await Wallet({
      url: process.env.VUE_APP_EPOCH_URL,
      internalUrl: process.env.VUE_APP_EPOCH_URL,
      networkId: process.env.VUE_APP_NETWORK_ID,
      address: aeEncodeKey(this.keypair.publicKey),
      accounts: [MemoryAccount({
        keypair: {
          publicKey: aeEncodeKey(this.keypair.publicKey),
          secretKey: this.privKey
        }
      })]
    })

    /**
     * Get user balance
     */
    this.balance = (
      await this.client.balance(
        aeEncodeKey(this.keypair.publicKey),
        { format: false }
      )
    )

      //Math.floor(( / 1000000000000000000))

    /**
     * Close the loading screen
     * @type {boolean}
     */
    this.loading = false
  }
}
</script>
<style lang="scss" scoped>
.view-transfer-text {
  margin-bottom: 3rem;

  > h2 {
    @extend %face-sans-l;

    font-size: rem(23px);
    font-weight: 500;
    color: $color-neutral-minimum;

    span {
      color: $color-primary;
    }
  }

  > h3 {
    @extend %face-sans-base;

    font-size: rem(17px);
    color: $color-neutral-negative-2;
    font-weight: 500;
  }
}

.view-transfer-action {
  position: relative;
  display: block;
  margin: 0 auto;
  margin-top: 3rem;
  width: 75%;

  /deep/ > .ae-button.flat {
    border-top: 0;
  }

  @media screen and (max-width: 580px) {
    width: auto;
  }
}
</style>
