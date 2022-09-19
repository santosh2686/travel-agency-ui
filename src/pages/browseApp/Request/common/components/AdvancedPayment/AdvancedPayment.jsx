import React, { PureComponent } from 'react'
import {
  bool, func, number, shape,
} from 'prop-types'

import {
  Panel, Row, Col, TextInput,
} from '@base'

class AdvancedPayment extends PureComponent {
  componentDidMount() {
    const { isEdit, model, changeHandler } = this.props
    if (isEdit) {
      const { advancedPayment } = model
      changeHandler({
        $merge: {
          advancedPayment,
        },
      })
    }
  }

  changeHandler = (valueObj) => {
    const { changeHandler } = this.props
    changeHandler({
      advancedPayment: {
        $merge: valueObj,
      },
    })
  }

  render() {
    const { model, isOtherVehicle } = this.props
    const { advancedPayment } = model
    const {
      advancedFromCustomer, advancedToCustomer,
      advancedFromProvidedVehicle, advancedToProvidedVehicle,
    } = advancedPayment
    return (
      <Panel title="Advanced payment" classes="mar-b-15">
        <Row>
          <Col
            col={{
              xs: 12, sm: 12, md: 4, lg: 4,
            }}
            classes="pad-b-15"
          >
            <TextInput
              type="number"
              label="Advanced from customer"
              name="advancedFromCustomer"
              value={advancedFromCustomer}
              changeHandler={this.changeHandler}
            />
          </Col>
          <Col
            col={{
              xs: 12, sm: 12, md: 4, lg: 4,
            }}
            classes="pad-b-15"
          >
            <TextInput
              type="number"
              label="Advanced to customer"
              name="advancedToCustomer"
              value={advancedToCustomer}
              changeHandler={this.changeHandler}
            />
          </Col>
          {isOtherVehicle && (
            <Col
              col={{
                xs: 12, sm: 12, md: 4, lg: 4,
              }}
              classes="pad-b-15"
            >
              <TextInput
                type="number"
                label="Advanced from provided vehicle"
                name="advancedFromProvidedVehicle"
                value={advancedFromProvidedVehicle}
                changeHandler={this.changeHandler}
              />
            </Col>
          )}
        </Row>
        {isOtherVehicle && (
          <Row>
            <Col
              col={{
                xs: 12, sm: 12, md: 4, lg: 4,
              }}
              classes="pad-b-15"
            >
              <TextInput
                type="number"
                label="Advanced to provided vehicle"
                name="advancedToProvidedVehicle"
                value={advancedToProvidedVehicle}
                changeHandler={this.changeHandler}
              />
            </Col>
          </Row>
        )}
      </Panel>
    )
  }
}

AdvancedPayment.propTypes = {
  model: shape({
    advancedPayment: shape({
      advancedToCustomer: number,
    }),
  }),
  changeHandler: func,
  isOtherVehicle: bool,
  isEdit: bool,
}

AdvancedPayment.defaultProps = {
  model: {},
  changeHandler: () => {},
  isOtherVehicle: false,
  isEdit: false,
}

export default AdvancedPayment
