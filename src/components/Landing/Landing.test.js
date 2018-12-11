import React from 'react'
import { shallow } from 'enzyme'
import Landing from './Landing'

describe('Landing', () => {
  const mockChange = jest.fn()
  const mockepisode = { title: 'A New Hope', year: '1995', text: 'text' }
  const wrapper = shallow(
    <Landing
      episode={mockepisode}
    />
  )

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
