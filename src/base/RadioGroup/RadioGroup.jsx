import React, { memo } from 'react'
import {
  arrayOf, object, bool, func, string,
} from 'prop-types'
import ClassNames from 'classnames'
import { MapCssModules } from '@utils'

import Radio from '../Radio/Radio.jsx'

const RadioGroup = ({
  list, changeHandler, disabled, inline, classes,
}) => {
  const eltClass = ClassNames({
    flex: inline,
    [classes]: classes,
  })
  const count = list.length
  return (
    <div styleName={eltClass}>
      {list.map((item, index) => {
        const unique = `${item.name}_${item.id}`
        return (
          <Radio
            key={unique}
            id={unique}
            name={item.name}
            value={item.value}
            label={item.label}
            defaultChecked={item.defaultChecked}
            disabled={disabled}
            changeHandler={changeHandler}
            inline={inline && count !== index + 1}
          />
        )
      })}
    </div>
  )
}

RadioGroup.prototypes = {
  list: arrayOf(object).isRequired,
  disabled: bool,
  inline: bool,
  changeHandler: func.isRequired,
  classes: string,
}

RadioGroup.defaultProps = {
  list: [{
    name: 'gender', id: 'male', value: 'true', label: 'Yes', defaultChecked: false,
  },
  {
    name: 'gender', id: 'female', value: 'false', label: 'No', defaultChecked: false,
  }],
  disabled: false,
  inline: false,
  classes: '',
  changeHandler: () => {},
}

export default memo(MapCssModules(RadioGroup))
