<template>
    <div id="app">
        <component :is="layout" v-if="layout" />
    </div>
</template>

<script>
export default {
    name: 'App',
    computed: {
        layout() {
            return this.$route.meta.layout || this.MainLayout;
        }
    }
}
</script>

<style lang="scss">
  $fa-font-path: "~font-awesome/fonts/";
  @import "../../node_modules/font-awesome/css/font-awesome.min.css";
  $simple-line-font-path: "~simple-line-icons/fonts/";
  @import "../../node_modules/simple-line-icons/dist/styles/simple-line-icons.css";
  // Import Main styles for this application
  @import "assets/scss/style";
</style>
