import React, { PureComponent } from 'react'
import { arrayOf, object, func } from 'prop-types'
import update from 'immutability-helper'
import ClassNames from 'classnames'
import { MapCssModules } from '@utils'

import CheckBox from '../CheckBox/CheckBox.jsx'

class CheckBoxGroup extends PureComponent {
  state = {
    selection: {},
  };

  changeHandler = ({ name, checked }) => {
    const { changeHandler } = this.props
    this.setState(update(this.state, {
      selection: checked ? {
        $merge: {
          [name]: checked,
        },
      } : {
        $unset: [name],
      },
    }), () => {
      changeHandler(Object.keys(this.state.selection))
    })
  };

  render() {
    const { list, classes } = this.props
    const { selection } = this.state
    const eltClass = ClassNames({
      [classes]: classes,
    })

    return (
      <div styleName={eltClass}>
        {list.map((item) => (
          <CheckBox
            key={item.id}
            id={item.id}
            disabled={item.disabled}
            name={item.name}
            value={item.value}
            label={item.label}
            checked={selection[item.value]}
            changeHandler={this.changeHandler}
          />
        ))}
      </div>
    )
  }
}

CheckBoxGroup.propTypes = {
  list: arrayOf(object).isRequired,
  changeHandler: func.isRequired,
}

CheckBoxGroup.defaultProps = {
  changeHandler: () => {},
}

export default MapCssModules(CheckBoxGroup)
