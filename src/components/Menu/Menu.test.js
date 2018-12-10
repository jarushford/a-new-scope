import React from 'react'
import Menu from './Menu'
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

  it('Should run change page when a mobile menu option is clicked', () => {
    wrapper.find('.alt-menu-vehicles').simulate('click')
    expect(mockChange).toBeCalled()
    expect(mockChange).toBeCalledWith('vehicles')

    wrapper.find('.alt-menu-favorites').simulate('click')
    expect(mockChange).toBeCalled()
    expect(mockChange).toBeCalledWith('favorites')

    wrapper.find('.alt-menu-people').simulate('click')
    expect(mockChange).toBeCalled()
    expect(mockChange).toBeCalledWith('people')

    wrapper.find('.alt-menu-planets').simulate('click')
    expect(mockChange).toBeCalled()
    expect(mockChange).toBeCalledWith('planets')
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})