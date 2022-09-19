import React, { PureComponent } from 'react'
import { bool, func, string } from 'prop-types'
import ClassNames from 'classnames'

import { MapCssModules } from '@utils'

class Toggle extends PureComponent {
  changeHandler = ({ target: { checked } }) => {
    const { changeHandler, name } = this.props
    changeHandler({ [name]: checked })
  }

  render() {
    const {
      name, label, checked, disabled, classes,
    } = this.props
    const eltClasses = ClassNames('flex align-center', {
      [classes]: classes,
    })
    const sliderClasses = ClassNames('absolute toggle-slider', {
      'bg-gray cur-pointer': !checked && !disabled,
      'bg-primary cur-pointer': checked && !disabled,
      'bg-gray-light cur-not-allowed': disabled,
    })

    return (
      <div styleName={eltClasses}>
        <div styleName="relative toggle-switch">
          <input
            type="checkbox"
            styleName="hide"
            disabled={disabled}
            checked={checked}
            onChange={this.changeHandler}
            id={name}
            name={name}
          />
          <label htmlFor={name} styleName={sliderClasses} />
        </div>
        {label && <div styleName="mar-l-10">{label}</div>}
      </div>
    )
  }
}

Toggle.propTypes = {
  name: string,
  label: string,
  classes: string,
  checked: bool,
  disabled: bool,
  changeHandler: func,
}

Toggle.defaultProps = {
  name: 'toggle',
  label: '',
  classes: '',
  checked: false,
  disabled: false,
  changeHandler: () => {},
}

export default MapCssModules(Toggle)
