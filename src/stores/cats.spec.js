import { expect, test, beforeEach, describe } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { useCatStore } from './cats'

describe('cats', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    test('cat list initially contains Marco', () => {
        const catStore = useCatStore() // TODO - reduce duplication

        expect(catStore.catList.length).toBe(1)
        expect(catStore.catList[0].name).toBe('Marco')
    })

    test('can add to cat list', () => {
        const catStore = useCatStore()
        catStore.catList = []

        catStore.addToCatList({
            id: 1,
            name: 'Ruth',
            breed: 'Siamese',
            age: '3',
            imageSrc: '../fun.png'
        })

        expect(catStore.catList.length).toBe(1)
        // Partial matching, ignoring id
        expect(catStore.catList[0]).toMatchObject({
            name: 'Ruth',
            breed: 'Siamese',
            age: '3',
            imageSrc: '../fun.png'
        })
    })

    test('can increment cat id', () => {

    })
})