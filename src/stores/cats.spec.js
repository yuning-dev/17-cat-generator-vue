import { expect, test, beforeEach, describe, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'

import { useCatStore } from './cats'
import CatGenerator from '@/pages/CatGenerator/CatGenerator.vue'

describe('cats', () => {
    let mountOptions

    beforeEach(() => {
        setActivePinia(createPinia())
        // mountOptions = {
        //     global: {
        //         plugins: [createTestingPinia({
        //             createSpy: vi.fn,
        //             initialState: {
        //                 cats: {
        //                     catList: []
        //                 }
        //             }}
        //         )],
        //     }
        // }
    })

    test('cat list is empty initially', () => {
        const catStore = useCatStore() // TODO - reduce duplication

        expect(catStore.catList.length).toBe(0)
    })

    test('can add to cat list', () => {
        const catStore = useCatStore()

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
        const catStore = useCatStore()

        catStore.incrementId()

        expect(catStore.catIdCounter).toEqual(1)
    })

    test('can access cat image paths', () => {
        const catStore = useCatStore()

        expect(catStore.catImagesPaths.length).toEqual(10)
        expect(catStore.catImagesPaths[3]).toEqual('/burmese.jpg')
    })

    // test('spaces entered before and/or after the cat name and/or age are removed when the cat is generated', async () => {
    //     const wrapper = mount(CatGenerator, mountOptions)

    //     const catStore = useCatStore()

    //     const inputs = wrapper.findAll('input')
    //     const breedSelect = wrapper.find('select')

    //     inputs.at(0).setValue('      bob   ')
    //     breedSelect.setValue('Bombay')
    //     inputs.at(1).setValue('  3                ')

    //     await wrapper.find('button').trigger('click')

    //     expect(catStore.catList.length).toEqual(1)
    // })
})