import React, { memo } from 'react'
import { string, node } from 'prop-types'

import { Col, Text } from '@base'

const DetailViewItem = ({ label, children }) => (
  <Col
    col={{
      xs: 12, sm: 12, md: 4, lg: 4,
    }}
    classes="pad-b-15"
  >
    <Text tag="p">{label}</Text>
    <Text tag="div" color="gray">
      {children}
    </Text>
  </Col>
)

DetailViewItem.propTypes = {
  label: string,
  children: node,
}

DetailViewItem.defaultProps = {
  label: '',
  children: '',
}

export default memo(DetailViewItem)
