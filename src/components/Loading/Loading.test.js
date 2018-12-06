import React from 'react'
import Loading from './Loading'
import { shallow } from 'enzyme'

describe('Loading Component', () => {
  it('Should match the snapshot', () => {
    const wrapper = shallow(<Loading />)

    expect(wrapper).toMatchSnapshot()
  })
})