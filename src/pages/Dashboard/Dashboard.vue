<template>
    <div :class="layout.wrapper">
        <div>
            <button @click="exportCats">Export Cats</button>
            <input type="file" accept="text/json" @change="importCats">
        </div>
        <div :class="layout.title">
            Cat Dashboard
        </div>
        <button :class="layout.generateCatBtn" @click="generateCatBtnClicked">Generate Cat</button>
        <template :key="cat.id" v-for="cat in catList">
            <CatPreview :name="cat.name"/>
        </template>
    </div>
    
</template>

<script>
import CatPreview from '@/components/CatPreview.vue';
import { mapWritableState, mapState } from 'pinia'
import { useCatStore } from '@/stores/cats'

export default {
    name: 'Dashboard',
    components: {
        CatPreview
    },
    computed: {
        ...mapWritableState(useCatStore, [
            'catList',
            'catIdCounter'
        ])
    },
    methods: {
        exportCats() {
            // TODO - put the cat data you want to export in JSON.stringify()
            const data = JSON.stringify({ testData: 'adsfhiadsfdhjdasfhdsja' })
            const blob = new Blob([data], {type: 'text/plain'})
            const e = document.createEvent('MouseEvents'),
            a = document.createElement('a');
            a.download = "test.json";
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
            e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
            a.remove()
        },
        importCats(event) {
            const files = event.target.files
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
                const importedCatsJson = fileReader.result
                const importedCats = JSON.parse(importedCatsJson)
                // TODO - do something with the imported cats
            })
            fileReader.readAsText(files[0])
        },
        generateCatBtnClicked() {
            this.$router.push('/generator')
        }
    }
}
</script>

<!-- <style module src="./Dashboard.css" /> -->
<style module="layout" src="@/styles/generalLayout.css" />