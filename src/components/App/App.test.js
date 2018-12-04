import React from 'react';
import App from './App';
import { shallow } from 'enzyme'

describe('App', () => {
  const wrapper = shallow(<App />)
  
  it('on page load the current page should be "landing"', () => {
    expect(wrapper.instance().state.currentPage).toEqual('landing')
  })

  it('should change current page to the value passed into changePage', () => {
    wrapper.instance().changePage('menu')
    expect(wrapper.instance().state.currentPage).toEqual('menu')
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
