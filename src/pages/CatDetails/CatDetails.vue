<template>
    <div :class="layout.wrapper">
        <div :class="layout.navbar">
            <router-link to="/" :class="layout.navbarLink">My Dashboard</router-link>
            <router-link to="/generator" :class="layout.navbarLink">Cat Generator</router-link>
        </div>
        <div :class="layout.title">Here's your cat:</div>
        <div :class="$style.subwrapper">
            <div><img src="/bombay.jpg" width="200" /></div>
            <div :class="$style.detailsWrapper">
                <div><span :class="$style.details">Name: </span>{{ currentCat.name }}</div>
                <div><span :class="$style.details">Breed: </span>{{ currentCat.breed }}</div>
                <div><span :class="$style.details">Age: </span>{{ currentCat.age }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapWritableState } from 'pinia';
import { useCatStore } from '@/stores/cats';

export default {
    name: 'CatDetails',
    data() {
        return {
            currentCat: '',
        }
    },
    mounted() {
        const cat = this.catList.find((cat) => cat.id === this.catId)
        this.currentCat = cat
    },
    computed: {
        ...mapState(useCatStore, [
            'activeCatId'
        ]),
        ...mapWritableState(useCatStore, [
            'catList'
        ]),
        catId() {
            return Number(this.$route.params.id)
        },
    }
}
</script>

<style module src="./CatDetails.css" />
<style module="layout" src="@/styles/generalLayout.css" />