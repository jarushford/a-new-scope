import React from 'react'
import { shallow } from 'enzyme'
import Error from './Error'

describe('Error', () => {
    const mockReturnToLanding = jest.fn()
    const mockSetError = jest.fn()
    const wrapper = shallow(<Error returnToLanding={mockReturnToLanding} setError={mockSetError}/>)
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should go back to the landing page on click', () => {
    wrapper.find('.error-button').simulate('click')
    expect(mockReturnToLanding).toBeCalled()
    expect(mockSetError).toBeCalled()
  })
})
