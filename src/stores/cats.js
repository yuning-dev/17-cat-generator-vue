import { defineStore } from 'pinia'

export const useCatStore = defineStore('cats', {
  state: () => ({
    catList: [{name: 'Marco', breed: 'Polo', age: '2', id:'0', imageSrc:'../../public/images/american-shorthair.jpg'}],
    catIdCounter: 0,
    activeCatId: '',
    catImagesPaths: ['/american-shorthair.jpg', '/bombay.jpg', '/british-shorthair.jpg', '/burmese.jpg', '/himalayan.jpg', '/maine-coon.jpg', '/persian.jpg', '/ragdoll.jpg', '/siamese.jpg', '/sphynx.jpg']
  }),
  getters: {
    incrementId() {
      this.catIdCounter++
    }
  },
  actions: {

  }
})
