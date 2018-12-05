import React from 'react'
import Landing from './Landing'
import { shallow } from 'enzyme'

describe( 'Landing', () => {
  const mockChange = jest.fn()
  const mockepisode = {title: 'A New Hope', year: '1995', text: 'text'}
  const wrapper = shallow(
    <Landing 
      continueToSite={mockChange}
      episode={mockepisode}
    />)

  it('should change to the menu screen when the enter button is clicked', () => {
    wrapper.find('.continue-to-site-btn').simulate('click')
    expect(mockChange).toBeCalled()
    expect(mockChange).toBeCalledWith('menu')
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})