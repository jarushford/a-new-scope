import Main from './Main'
import { shallow } from 'enzyme'
import React from 'react';

describe('Main', () => {
  let wrapper
  let mockChangePage

  beforeEach(() => {
    mockChangePage = jest.fn()
    wrapper = shallow(<Main changePage={mockChangePage} category={'vehicles'}/>)
  })

  it('should default state to no error', () => {
    const expected = {categoryData: [], error: false}

    expect(wrapper.state()).toEqual(expected)
  })

  it('should redirect to Landing when the millenium falcon btn is clicked', () => {
    wrapper.find('.return-to-landing-btn').simulate('click')
    expect(mockChangePage).toBeCalledWith('landing')
  })

  it('should redirect to the menu page when the menu btn is clicked', () => {
    wrapper.find('.continue-to-site-btn').simulate('click')
    expect(mockChangePage).toBeCalledWith('menu')
  })

  it('Should match the snapshot when loading', () => {
    wrapper.setState({
      landingScroll: []
    })
    expect(wrapper).toMatchSnapshot()
  })

  it('Should match the snapshot when finished loading', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('ComponentDidMount', () => {

    it('Should return category data when everything is ok', () => {

    })

    it('Should set state to error when everything is not ok', () => {

    })
  })

})
