<template>
    <div :class="layout.wrapper">
        <div :class="layout.navbar">
            <router-link to="/" :class="layout.navbarLink">Go back to My Dashboard</router-link>
        </div>
        <div :class="layout.title">
            Cat Generator
        </div>
        <div :class="$style.contentsWrapper">
            <p :class="$style.instruction">Please enter the information below to create your cat:</p>
            <div :class="$style.inputsWrapper">
                <p>name: <input type="text" v-model="newCatName"></p>
                <p>breed: <input type="text" v-model="newCatBreed"></p>
                <p>age: <input type="text" v-model="newCatAge"></p>
                <p>{{ ageError }}</p>
                <template v-if="displaysError">
                    <div :class="$style.error">{{ missingInformationError }}</div>
                </template>
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
            displaysError: false,
        }
    },
    watch: {

    },
    computed: {
        ...mapWritableState(useCatStore, [
            'catList',
            'catIdCounter'
        ]),
        ...mapState(useCatStore, [
            'incrementId'
        ]),
        missingInformationError() {
            const trimmedName = this.newCatName.trim()
            const trimmedBreed = this.newCatBreed.trim()
            const trimmedAge = this.newCatAge.trim()

            if (trimmedName === '' || trimmedBreed === '' || trimmedAge === '') {
                return 'Some information is missing! Please enter it so your cat can be generated.'
            }
        },
        ageError() {
            if (Number.isNaN(Number(this.newCatAge))) {
                return 'Please enter a number.'
            }
        },

    },
    methods: {
        generateCatBtnClicked() {
            const trimmedName = this.newCatName.trim()
            const trimmedBreed = this.newCatBreed.trim()
            const trimmedAge = this.newCatAge.trim()

            if (trimmedName !== '' && trimmedBreed !== '' && trimmedAge !== '' && !Number.isNaN(Number(this.newCatAge))) {
                this.generateCat()
                this.$router.push('/')
            } else {
                this.displaysError = true
            }
        },
        async generateCat() {
            const cat = {
                id: this.catIdCounter,
                name: this.newCatName,
                breed: this.newCatBreed,
                age: this.newCatAge 
            }
            if (this.newCatName !== '' && this.newCatBreed !== '' && this.newCatAge !== '') {
                this.catList.push(cat)
                this.incrementId
            }
        }
    },
}

</script>

<style module src="./CatGenerator.css" />
<style module="layout" src="@/styles/generalLayout.css" />