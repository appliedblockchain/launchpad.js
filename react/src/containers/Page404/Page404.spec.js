import React from 'react'
import renderer from 'react-test-renderer'
import { Page404 } from './Page404'

describe('<Page 404 />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Page404 />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
