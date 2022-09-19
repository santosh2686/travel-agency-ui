import React from 'react'
import { shallow } from 'enzyme'

import { Wrapper } from './Wrapper'
import { toDate } from '@utils/date'

describe('Wrapper Component', () => {
  let wrapper
  beforeAll(() => {
    const component = (<Wrapper />)
    wrapper = shallow(component)
  })

  it('should render', () => {
    console.log(toDate().format())
    expect(wrapper).toBeDefined()
  })
})
