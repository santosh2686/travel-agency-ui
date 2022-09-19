import React, { memo } from 'react'
import { string } from 'prop-types'
import ClassNames from 'classnames'
import { MapCssModules } from '@utils'

const HeaderCell = ({ label, classes }) => {
  const eltClass = ClassNames('font-12 text-left uppercase pad-tb-10 pad-lr-15 bor-b-gray-light bor-width-2', {
    [classes]: classes,
  })

  return (
    <th styleName={eltClass}>{label}</th>
  )
}

HeaderCell.propTypes = {
  label: string,
  classes: string,
}

HeaderCell.defaultProps = {
  label: '',
  classes: '',
}

export default memo(MapCssModules(HeaderCell))
