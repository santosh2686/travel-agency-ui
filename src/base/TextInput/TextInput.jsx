import React, { PureComponent } from 'react'
import {
  string, bool, func, shape, number, oneOfType,
} from 'prop-types'
import { MapCssModules } from '@utils'
import ClassNames from 'classnames'

import Text from '../Text/Text.jsx'

class TextInput extends PureComponent {
  changeHandler = ({ target: { value } }) => {
    const { changeHandler, name, type } = this.props
    const parsedValue = type === 'number' ? Number(value) : value
    changeHandler({ [name]: parsedValue })
  }

  render() {
    const {
      label, type, value, disabled, invalid, valid, rounded,
      classes, size, controlClasses, attributes, required, errorMessage,
    } = this.props
    const eltClass = ClassNames('relative', {
      [classes]: classes,
    })

    const textFieldClass = ClassNames('width-100 bg-white pad-tb-5 font-14 input-control', {
      'bor-gray-light pad-lr-10': !(invalid || valid),
      'color-gray': disabled,
      'bor-danger pad-l-10 pad-r-30': invalid,
      'bor-success pad-l-10 pad-r-30': valid,
      rounded,
      [size]: size,
      [controlClasses]: controlClasses,
    })

    const iconClass = ClassNames('absolute warning-icon', {
      'color-danger': invalid,
      'color-success': valid,
    })

    return (
      <div styleName={eltClass}>
        <div styleName="flex flex-space-between">
          {label && (
            <label styleName="show-block pad-b-5">
              {label}
              {required && <span styleName="color-gray">*</span>}
            </label>
          )}
          <Text color="danger">
            {errorMessage}
          </Text>
        </div>

        <input
          type={type}
          styleName={textFieldClass}
          value={value}
          disabled={disabled}
          onChange={this.changeHandler}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...attributes}
        />
        <div styleName={iconClass}>
          {invalid && <i className="fa fa-exclamation-triangle" /> }
          {valid && <i className="fa fa-check" /> }
        </div>
      </div>
    )
  }
}

TextInput.propTypes = {
  label: string,
  type: string,
  disabled: bool,
  size: string,
  invalid: bool,
  valid: bool,
  rounded: bool,
  required: bool,
  value: oneOfType([string, number]),
  name: string,
  classes: string,
  controlClasses: string,
  errorMessage: string,
  changeHandler: func,
  attributes: shape({
    maxLength: number,
  }),
}

TextInput.defaultProps = {
  label: '',
  type: 'text',
  disabled: false,
  size: '',
  valid: false,
  invalid: false,
  rounded: false,
  required: false,
  value: '',
  name: '',
  classes: '',
  errorMessage: '',
  controlClasses: '',
  changeHandler: () => {},
  attributes: {},
}

export default MapCssModules(TextInput)
