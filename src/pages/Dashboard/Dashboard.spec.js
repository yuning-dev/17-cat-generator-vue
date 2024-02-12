import { describe, beforeEach, test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

import Dashboard from './Dashboard.vue'
import CatPreview from '@/components/CatPreview.vue'
import { useCatStore } from '@/stores/cats'

describe('dashboard page', () => {
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
                    }
                })],
                mocks: {
                    $router: router
                }
            }
        }
    }) 
    
    test('dashboard initially only has the generate cat button; the cat preview tile and import export section do not appear', () => {
        const wrapper = mount(Dashboard, mountOptions)

        const generateCatBtn = wrapper.find('[data-testid="generateCatBtn"]')
        
        expect(generateCatBtn.exists()).toBe(true)
        expect(wrapper.text().includes('Cat Dashboard')).toBe(true)
        expect(wrapper.text().includes('Name:')).toBe(false)
        expect(wrapper.text().includes('To save your cats:')).toBe(false)
    })

    test('the generate cat button takes the user to the cat generator page', async () => {
        const wrapper = mount(Dashboard, mountOptions)

        const generateCatBtn = wrapper.find('[data-testid="generateCatBtn"]')

        await generateCatBtn.trigger('click')

        expect(router.push).toHaveBeenCalledWith('/generator')
    })

    test('cat preview tile displays once a cat has been created', () => {
        const wrapper = mount(Dashboard, mountOptions)

        const catStore = useCatStore()

        catStore.addToCatList({
            id: 2,
            name: 'Irina',
            breed: 'siamese',
            age: '6',
            imageSrc: '/bombay.jpg'
        })
        
        expect(catStore.addToCatList).toHaveBeenCalledOnce()

        const catPreview = wrapper.findAllComponents(CatPreview).at(0)

        expect(catPreview.exists()).toBeTruthy()
    })
})

// Test: dashboard initially only has the generate cat button (no cat preview tile nor the import export section)
// Test: generate cat button takes user to the cat generator page
// Test: cat preview tile displays once a cat has been created
// Test: import export section displays once a cat has been created
// Test: export button works properly
// Test: import button works properly 