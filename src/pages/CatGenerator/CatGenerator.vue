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
                <p>breed: 
                    <select name="breed" v-model="newCatBreed">
                        <option value="American shorthair">American shorthair</option>
                        <option value="Bombay">Bombay</option>
                        <option value="British shorthair">British shorthair</option>
                        <option value="Burmese">Burmese</option>
                        <option value="Himalayan">Himalayan</option>
                        <option value="Maine coon">Maine coon</option>
                        <option value="Persian">Persian</option>
                        <option value="Ragdoll">Ragdoll</option>
                        <option value="Siamese">Siamese</option>
                        <option value="Sphynx">Sphynx</option>
                    </select>
                </p>
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
import { mapWritableState, mapState, mapActions } from 'pinia'

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
    computed: {
        ...mapWritableState(useCatStore, [
            'catList',
            'catIdCounter'
        ]),
        ...mapState(useCatStore, [
            'catImagesPaths'
        ]),
        missingInformationError() {
            const trimmedName = this.newCatName.trim()
            const trimmedAge = this.newCatAge.trim()

            if (trimmedName === '' || this.newCatBreed === '' || trimmedAge === '') {
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
        ...mapActions(useCatStore, ['addToCatList', 'incrementId']),
        generateCatBtnClicked() {
            const trimmedName = this.newCatName.trim()
            const trimmedAge = this.newCatAge.trim()

            if (trimmedName !== '' && this.newCatBreed !== '' && trimmedAge !== '' && !Number.isNaN(Number(this.newCatAge))) {
                this.generateCat()
                this.$router.push('/')
            } else {
                this.displaysError = true
            }
        },
        async generateCat() {
            let formattedBreed = this.newCatBreed.toLowerCase().split(' ').join('-')
            const cat = {
                id: this.catIdCounter,
                name: this.newCatName.trim(),
                breed: this.newCatBreed,
                age: this.newCatAge.trim(),
                imageSrc: '/' + formattedBreed + '.jpg' 
            }
            console.log(cat.imageSrc)
            if (this.newCatName !== '' && this.newCatBreed !== '' && this.newCatAge !== '') {
                this.addToCatList(cat)
                this.incrementId()
            }
        }
    },
}

</script>

<style module src="./CatGenerator.css" />
<style module="layout" src="@/styles/generalLayout.css" />