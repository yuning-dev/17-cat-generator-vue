<template>
    <div :class="[$style.wrapper, $style.hvrGrowShadow]" @click="catPreviewClicked">
        <div><span :class="$style.details">Name: </span>{{ cat.name }}</div>
        <div><span :class="$style.details">Breed: </span>{{ cat.breed }}</div>
    </div>
</template>

<script>

export default {
    name: 'CatPreview',
    props: {
        cat: Object,
    },
    methods: {
        catPreviewClicked() {
            this.$router.push({ name: 'details', params: { id: this.cat.id }})
            console.log(this.cat.id)
        },
        
    }
}
</script>

<style module src="./CatPreview.css"/>