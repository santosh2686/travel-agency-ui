import React, { memo } from 'react'
import {
  bool, string, number, node,
} from 'prop-types'

import {
  Layout, Icon, Text, Currency,
} from '@base'

const InfoBox = ({
  iconName, label, value, isCurrency, classes, children,
}) => (
  <Layout
    flex={{ align: 'center', justify: 'space-between' }}
    bgColor="white"
    pad="20"
    classes={classes}
  >
    <Icon name={iconName} iconScale="3x" color="success" />
    <div styleName="text-center">
      <Text size="24">
        {isCurrency ? (
          <Currency data={value} />
        ) : value}
      </Text>
      <Text tag="p" size="14" color="gray" transform="uppercase">{label}</Text>
    </div>
    {children}
  </Layout>
)

InfoBox.propTypes = {
  iconName: string.isRequired,
  label: string.isRequired,
  value: number.isRequired,
  isCurrency: bool,
  classes: string,
  children: node,
}

InfoBox.defaultProps = {
  isCurrency: false,
  classes: '',
  children: null,
}

export default memo(InfoBox)
