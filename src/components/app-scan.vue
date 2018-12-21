<template>
  <div class="app-scan">
    <ae-button
      fill="primary"
      face="icon"
      @click="$emit('close', $event)"
    >
      <ae-icon
        name="close"
      />
    </ae-button>
    <qrcode-stream
      :track="false"
      @init="onInit"
      @decode="$emit('decoded', $event)"
      v-show="!loading"
    />
    <img
      class="loading"
      alt="Loading"
      :src="require('../assets/loader.svg')"
      v-show="loading"
    />
  </div>
</template>
<script>
import { QrcodeStream } from 'vue-qrcode-reader'

import AeButton from '@aeternity/aepp-components/dist/ae-button'
import AeIcon from '@aeternity/aepp-components/dist/ae-icon'

export default {
  name: 'app-scan',
  data() {
    return { loading: true }
  },
  components: {
    QrcodeStream,
    AeButton,
    AeIcon
  },
  methods: {
    async onInit(promise) {
      try {
        await promise
        this.loading = false;
      } catch (error) {
        this.$emit('error', error)
        this.loading = true
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.app-scan {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: $color-secondary;
  z-index: 1000;

  /deep/ > .ae-button {
    position: absolute;
    top: 2rem;
    right: 2rem;
    z-index: 1000;
  }

  /deep/ > .qrcode-stream {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 0 10px 0 rgba(0, 24, 51, 0.21);
  }

  /deep/ .qrcode-stream__inner-wrapper,
  /deep/ .qrcode-stream__overlay, .qrcode-stream__tracking-layer,
  /deep/ .qrcode-stream__camera, .qrcode-stream__pause-frame {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}
</style>
