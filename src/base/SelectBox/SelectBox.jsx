import React, { PureComponent } from 'react'
import {
  arrayOf, bool, func, object, string,
} from 'prop-types'
import ClassNames from 'classnames'

import { MapCssModules, computeValue } from '@utils'

import Text from '../Text/Text.jsx'
import Spinner from '../Spinner/Spinner.jsx'

class SelectBox extends PureComponent {
  changeHandler = ({ target: { value } }) => {
    const { changeHandler, name } = this.props
    changeHandler({ [name]: value })
  };

  render() {
    const {
      label, options, value, keyMap, valueMap, placeHolder, required, isLoading,
      disabled, attributes, classes, invalid, valid, controlClasses, errorMessage,
      hideLabel,
    } = this.props
    const eltClass = ClassNames('relative select-box', {
      [classes]: classes,
      disabled,
    })
    const selectBoxClass = ClassNames('width-100 bg-white pad-tb-5 font-14 input-control', {
      'bor-gray-light pad-lr-10': !(invalid || valid),
      'color-gray': disabled,
      'bor-danger pad-l-10 pad-r-30': invalid,
      'bor-success pad-l-10 pad-r-30': valid,
      [controlClasses]: controlClasses,
    })
    return (
      <div styleName={eltClass}>
        {isLoading && (
          <Spinner
            size="small"
            classes="absolute select-box-spinner"
          />
        )}
       <div styleName="flex flex-space-between">
          {!label || !hideLabel && (
            <label styleName="show-block pad-b-5">
              {label}
              {required && <span styleName="color-gray">*</span>}
            </label>
          )}
          <Text color="danger">
            {errorMessage}
          </Text>
        </div>
        <select
          styleName={selectBoxClass}
          value={value}
          disabled={disabled}
          required={required}
          onChange={this.changeHandler}
          {...attributes}
        >
          {placeHolder && <option value="">{placeHolder}</option>}
          {options.map((item, index) => {
            if (keyMap && valueMap) {
              const value = computeValue(item, keyMap)
              return (<option key={value} value={value}>{item[valueMap]}</option>)
            }
            return (<option key={index} value={item}>{item}</option>)
          })}
        </select>
      </div>
    )
  }
}

SelectBox.propTypes = {
  label: string,
  options: arrayOf(object),
  value: string,
  keyMap: string,
  valueMap: string,
  placeHolder: string,
  disabled: bool,
  required: bool,
  isLoading: bool,
  hideLabel: bool,
  classes: string,
  changeHandler: func,
}

SelectBox.defaultProps = {
  label: '',
  options: [{ key: '1', value: 'one' }, { key: '2', value: 'two' }],
  value: '',
  keyMap: 'key',
  valueMap: 'value',
  placeHolder: 'Select',
  disabled: false,
  required: false,
  isLoading: false,
  hideLabel: false,
  classes: '',
  changeHandler: () => {},
}

export default MapCssModules(SelectBox)
