import React, { PureComponent } from 'react'
import {
  bool, func, shape, string,
} from 'prop-types'

import { Panel, Row, Col } from '@base'

import OtherChargesItem from './OtherChargeItem.jsx'

class OtherCharges extends PureComponent {
  componentDidMount() {
    const { isEdit, model, changeHandler } = this.props
    if (isEdit) {
      const { otherCharges } = model
      changeHandler({
        $merge: {
          otherCharges,
        },
      })
    }
  }

  render() {
    const { model, changeHandler } = this.props
    const { otherCharges } = model
    const {
      toll, parking, nightHalt, driverAllowance,
    } = otherCharges
    return (
      <Panel title="Other charges" classes="mar-b-15">
        <Row>
          <Col
            col={{
              xs: 12, sm: 12, md: 4, lg: 4,
            }}
            classes="pad-b-15"
          >
            <OtherChargesItem
              label="Toll"
              amount={toll.amount}
              isChargeableToCustomer={toll.isChargeableToCustomer}
              category="toll"
              changeHandler={changeHandler}
            />
          </Col>
          <Col
            col={{
              xs: 12, sm: 12, md: 4, lg: 4,
            }}
            classes="pad-b-15"
          >
            <OtherChargesItem
              label="Parking"
              amount={parking.amount}
              isChargeableToCustomer={parking.isChargeableToCustomer}
              category="parking"
              changeHandler={changeHandler}
            />
          </Col>
          <Col
            col={{
              xs: 12, sm: 12, md: 4, lg: 4,
            }}
            classes="pad-b-15"
          >
            <OtherChargesItem
              label="Night halt"
              amount={nightHalt.amount}
              isChargeableToCustomer={nightHalt.isChargeableToCustomer}
              isPayableWithSalary={nightHalt.isPayableWithSalary}
              forDriver
              category="nightHalt"
              changeHandler={changeHandler}
            />
          </Col>
        </Row>
        <Row>
          <Col
            col={{
              xs: 12, sm: 12, md: 4, lg: 4,
            }}
            classes="pad-b-15"
          >
            <OtherChargesItem
              label="Driver allowance"
              amount={driverAllowance.amount}
              isChargeableToCustomer={driverAllowance.isChargeableToCustomer}
              isPayableWithSalary={driverAllowance.isPayableWithSalary}
              forDriver
              category="driverAllowance"
              changeHandler={changeHandler}
            />
          </Col>
        </Row>
      </Panel>
    )
  }
}

OtherCharges.propTypes = {
  model: shape({
    tollCharge: string,
  }),
  changeHandler: func,
  isEdit: bool,
}

OtherCharges.defaultProps = {
  model: {},
  changeHandler: () => {},
  isEdit: false,
}

export default OtherCharges
