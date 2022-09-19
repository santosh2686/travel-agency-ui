import React, { PureComponent } from 'react'
import { bool, func, string } from 'prop-types'
import ClassNames from 'classnames'

import { MapCssModules } from '@utils'

class Radio extends PureComponent {
  selectHandler = () => {
    const { changeHandler, value } = this.props
    changeHandler(value)
  };

  render() {
    const {
      name, value, label, id, defaultChecked, disabled, inline, classes,
    } = this.props
    const eltClass = ClassNames('radio-control mar-b-5', {
      'pad-r-15': inline,
      [classes]: classes,
    })
    return (
      <div styleName={eltClass}>
        <input
          type="radio"
          name={name}
          id={id}
          value={value}
          defaultChecked={defaultChecked}
          disabled={disabled}
          styleName="hide"
          onClick={this.selectHandler}
        />
        <label styleName="relative show-inline-block cur-pointer pad-l-25" htmlFor={id}>{label}</label>
      </div>
    )
  }
}

Radio.propTypes = {
  id: string.isRequired,
  name: string,
  value: string,
  label: string,
  checked: bool,
  disabled: bool,
  inline: bool,
}

Radio.defaultProps = {
  name: 'radio',
  value: '',
  label: '',
  checked: false,
  disabled: false,
  inline: false,
}

export default MapCssModules(Radio)
