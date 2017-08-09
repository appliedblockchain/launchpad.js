import React from 'react'
import { shallow } from 'enzyme'
import App from './App'

describe('<App />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(
      <App />
    )
  })

  it('renders correct title', () => {
    expect(wrapper.find('h2').text()).toEqual('Welcome to React')
  })
})
