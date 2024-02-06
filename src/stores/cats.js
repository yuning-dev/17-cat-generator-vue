import { defineStore } from 'pinia'

export const useCatStore = defineStore('cats', {
  state: () => ({
    catList: [{name: 'Marco', breed: 'Polo', age: '2', id:'0'}],
    catIdCounter: 0,
    activeCatId: '',
  }),
  getters: {
    incrementId() {
      this.catIdCounter++
    }
  },
  actions: {

  }
})
