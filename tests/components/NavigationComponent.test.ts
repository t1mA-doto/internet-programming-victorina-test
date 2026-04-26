import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import NavigationComponent from '../../src/components/NavigationComponent.vue'

describe('NavigationComponent', () => {
  it('renders the correct number of segments and markers', () => {
    const wrapper = mount(NavigationComponent, {
      props: {
        results: [null, true, false, null, true],
      },
    })

    expect(wrapper.findAll('.segment')).toHaveLength(5)
    expect(wrapper.findAll('.marker')).toHaveLength(6)
  })

  it('colors answered segments green and unanswered transparent', () => {
    const wrapper = mount(NavigationComponent, {
      props: {
        results: [null, true, false, null, true],
      },
    })

    const segments = wrapper.findAll('.segment')
    expect(segments[0].attributes('style')).toContain('transparent')
    expect(segments[1].attributes('style')).toContain('rgb(107, 255, 47)')
    expect(segments[2].attributes('style')).toContain('rgb(107, 255, 47)')
    expect(segments[3].attributes('style')).toContain('transparent')
    expect(segments[4].attributes('style')).toContain('rgb(107, 255, 47)')
  })

  it('calculates computed properties correctly', () => {
    const wrapper = mount(NavigationComponent, {
      props: {
        results: [null, true, false, null],
      },
    })

    expect(wrapper.vm.answeredCount).toBe(2)
    expect(wrapper.vm.total).toBe(4)
    expect(wrapper.vm.fillWidth).toBe('50%')
  })
})
