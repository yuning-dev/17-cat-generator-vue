import { expect, test, beforeEach, describe, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'

import CatGenerator from './CatGenerator.vue'
import { useCatStore } from '@/stores/cats'

// TODO - explain object destructuring
// Need to install pinia testing lib because we're mocking pinia
// npm i -D @pinia/testing

// expect(wrapper.text().includes('Marco')).toBe(true)

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

    
    test('if only spaces are entered either for name or age, clicking generate button shows error message', async () => {
        const wrapper = mount(CatGenerator, mountOptions)

        const catStore = useCatStore()

        const inputs = wrapper.findAll('input')
        const breedSelect = wrapper.find('select')

        inputs.at(0).setValue('   ')
        breedSelect.setValue('Bombay')
        inputs.at(1).setValue('2')

        await wrapper.find('button').trigger('click')

        expect(catStore.addToCatList).not.toHaveBeenCalled()
        expect(wrapper.text().includes('Some information is missing! Please enter it so your cat can be generated.')).toBe(true)

        inputs.at(0).setValue('bobito')
        breedSelect.setValue('Bombay')
        inputs.at(1).setValue('              ')

        await wrapper.find('button').trigger('click')

        expect(catStore.addToCatList).not.toHaveBeenCalled()
        expect(wrapper.text().includes('Some information is missing! Please enter it so your cat can be generated.')).toBe(true)

        inputs.at(0).setValue('         ')
        breedSelect.setValue('Bombay')
        inputs.at(1).setValue('              ')

        await wrapper.find('button').trigger('click')

        expect(catStore.addToCatList).not.toHaveBeenCalled()
        expect(wrapper.text().includes('Some information is missing! Please enter it so your cat can be generated.')).toBe(true)
    })

    test('all values must be entered, otherwise clicking the generate button shows an error message', async () => {
        const wrapper = mount(CatGenerator, mountOptions)

        const catStore = useCatStore()

        const inputs = wrapper.findAll('input')
        const breedSelect = wrapper.find('select')

        inputs.at(0).setValue('Morsley')
        inputs.at(1).setValue('10')

        await wrapper.find('button').trigger('click')

        expect(catStore.addToCatList).not.toHaveBeenCalled()
        expect(wrapper.text().includes('Some information is missing! Please enter it so your cat can be generated.')).toBe(true)

        inputs.at(0).setValue('')
        breedSelect.setValue('Sphynx')
        inputs.at(1).setValue('10')

        await wrapper.find('button').trigger('click')

        expect(catStore.addToCatList).not.toHaveBeenCalled()
        expect(wrapper.text().includes('Some information is missing! Please enter it so your cat can be generated.')).toBe(true)

        inputs.at(0).setValue('Abe')
        breedSelect.setValue('Sphynx')
        inputs.at(1).setValue('')

        await wrapper.find('button').trigger('click')

        expect(catStore.addToCatList).not.toHaveBeenCalled()
        expect(wrapper.text().includes('Some information is missing! Please enter it so your cat can be generated.')).toBe(true)
    })

    test('age entered must be a number, an error will show if a non-number character is entered', async () => {
        const wrapper = mount(CatGenerator, mountOptions)
        const catStore = useCatStore()
        const inputs = wrapper.findAll('input')

        expect(wrapper.text().includes('Please enter a number.')).toBe(false)
        
        await inputs.at(1).setValue('2')

        expect(wrapper.text().includes('Please enter a number.')).toBe(false)

        await inputs.at(1).setValue('2.5')

        expect(wrapper.text().includes('Please enter a number.')).toBe(false)

        await inputs.at(1).setValue('-')

        expect(wrapper.text().includes('Please enter a number.')).toBe(true)

        await inputs.at(1).setValue('5%')

        expect(wrapper.text().includes('Please enter a number.')).toBe(true)

        await inputs.at(1).setValue('5/5')

        expect(wrapper.text().includes('Please enter a number.')).toBe(true)

    })

    // Test: can't just enter spaces
    // Test: must enter all values; shows error if a value is missing
    // Test: age must be a number; shows error if a character other than a number has been entered
    // Test: if spaces are entered before and/or after the cat name and/or age, it's removed when the cat is generated

    // test('spaces entered before and/or after the cat name and/or age are removed when the cat is generated', async () => {
    //     const wrapper = mount(CatGenerator, mountOptions)

    //     const catStore = useCatStore()

    //     expect(catStore.addToCatList).toHaveBeenCalledTimes(0)

    //     const inputs = wrapper.findAll('input')
    //     const breedSelect = wrapper.find('select')

    //     inputs.at(0).setValue('      bob           ')
    //     breedSelect.setValue('Bombay')
    //     inputs.at(1).setValue('             4   ')
        
    //     await wrapper.find('button').trigger('click')

    //     expect(catStore.addToCatList).toHaveBeenCalledTimes(1)
    // })
})