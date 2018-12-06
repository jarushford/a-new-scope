import Main from './Main'
import { shallow } from 'enzyme'
import React from 'react';

describe('Main', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Main />)
  })

  it('should default state to no error', () => {
    const expected = {categoryData: [], error: false}

    expect(wrapper.state()).toEqual(expected)
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
