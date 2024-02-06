<template>
    <div :class="layout.wrapper">
        <div :class="layout.title">
            Cat Dashboard
        </div>
        <div :class="$style.contentWrapper">
            <div :class="$style.catPreviewWrapper">
                <template :key="cat.id" v-for="cat in catList">
                    <CatPreview :cat="cat" />
                </template>
            </div>
            <button :class="layout.generateCatBtn" @click="generateCatBtnClicked">Generate Cat</button>
        </div>
        <template v-if="catList.length !== 0">
                <div :class="$style.importExportWrapper">
                    <p>You can save your cats in a file here: 
                        <button @click="exportCats" :class="$style.impExpBtn">Export cats</button>
                    </p>
                    <p>To revisit any cats you created from a previous session, click here: 
                        <label for="fileUpload" :class="$style.impExpBtn">Import cats</label>
                        <input type="file" accept="text/json" @change="importCats" id="fileUpload" :class="$style.importInput">
                    </p>
                </div>
            </template>
        </div>
</template>

<script>
import CatPreview from '@/components/CatPreview.vue';
import { mapWritableState } from 'pinia'
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
        ]),
    },
    methods: {
        exportCats() {
            // TODO - put the cat data you want to export in JSON.stringify()
            const data = JSON.stringify(this.catList)
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
                this.catList = importedCats
            })
            fileReader.readAsText(files[0])
        },
        generateCatBtnClicked() {
            this.$router.push('/generator')
        },
    }
}
</script>

<style module src="./Dashboard.css" />
<style module="layout" src="@/styles/generalLayout.css" />