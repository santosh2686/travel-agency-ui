import React, { memo } from 'react'
import { arrayOf, shape, string } from 'prop-types'
import ClassNames from 'classnames'
import { MapCssModules } from '@utils'

import Anchor from '../Anchor/Anchor.jsx'
import Text from '../Text/Text.jsx'

const BreadCrumb = ({ data, classes }) => {
  const eltClass = ClassNames('breadcrumb', {
    [classes]: classes,
  })
  return (
    <div styleName={eltClass}>
      <ul styleName="flex">
        {data.map(({ route, label }, index) => {
          const key = `bread-crumb-item-${index}`
          return (
            <li styleName="relative pad-lr-10" key={key}>
              {route
                ? (
                  <Anchor
                    href={route}
                    color="gray"
                    hoverColor="gray-darker"
                    asLink
                    noUnderline
                  >
                    {label}
                  </Anchor>
                )
                : (
                  <Text color="gray-darker">
                    {label}
                  </Text>
                )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

BreadCrumb.propTypes = {
  data: arrayOf(shape({
    label: string,
    route: string,
  })),
  classes: string,
}

BreadCrumb.defaultProps = {
  data: [],
  classes: '',
}

export default memo(MapCssModules(BreadCrumb))
