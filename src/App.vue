<template>
  <router-view id="app"/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss" scoped>
@import './assets/scss/global.scss';

div#app {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-width: 1440px;
  
  background: linear-gradient(to bottom right, darken($color-steel, 5%), darken($color-steel, 15%));
}
</style>
