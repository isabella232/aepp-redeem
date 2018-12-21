<template>
  <div id="view">
    <ae-slider :options="sliderOptions" fullscreen>
      <redeem/>
      <transfer/>
      <status/>
    </ae-slider>
  </div>
</template>
<script>
import AeButton from '@aeternity/aepp-components/dist/ae-button'
import AeSlider from '@aeternity/aepp-components/dist/ae-slider'

import Redeem from './redeem'
import Status from './status'
import Transfer from './transfer'

export default {
  name: 'view',
  components: {
    /**
     * Components
     */
    AeButton,
    AeSlider,

    /**
     * Views
     */
    Redeem,
    Status,
    Transfer
  },
  data: function () {
    return {
      sliderOptions: {}
    }
  }
}
</script>
<style lang="scss"></style>
