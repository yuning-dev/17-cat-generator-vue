import { expect, test, beforeEach, describe, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'

import CatGenerator from './CatGenerator.vue'
import { useCatStore } from '@/stores/cats'

// TODO - explain object destructuring
// Need to install pinia testing lib because we're mocking pinia
// npm i -D @pinia/testing

expect(wrapper.text().includes('Marco')).toBe(true)

describe('CatGenerator', () => {
    let router
    let mountOptions

    beforeEach(() => {
        router = {
            push: vi.fn()
        }

        mountOptions = {
            global: {
                plugins: [createTestingPinia({
                    createSpy: vi.fn,
                    initialState: {
                        cats: {
                            catList: []
                        }
                    }}
                )],
                mocks: {
                    $router: router
                }
            }
        }
    })

    test('generate cat button generates cat', async () => {

        // TODO - explain
        const wrapper = mount(CatGenerator, mountOptions)

        const catStore = useCatStore()

        expect(catStore.addToCatList).not.toHaveBeenCalled()
        expect(catStore.addToCatList).toHaveBeenCalledTimes(0)

        const inputs = wrapper.findAll('input')
        const breedSelect = wrapper.find('select')

        inputs.at(0).setValue('Edward')
        breedSelect.setValue('Bombay')
        inputs.at(1).setValue(15)

        await wrapper.find('button').trigger('click')

        expect(catStore.addToCatList).toHaveBeenCalled()
        expect(catStore.addToCatList).toHaveBeenCalledWith({
            id: 0,
            name: 'Edward',
            breed: 'Bombay',
            age: '15',
            imageSrc: '/bombay.jpg'
        })
        expect(catStore.addToCatList).toHaveBeenCalledTimes(1)
        expect(router.push).toHaveBeenCalledWith('/')
        expect(catStore.incrementId).toHaveBeenCalled()
    })

    // Test: can't just enter spaces
    // Test: must enter all values
    // Test: shows error message

})