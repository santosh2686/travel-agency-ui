import React from 'react'
import { node } from 'prop-types'

import { Layout, Row } from '@base'

const Filter = ({ children }) => (
  <Layout
    bgColor="white"
    classes="mar-b-15 pad-t-10 pad-l-10 pad-r-10"
  >
    <Row>
      {children}
    </Row>
  </Layout>
)

Filter.propTypes = {
  children: node.isRequired,
}

export default Filter
