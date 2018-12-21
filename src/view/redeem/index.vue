<template>
  <div>
    <app-scan @decoded="keys" />
  </div>
</template>
<script>
import AppScan from '../../components/app-scan'

export default {
  name: 'view-redeem',
  components: {
    AppScan
  },
  methods: {
    keys: function (data) {}
  }
}
</script>
<style lang="scss" scoped></style>
