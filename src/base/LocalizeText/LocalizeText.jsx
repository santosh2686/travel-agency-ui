import React, { memo } from 'react'
import { shape, object, string } from 'prop-types'
import { Text } from 'react-internationalization'
import { MapCssModules } from '@utils'

const LocalizeText = ({ path, values, pluralize }) => (
  <Text
    id={path}
    values={values}
    pluralize={pluralize}
  />
)

LocalizeText.propTyeps = {
  path: string.isRequired,
  values: shape(object),
  pluralize: shape(object),
}

LocalizeText.defaultProps = {
  values: {},
  pluralize: {},
}

export default memo(MapCssModules(LocalizeText))
