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