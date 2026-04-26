import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import QuestionComponent from '../../src/components/QuestionComponent.vue'

describe('QuestionComponent', () => {
  it('renders question text', () => {
    const wrapper = mount(QuestionComponent, {
      props: {
        question: 'Какой-то вопрос?',
      },
    })

    expect(wrapper.text()).toContain('Какой-то вопрос?')
  })
})
