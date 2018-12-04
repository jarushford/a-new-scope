import React from 'react';
import StarHousingComponent from './StarHousingComponent';
import { shallow } from 'enzyme'

describe('Star Housing Component', () => {
  const wrapper = shallow(<StarHousingComponent />)

  it('should increment deltaX on tick', () => {
    wrapper.instance().tick()
    expect(wrapper.instance().state.deltaX).toEqual(0.025)
  })

  it('should change direction when deltaX reaches 180', () => {
    expect(wrapper.instance().state.direction).toEqual(true)

    wrapper.instance().setState({ deltaX: 180 })
    wrapper.instance().tick()

    expect(wrapper.instance().state.direction).toEqual(false)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})