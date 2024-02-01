<template>
    view cat {{ catId }}
</template>

<script>
export default {
    name: 'CatDetails',
    computed: {
        catId() {
            return this.$route.params.id
        }
    }
}
</script>

<style module src="./CatDetails.css" />