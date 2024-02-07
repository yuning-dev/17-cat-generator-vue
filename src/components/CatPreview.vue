<template>
    <div :class="[$style.wrapper, $style.hvrGrowShadow]" @click="catPreviewClicked">
        <div><span :class="$style.details">Name: </span>{{ cat.name }}</div>
        <div><span :class="$style.details">Breed: </span>{{ cat.breed }}</div>
        <div><img 
            src="/american-shorthair.jpg" 
            width="100%"/>
        </div>
    </div>
</template>

<script>

export default {
    name: 'CatPreview',
    props: {
        cat: Object,
    },
    computed: {

    },
    methods: {
        catPreviewClicked() {
            this.$router.push({ name: 'details', params: { id: this.cat.id }})
        },
        
    }
}
</script>

<style module src="./CatPreview.css"/>