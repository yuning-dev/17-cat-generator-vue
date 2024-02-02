<template>
    I'm cat preview
    <!-- <div :class="$style.wrapper"> -->
        <!-- <p>name: {{ cat.name }}</p>
        <p>breed: {{ cat.breed }}</p> -->
    <!-- </div> -->
</template>

<script>
export default {
    name: 'CatPreview',
    props: {
        name: String,
        breed: String
    }
}
</script>

<style module css="./CatPreview.css"/>