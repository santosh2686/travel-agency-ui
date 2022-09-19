import React, { memo } from 'react'
import { number, arrayOf, string } from 'prop-types'
import ClassNames from 'classnames'
import { MapCssModules } from '@utils'

import Row from '../Row/Row.jsx'
import Col from '../Col/Col.jsx'

import Text from '../Text/Text.jsx'
import Icon from '../Icon/Icon.jsx'

const Stepper = ({ data, activeStep, classes }) => {
  const eltClass = ClassNames('relative pad-tb-20 stepper', {
    [classes]: classes,
  })
  return (
    <div styleName={eltClass}>
      <Row classes="relative">
        {data.map((stepName, index) => {
          const selectedClass = ClassNames('show-inline-block circle bg-white stepper-item', {
            'bg-primary color-white': index === activeStep,
            'bg-success': index < activeStep,
            'bor-gray': index > activeStep,
          })

          return (
            <Col col={{ xs: 4 }} key={index} classes="text-center">
              <span styleName={selectedClass}>
                {index < activeStep ? <Icon name="check" color="white" /> : index + 1}
              </span>
              <Text tag="p" color="gray" transform="uppercase">
                {stepName}
              </Text>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

Stepper.propTypes = {
  data: arrayOf(string),
  activeStep: number,
}

Stepper.defaultProps = {
  data: [],
  activeStep: 0,
}

export default memo(MapCssModules(Stepper))
