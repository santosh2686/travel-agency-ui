import React, { PureComponent } from 'react'
import {
  string, bool, func, object,
} from 'prop-types'
import ClassNames from 'classnames'
import { MapCssModules } from '@utils'

class TextArea extends PureComponent {
  changeHandler = ({ target: { value } }) => {
    const { changeHandler, name } = this.props
    changeHandler({ [name]: value })
  };

  render() {
    const {
      label, value, invalid, valid, disabled,
      required, classes, controlClasses, attributes,
    } = this.props
    const eltClass = ClassNames({
      [classes]: classes,
    })
    const controlClass = ClassNames('width-100 bg-white pad-tb-5 font-14 input-control', {
      'bor-gray-light pad-lr-10': !(invalid || valid),
      'color-gray': disabled,
      'bor-danger pad-l-10 pad-r-30': invalid,
      'bor-success pad-l-10 pad-r-30': valid,
      [controlClasses]: controlClasses,
    })
    return (
      <div styleName={eltClass}>
        {label && (
          <label styleName="show-block">
            {label}
            {required && <span styleName="color-gray">*</span>}
          </label>
        ) }
        <textarea
          value={value}
          disabled={disabled}
          styleName={controlClass}
          onChange={this.changeHandler}
          {...attributes}
        />
      </div>
    )
  }
}

TextArea.propTypes = {
  label: string,
  type: string,
  disabled: bool,
  required: bool,
  invalid: bool,
  valid: bool,
  value: string,
  name: string,
  classes: string,
  changeHandler: func,
  attributes: object,
}

TextArea.defaultProps = {
  label: '',
  type: 'text',
  disabled: false,
  required: false,
  valid: false,
  invalid: false,
  value: '',
  name: '',
  classes: '',
  changeHandler: () => {},
  attributes: {},
}

export default MapCssModules(TextArea)
