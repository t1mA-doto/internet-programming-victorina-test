import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import App from '../src/App.vue'

describe('App', () => {
  it('renders first question on start', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('Начинаем с простенького')
  })

  it('shows result after answering all questions', async () => {
    const wrapper = mount(App)

    for (let i = 0; i < 5; i++) {
      const answers = wrapper.findComponent({ name: 'AnswersComponent' })
      await answers.findAll('img')[0].trigger('click')

      const next = wrapper.findComponent({ name: 'NextComponent' })
      await next.find('img').trigger('click')
    }

    expect(wrapper.text()).toContain('Количество правильных ответов')
  })
})
