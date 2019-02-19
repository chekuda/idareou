import React from 'react'
import { shallow } from 'enzyme'

import HistoryPageContainer from './HistoryPageContainer'

describe('given HistoryPageContainer component', () => {
  describe('when trying to render the HistoryPageContainer component', () => {
    it('should render the HistoryPageContainer component', () => {
      const backUpDidMount = HistoryPageContainer.prototype.componentDidMount
      HistoryPageContainer.prototype.componentDidMount = jest.fn()
      const component = shallow(<HistoryPageContainer />)

      expect(component.length).toBe(1)
      expect(component.find('HistoryPage').length).toBe(1)
      HistoryPageContainer.prototype.componentDidMount = backUpDidMount
    })
  })
})
