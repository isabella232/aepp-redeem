<template>
  <div id="view">
    <ae-button face="round" fill="primary">Hello World</ae-button>
  </div>
</template>
<script>
import Redeem from './redeem'
import Status from './status'
import Transfer from './transfer'

export default {
  name: 'view',
  components: {
    Redeem,
    Status,
    Transfer
  }
}
</script>
<style lang="scss" scoped></style>
