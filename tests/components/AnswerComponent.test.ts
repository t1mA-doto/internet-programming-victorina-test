import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import AnswersComponent from '../../src/components/AnswersComponent.vue'

describe('AnswersComponent', () => {
  const answers = ['a.png', 'b.png', 'c.png', 'd.png']

  it('renders all answer images', () => {
    const wrapper = mount(AnswersComponent, {
      props: {
        answers,
        correct: 2,
      },
    })

    expect(wrapper.findAll('img')).toHaveLength(4)
  })

  it('emits answered with correct payload when correct answer clicked', async () => {
    const wrapper = mount(AnswersComponent, {
      props: {
        answers,
        correct: 2,
      },
    })

    await wrapper.findAll('img')[2].trigger('click')

    expect(wrapper.emitted('answered')).toBeTruthy()
    expect(wrapper.emitted('answered')?.[0]).toEqual([true, 2])
  })

  it('emits answered with incorrect payload when wrong answer clicked', async () => {
    const wrapper = mount(AnswersComponent, {
      props: {
        answers,
        correct: 2,
      },
    })

    await wrapper.findAll('img')[1].trigger('click')

    expect(wrapper.emitted('answered')).toBeTruthy()
    expect(wrapper.emitted('answered')?.[0]).toEqual([false, 1])
  })

  it('prevents repeated selection after first click', async () => {
    const wrapper = mount(AnswersComponent, {
      props: {
        answers,
        correct: 2,
      },
    })

    const imgs = wrapper.findAll('img')
    await imgs[1].trigger('click')
    await imgs[3].trigger('click')

    expect(wrapper.emitted('answered')).toHaveLength(1)
  })

  it('adds correct and incorrect classes after selection', async () => {
    const wrapper = mount(AnswersComponent, {
      props: {
        answers,
        correct: 2,
      },
    })

    const imgs = wrapper.findAll('img')
    await imgs[1].trigger('click')

    expect(imgs[2].classes()).toContain('correct')
    expect(imgs[1].classes()).toContain('incorrect')
  })
})
