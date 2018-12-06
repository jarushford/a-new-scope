import React from 'react';
import Card from './Card';
import { shallow } from 'enzyme'

describe('Card', () => {
  let wrapper
  const mockData = {
    name: 'Test Planet',
    type: 'Fun Terrrain',
    main1: '200K',
    main2: 'Warm',
    secInfoMain: ['Jim', 'Bob'],
    secInfoOther: 'None'
  }
  let formattedData

  beforeEach(() => {
    wrapper = shallow(<Card cardType={'Planets'} cardData={mockData}/>)
    formattedData = {
      name: 'Test Planet',
      type: 'Fun Terrrain',
      main1Label: 'Population',
      main1: '200K',
      main2Label: 'Climate',
      main2: 'Warm',
      secHeader: 'Residents',
      secInfoMain: ['Jim', 'Bob'],
      secInfoOther: 'None'
    }
  })

  it('Should default flipped to false, and unflipped to false', () => {
    wrapper = shallow(<Card cardType={'Planets'} cardData={mockData}/>, { disableLifecycleMethods: true})
    const expected = {
      flipped: false,
      unflipped: false,
      cardObj: null
    }

    expect(wrapper.state()).toEqual(expected)
  })

  it('Should render an empty div if cardObj is null', () => {
    wrapper = shallow(<Card cardType={'Planets'} cardData={mockData}/>, { disableLifecycleMethods: true})

    expect(wrapper).toMatchSnapshot()
  })

  it('Should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('ComponentDidMount', () => {

    it('Should set CardObj to reformatted cardData', () => {
      const expected = {
        flipped: false,
        unflipped: true,
        cardObj: formattedData
      }

      expect(wrapper.state()).toEqual(expected)
    })

    it('Should set CardObj labels to vehicle labels if category is vehicle', () => {
      wrapper = shallow(<Card cardType={'Vehicles'} cardData={mockData}/>)
      const expected = {
        name: 'Test Planet',
        type: 'Fun Terrrain',
        main1Label: 'Model',
        main1: '200K',
        main2Label: 'Class',
        main2: 'Warm',
        secHeader: 'Passengers',
        secInfoMain: ['Jim', 'Bob'],
        secInfoOther: 'None'
      }

      expect(wrapper.instance().state.cardObj).toEqual(expected)
    })

    it('Should set CardObj labels to character labels if category is characters', () => {
      wrapper = shallow(<Card cardType={'People'} cardData={mockData}/>)
      const expected = {
        name: 'Test Planet',
        type: 'Fun Terrrain',
        main1Label: 'Height',
        main1: '200K',
        main2Label: 'Weight',
        main2: 'Warm',
        secHeader: 'Homeworld',
        secInfoMain: ['Jim', 'Bob'],
        secInfoOther: 'None'
      }

      expect(wrapper.instance().state.cardObj).toEqual(expected)
    })

    it('Should not set CardObj labels if there is no Category', () => {
      wrapper = shallow(<Card cardType={''} cardData={mockData}/>)
      const expected = {
        name: 'Test Planet',
        type: 'Fun Terrrain',
        main1Label: '',
        main1: '200K',
        main2Label: '',
        main2: 'Warm',
        secHeader: '',
        secInfoMain: ['Jim', 'Bob'],
        secInfoOther: 'None'
      }
      expect(wrapper.instance().state.cardObj).toEqual(expected)
    })
  })

  describe('flipCard', () => {

    
    it('should set flipped to true when unflipped', () => {
      const expected = {
        flipped: true,
        unflipped: false,
        cardObj: formattedData
      }
      
      wrapper.find('.card').simulate('click')

      expect(wrapper.state()).toEqual(expected)
    })
    
    it('should set flipped to false when flipped', () => {
      const expected = {
        flipped: false,
        unflipped: true,
        cardObj: formattedData
      }
      
      wrapper.find('.card').simulate('click')
      wrapper.find('.card').simulate('click')

      expect(wrapper.state()).toEqual(expected)
    })
  })
})