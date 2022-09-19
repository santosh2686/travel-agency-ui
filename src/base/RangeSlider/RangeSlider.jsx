import React, { PureComponent } from 'react'
import {
  string, bool, func, number,
} from 'prop-types'
import ClassNames from 'classnames'

import { MapCssModules } from '@utils'

class RangeSlider extends PureComponent {
  state = {
    outputPos: 0,
    slidePercentage: 0,
  };

  componentDidMount() {
    const { value } = this.props
    this.computeOutputPosition(value)
  }

  changeHandler = ({ target: { value } }) => {
    this.computeOutputPosition(value)
    const { changeHandler } = this.props
    changeHandler(value)
  };

  computeOutputPosition = (value) => {
    const { minValue, maxValue } = this.props
    const slidePercentage = ((value - minValue) / (maxValue - minValue) * 100)
    const outputPos = (((50 - slidePercentage) * 90) / 100) / 4
    this.setState({ slidePercentage, outputPos })
  };

  render() {
    const { outputPos, slidePercentage } = this.state
    const {
      classes, name, minValue, maxValue, step, value,
    } = this.props
    const eltClass = ClassNames('relative range-slider', {
      [classes]: classes,
    })

    return (
      <div styleName={eltClass}>
        <input
          styleName="mar-tb-10 width-100 bor-radius-5"
          style={{ background: `linear-gradient(to right, #4e9de6 0%, #4e9de6 ${slidePercentage}%, #dedede ${slidePercentage}%, #d5d9da 100%)` }}
          type="range"
          name={name}
          min={minValue}
          max={maxValue}
          step={step}
          value={value}
          onChange={this.changeHandler}
        />
        <div
          styleName="absolute bg-gray flex flex-center align-center bor-radius-5 font-bold pad-tb-10 color-white range-output"
          style={{ left: `${slidePercentage}%`, marginLeft: `calc(-45px + ${outputPos}px)` }}
        >
          {value}
        </div>
      </div>
    )
  }
}

RangeSlider.propTypes = {
  classes: string,
  name: string,
  minValue: number.isRequired,
  maxValue: number.isRequired,
  step: number,
  value: string.isRequired,
}

RangeSlider.defaultProps = {
  classes: '',
  name: 'range',
  step: 1,
  value: '5',
}

export default MapCssModules(RangeSlider)
