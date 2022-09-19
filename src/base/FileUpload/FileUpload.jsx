import React, { PureComponent } from 'react'
import { string, bool, func } from 'prop-types'
import ClassNames from 'classnames'

import { MapCssModules } from '@utils'

class FileUpload extends PureComponent {
  render() {
    const { classes } = this.props
    const eltClass = ClassNames({
      [classes]: classes,
    })
    return (
      <div styleName={eltClass}>Data</div>
    )
  }
}

export default MapCssModules(FileUpload)
