import React from 'react';
import Menu from './Menu';
import { shallow } from 'enzyme'

describe('Menu', () => {
  const mockChange = jest.fn()
  const wrapper = shallow(<Menu changePage={mockChange}/>)

  it('should run change page when a planet is clicked', () => {
    wrapper.find('.vehicles-planet').simulate('click')
    expect(mockChange).toBeCalled()
    expect(mockChange).toBeCalledWith('vehicles')

    wrapper.find('.favorites-planet').simulate('click')
    expect(mockChange).toBeCalled()
    expect(mockChange).toBeCalledWith('favorites')

    wrapper.find('.people-planet').simulate('click')
    expect(mockChange).toBeCalled()
    expect(mockChange).toBeCalledWith('people')

    wrapper.find('.planets-planet').simulate('click')
    expect(mockChange).toBeCalled()
    expect(mockChange).toBeCalledWith('planets')
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})