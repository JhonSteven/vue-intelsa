<template>
  <div id="app">
    <div class="row mx-0 align-items-center justify-content-center min-height-100vh" v-if="$store.state.loaded">
      <router-view/>
    </div>
  </div>
</template>
<style lang="stylus">
.min-height-100vh
  min-height 100vh
</style>