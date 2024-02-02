<template>
    <div :class="layout.wrapper">
        <div :class="layout.title">
            Cat Generator
        </div>
        <div :class="$style.contentsWrapper">
            <div :class="$style.inputsWrapper">
                <p>name: <input type="text" v-model="newCatName"></p>
                <p>breed: <input type="text" v-model="newCatBreed"></p>
                <p>age: <input type="text" v-model="newCatAge"></p>
            </div>
            <button :class="layout.generateCatBtn" @click="generateCatBtnClicked">Generate!</button>
        </div>
    </div>
</template>

<script>
import { useCatStore } from '@/stores/cats'
import { mapWritableState, mapState } from 'pinia'

export default {
    name: 'CatGenerator',
    data() {
        return {
            newCatName: '',
            newCatBreed: '',
            newCatAge: '',
        }
    },
    computed: {
        ...mapWritableState(useCatStore, [
            'catList',
            'catIdCounter'
        ]),
        ...mapState(useCatStore, [
            'incrementId'
        ]),
    },
    methods: {
        generateCatBtnClicked() {
            this.generateCat()
            this.$router.push('/')
        },
        async generateCat() {
            const cat = {
                id: this.catIdCounter,
                name: this.newCatName,
                breed: this.newCatBreed,
                age: this.newCatAge 
            }
            this.catList.push(cat)
            this.incrementId
            console.log(this.catList)
        }
    },
}

</script>

<style module src="./CatGenerator.css" />
<style module="layout" src="@/styles/generalLayout.css" />