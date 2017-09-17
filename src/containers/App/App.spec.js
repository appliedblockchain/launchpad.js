import React from 'react'
import { shallow } from 'enzyme'
import Header from 'components/Header'
import App from './App'

describe('<App />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(
      <App>
        <div id="test">Hello world</div>
      </App>
    )
  })

  it('renders <Header />', () => {
    expect(wrapper.find(Header).length).toEqual(1)
  })

  it('renders correct content', () => {
    expect(wrapper.find('#test').text()).toEqual('Hello world')
  })
})
