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
    secInfoOther: 'None',
    favorite: false,
    category: 'planets'
  }
  let formattedData
  let handleStoreData = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <Card 
        cardType={'planets'} 
        cardData={mockData} 
        handleStoreData={handleStoreData}
    />)
    formattedData = {
      favorite: false,
      category: 'planets',
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
    wrapper = shallow(<Card cardType={'planets'} cardData={mockData}/>, { disableLifecycleMethods: true})
    const expected = {
      flipped: false,
      unflipped: false,
      cardObj: null
    }

    expect(wrapper.state()).toEqual(expected)
  })

  it('Should render an empty div if cardObj is null', () => {
    wrapper = shallow(<Card cardType={'planets'} cardData={mockData}/>, { disableLifecycleMethods: true})

    expect(wrapper).toMatchSnapshot()
  })

  it('Should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('ComponentDidMount', () => {

    it('Should set CardObj to reformatted cardData', () => {
      const expected = {
        flipped: false,
        unflipped: false,
        cardObj: formattedData
      }

      expect(wrapper.state()).toEqual(expected)
    })

    it('Should set CardObj labels to vehicle labels if category is vehicle', () => {
      wrapper = shallow(<Card cardType={'vehicles'} cardData={mockData}/>)
      const expected = {
        favorite: false,
        category: 'planets',
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
      wrapper = shallow(<Card cardType={'people'} cardData={mockData}/>)
      const expected = {
        favorite: false,
        category: 'planets',
        name: 'Test Planet',
        type: 'Fun Terrrain',
        main1Label: 'Height',
        main1: '200K cm',
        main2Label: 'Weight',
        main2: 'Warm kg',
        secHeader: 'Homeworld',
        secInfoMain: ['Jim', 'Bob'],
        secInfoOther: 'None'
      }

      expect(wrapper.instance().state.cardObj).toEqual(expected)
    })

    it('Should not set CardObj labels if there is no Category', () => {
      wrapper = shallow(<Card cardType={''} cardData={mockData}/>)
      const expected = {
        favorite: false,
        category: 'planets',
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

    it.skip('Should fire the toggleFavorite function when the front favorite button is clicked', () => {
      // wrapper.find('.favorite-btn')[0].simulate('click')
    })

    it.skip('Should fire the toggleFavorite function when the back favorite button is clicked', () => {

    })
  })

  describe('flipCard', () => {

    it('should not setState if the click occured on the favorite button', () => {
      const expected = {
        flipped: false,
        unflipped: false,
        cardObj: formattedData
      }

      wrapper.find('.card').simulate('click',  {target: {classList: {contains: () => true}}})

      expect(wrapper.state()).toEqual(expected)
    })

    it('should not setState if the click occured on a scroll button', () => {
      const expected = {
        flipped: false,
        unflipped: false,
        cardObj: formattedData
      }

      wrapper.find('.card').simulate('click',  {target: {classList: {contains: () => true}}})

      expect(wrapper.state()).toEqual(expected)
    })
    
    it('should set flipped to true when unflipped', () => {
      const expected = {
        flipped: true,
        unflipped: false,
        cardObj: formattedData
      }
      
      wrapper.find('.card').simulate('click',  {target: {classList: {contains: () => false}}})

      expect(wrapper.state()).toEqual(expected)
    })
    
    it('should set flipped to false when flipped', () => {
      const expected = {
        flipped: false,
        unflipped: true,
        cardObj: formattedData
      }
      
      wrapper.find('.card').simulate('click', {target: {classList: {contains: () => false}}})
      wrapper.find('.card').simulate('click',  {target: {classList: {contains: () => false}}})

      expect(wrapper.state()).toEqual(expected)
    })
  })

  describe('ToggleFavorite', () => {

    it('Should toggle the favorite property on the card object in state', () => {
      const expectedData = true
      
      wrapper.instance().toggleFavorite(mockData)
      expect(wrapper.state().cardObj.favorite).toEqual(expectedData)
    })

    it('Should store the updated card in local storage', () => {
     
      wrapper.instance().toggleFavorite(mockData)
      expect(handleStoreData).toHaveBeenCalled()
    })
  })
})
