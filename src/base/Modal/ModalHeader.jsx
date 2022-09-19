import React, { memo } from 'react'
import { MapCssModules } from '@utils'

const ModalHeader = ({ title, closeHandler }) => (
  <div styleName="flex flex-space-between bor-b-gray-light align-center pad-tb-10 pad-lr-15 flex-no-shrink">
    <h4>{title}</h4>
    <span styleName="font-24 cur-pointer color-gray" onClick={closeHandler}>&times;</span>
  </div>
)

export default memo(MapCssModules(ModalHeader))
