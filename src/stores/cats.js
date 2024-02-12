import { defineStore } from 'pinia'

export const useCatStore = defineStore('cats', {
  state: () => ({
    catList: [],
    catIdCounter: 0,
    catImagesPaths: ['/american-shorthair.jpg', '/bombay.jpg', '/british-shorthair.jpg', '/burmese.jpg', '/himalayan.jpg', '/maine-coon.jpg', '/persian.jpg', '/ragdoll.jpg', '/siamese.jpg', '/sphynx.jpg']
  }),
  actions: {
    incrementId() {
      this.catIdCounter++
    },
    addToCatList(cat) {
      this.catList.push(cat)
    }
  }
})
