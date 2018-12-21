<template>
  <div class="app-panel">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'app-panel'
}
</script>
<style lang="scss" scoped>
.app-panel {
  text-align: center;
  padding: 4rem;
  width: 600px;
  background: $color-white;
  border-radius: 4px;
  box-shadow: 0 0 10px 0 rgba(0, 24, 51, 0.21);

  @media screen and (max-width: 580px) {
    padding: 2rem;
  }
}
</style>
