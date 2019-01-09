import React from 'react'
import { shallow } from 'enzyme'

import BetPage from './BetPage'

describe('BetPage', () => {
  describe('given BetPage component', () => {
    describe('when trying to render the component', () => {
      it('should render the component', () => {
        const component = shallow(<BetPage />)

        expect(component.length).toBe(1)
      })
    })
  })
})
