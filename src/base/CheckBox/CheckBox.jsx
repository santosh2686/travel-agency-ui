import React, { PureComponent } from 'react'
import { string, bool, func } from 'prop-types'
import ClassNames from 'classnames'

import { MapCssModules } from '@utils'

class CheckBox extends PureComponent {
  onChangeHandler = ({ target: { checked } }) => {
    const { changeHandler, name } = this.props
    changeHandler({
      [name]: checked,
    })
  };

  render() {
    const {
      tag: Tag, name, id, label, checked, disabled, classes,
    } = this.props
    const eltClass = ClassNames('checkbox-control mar-b-5', {
      [classes]: classes,
    })

    return (
      <Tag styleName={eltClass}>
        <input
          disabled={disabled}
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={this.onChangeHandler}
          styleName="hide"
        />
        <label
          styleName="relative show-inline-block cur-pointer pad-l-25"
          htmlFor={id}
        >
          {label}
        </label>
      </Tag>
    )
  }
}

CheckBox.propTypes = {
  id: string.isRequired,
  checked: bool,
  disabled: bool,
  tag: string,
  name: string,
  label: string,
  classes: string,
  changeHandler: func,
}

CheckBox.defaultProps = {
  tag: 'div',
  name: '',
  label: '',
  classes: '',
  checked: false,
  disabled: false,
  changeHandler: () => {},
}

export default MapCssModules(CheckBox)
