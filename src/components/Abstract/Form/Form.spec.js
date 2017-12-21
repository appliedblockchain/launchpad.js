import React from 'react'
import { shallow } from 'enzyme'
import Form from './index'

describe('<Form />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(
      <Form />
    )
  })

  describe('onChangeInput', () => {
    it('input that has value', () => {
      wrapper.instance().onChangeInput({
        target: {
          name: 'first_name',
          value: 'Jane'
        }
      })
      expect(wrapper.state('first_name')).toEqual('Jane')
    })

    it('input type = "checkbox"', () => {
      wrapper.instance().onChangeInput({
        target: {
          type: 'checkbox',
          name: 'agreed',
          checked: true
        }
      })
      expect(wrapper.state('agreed')).toEqual(true)
    })
  })
})
