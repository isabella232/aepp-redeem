<template>
  <div id="view" class="view">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>
<script>
export default {
  name: 'view'
}
</script>
<style lang="scss">
.view {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 100%;
  background-color: $color-primary;
  background-image: url('../assets/background.svg');
  background-repeat: no-repeat;
  background-size: cover;
  transform: translateZ(0);

  @media screen and (max-width: 768px) {
    padding: 2rem;
  }
  @media screen and (max-width: 580px) {
    padding: 1rem;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity $base-transition-time;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
