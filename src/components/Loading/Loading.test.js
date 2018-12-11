import React from 'react'
import { shallow } from 'enzyme'
import Loading from './Loading'

describe('Loading Component', () => {
  it('Should match the snapshot', () => {
    const wrapper = shallow(<Loading />)

    expect(wrapper).toMatchSnapshot()
  })
})
