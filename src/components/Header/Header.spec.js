import React from 'react'
import { shallow } from 'enzyme'
import Header from './index'

describe('<Header />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(
      <Header />
    )
  })

  it('renders correct title', () => {
    expect(wrapper.find('h2').text()).toEqual('Welcome to React')
  })
})
