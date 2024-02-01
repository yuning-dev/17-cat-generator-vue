<template>
    <div>
        <button @click="exportCats">Export Cats</button>
        <input type="file" accept="text/json" @change="importCats">
        hi cat
    </div>
</template>

<script>
export default {
    name: 'Dashboard',
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
        }
    }
}
</script>

<style module src="./Dashboard.css" />