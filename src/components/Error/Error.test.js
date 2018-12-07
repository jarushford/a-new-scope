import React from 'react'
import Error from './Error'
import { shallow } from 'enzyme'

describe('Error', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<Error />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should go back to the landing page on click', () => {
    const mockChangePage = jest.fn()
    const wrapper = shallow(<Error changePage={mockChangePage} />)

    wrapper.find('.error-button').simulate('click')
    expect(mockChangePage).toBeCalled()
  })
})