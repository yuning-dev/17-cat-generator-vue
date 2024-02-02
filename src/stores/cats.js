import { defineStore } from 'pinia'

export const useCatStore = defineStore('cats', {
  state: () => ({
    catList: [],
    catIdCounter: 0,
  }),
  getters: {
    incrementId() {
      this.catIdCounter++
    }
  },
  actions: {
    
  }
})
