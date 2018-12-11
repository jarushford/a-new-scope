import React from 'react'
import { shallow } from 'enzyme'
import ResidentsScroller from './ResidentsScroller'

describe('residentsScroller', () => {
  let content1
  let content2
  let wrapper

  beforeEach(() => {
    content1 = ['Anikan', 'R2-D2']
    content2 = ''
    wrapper = shallow(<ResidentsScroller content1={content1} content2={content2} />)
  })

  it('Should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('Should default to no residents', () => {
    wrapper = shallow(<ResidentsScroller
      content1={content1}
      content2={content2}
    />, { disableLifecycleMethods: true })
    const expectedState = {
      residents: [],
      content1: '',
      content2: '',
      currentIndex: 0
    }

    expect(wrapper.state()).toEqual(expectedState)
  })

  describe('ComponentDidMount', () => {
    it('Should set residents to array of formatted residents if there are multiple', () => {
      const expectedResidents = [
        { name: 'Anikan', display: '' },
        { name: 'R2-D2', display: 'none' }
      ]

      expect(wrapper.state().residents).toEqual(expectedResidents)
    })

    it('Should set residents if there are 0 residents', () => {
      content1 = []
      wrapper = shallow(<ResidentsScroller content1={content1} content2={content2} />)
      const expectedResidents = [{ name: 'none', display: '' }]

      expect(wrapper.state().residents).toEqual(expectedResidents)
    })

    it('Should set content1 and content2 if there is not a residents category', () => {
      content1 = 'Something Interesting'
      content2 = 'Something Else Interesting'
      wrapper = shallow(<ResidentsScroller content1={content1} content2={content2} />)
      const expectedState = {
        residents: [],
        content1: 'Something Interesting',
        content2: 'Something Else Interesting',
        currentIndex: 0
      }

      expect(wrapper.state()).toEqual(expectedState)
    })
  })

  describe('clickArrow', () => {
    it('Should increment the character index', () => {
      const expectedIndex = 1
      wrapper.find('.fa-caret-right').simulate('click')

      expect(wrapper.state().currentIndex).toBe(expectedIndex)
    })

    it('Should decrement the character index', () => {
      wrapper.state().currentIndex = 1
      const expectedIndex = 0
      wrapper.find('.fa-caret-left').simulate('click')

      expect(wrapper.state().currentIndex).toBe(expectedIndex)
    })

    it('Should reset the character index to 0 if incrementing past the length of the residents array', () => {
      wrapper.state().currentIndex = 1
      const expectedIndex = 0
      wrapper.find('.fa-caret-right').simulate('click')

      expect(wrapper.state().currentIndex).toBe(expectedIndex)
    })

    it('Should reset the character index to the length of the residents array if decrementing past 0', () => {
      wrapper.state().currentIndex = 0
      const expectedIndex = 1
      wrapper.find('.fa-caret-right').simulate('click')

      expect(wrapper.state().currentIndex).toBe(expectedIndex)
    })
  })
})
