import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import NextComponent from '../../src/components/NextComponent.vue'

describe('NextComponent', () => {
  it('is hidden when no answer selected', () => {
    const wrapper = mount(NextComponent, {
      props: {
        selected: null,
      },
    })

    expect(wrapper.find('img').classes()).not.toContain('visible')
  })

  it('is visible when answer selected', () => {
    const wrapper = mount(NextComponent, {
      props: {
        selected: 0,
      },
    })

    expect(wrapper.find('img').classes()).toContain('visible')
  })

  it('does not emit next-question when nothing selected', async () => {
    const wrapper = mount(NextComponent, {
      props: {
        selected: null,
      },
    })

    await wrapper.find('img').trigger('click')
    expect(wrapper.emitted('next-question')).toBeFalsy()
  })

  it('emits next-question when selected exists', async () => {
    const wrapper = mount(NextComponent, {
      props: {
        selected: 1,
      },
    })

    await wrapper.find('img').trigger('click')
    expect(wrapper.emitted('next-question')).toBeTruthy()
  })
})
