import React, { PureComponent } from 'react'
import {
  bool, func, shape, string,
} from 'prop-types'

import {
  Panel, Row, Col, TextInput, TextArea, Toggle, DatePicker,
} from '@base'

import { toUTCFormat } from '@utils/date'

class CreateForm extends PureComponent {
  componentDidMount() {
    const { isEdit, model, changeHandler } = this.props
    if (isEdit) {
      const { address = {} } = model
      changeHandler({
        $merge: {
          address,
        },
      })
    }
  }

  changeHandler = (valueObj) => {
    const { changeHandler } = this.props
    changeHandler({
      $merge: valueObj,
    })
  }

  addressChangeHandler = (valueObj) => {
    const { changeHandler } = this.props
    changeHandler({
      address: {
        $merge: valueObj,
      },
    })
  }

  render() {
    const { model, errorMap = {} } = this.props
    const {
      name, address = {}, contact, whatsAppNumber,
      email, joiningDate, salary, license, isActive, comment,
    } = model
    const {
      addressLine1, addressLine2, city, state, pinCode,
    } = address
    return (
      <>
        <Panel title="Staff details" classes="mar-b-15">
          <Row>
            <Col
              col={{
                xs: 12, sm: 12, md: 4, lg: 4,
              }}
              classes="pad-b-15"
            >
              <TextInput
                label="Staff name"
                name="name"
                value={name}
                invalid={!!errorMap.name}
                required
                errorMessage={errorMap.name}
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
                label="Contact"
                name="contact"
                value={contact}
                invalid={!!errorMap.contact}
                required
                errorMessage={errorMap.contact}
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
                label="Whats app number"
                name="whatsAppNumber"
                required
                value={whatsAppNumber}
                invalid={!!errorMap.whatsAppNumber}
                errorMessage={errorMap.whatsAppNumber}
                changeHandler={this.changeHandler}
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
              <TextInput
                label="Email address"
                name="email"
                value={email}
                invalid={!!errorMap.email}
                errorMessage={errorMap.email}
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
                label="Salary"
                name="salary"
                value={salary}
                invalid={!!errorMap.salary}
                required
                errorMessage={errorMap.salary}
                changeHandler={this.changeHandler}
              />
            </Col>
            <Col
              col={{
                xs: 12, sm: 12, md: 4, lg: 4,
              }}
              classes="pad-b-15"
            >
              <DatePicker
                label="Joining date"
                name="joiningDate"
                required
                selected={joiningDate}
                maxDate={toUTCFormat(new Date())}
                changeHandler={this.changeHandler}
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
              <TextInput
                label="Licence"
                name="license"
                value={license}
                changeHandler={this.changeHandler}
              />
            </Col>
            <Col
              col={{
                xs: 12, sm: 12, md: 8, lg: 8,
              }}
              classes="pad-b-15"
            >
              <TextArea
                label="Comments"
                name="comment"
                value={comment}
                changeHandler={this.changeHandler}
              />
            </Col>
          </Row>
        </Panel>
        <Panel title="Address details" classes="mar-b-15 pad-b-15">
          <Row>
            <Col
              col={{
                xs: 12, sm: 12, md: 4, lg: 4,
              }}
              classes="pad-b-15"
            >
              <TextInput
                label="Address line 1"
                name="addressLine1"
                required
                value={addressLine1}
                invalid={!!errorMap['address.addressLine1']}
                errorMessage={errorMap['address.addressLine1']}
                changeHandler={this.addressChangeHandler}
              />
            </Col>
            <Col
              col={{
                xs: 12, sm: 12, md: 4, lg: 4,
              }}
              classes="pad-b-15"
            >
              <TextInput
                label="Address line 2"
                name="addressLine2"
                required
                value={addressLine2}
                invalid={!!errorMap['address.addressLine2']}
                errorMessage={errorMap['address.addressLine2']}
                changeHandler={this.addressChangeHandler}
              />
            </Col>
            <Col
              col={{
                xs: 12, sm: 12, md: 4, lg: 4,
              }}
              classes="pad-b-15"
            >
              <TextInput
                label="City"
                name="city"
                required
                value={city}
                invalid={!!errorMap['address.city']}
                errorMessage={errorMap['address.city']}
                changeHandler={this.addressChangeHandler}
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
              <TextInput
                label="State"
                name="state"
                required
                value={state}
                invalid={!!errorMap['address.state']}
                errorMessage={errorMap['address.state']}
                changeHandler={this.addressChangeHandler}
              />
            </Col>
            <Col
              col={{
                xs: 12, sm: 12, md: 4, lg: 4,
              }}
              classes="pad-b-15"
            >
              <TextInput
                label="Pin code"
                name="pinCode"
                required
                value={pinCode}
                invalid={!!errorMap['address.pinCode']}
                errorMessage={errorMap['address.pinCode']}
                changeHandler={this.addressChangeHandler}
              />
            </Col>
          </Row>
        </Panel>
        <Panel title="Is active" classes="mar-b-15 pad-b-15">
          <Toggle checked={isActive} name="isActive" changeHandler={this.changeHandler} />
        </Panel>
      </>
    )
  }
}

CreateForm.propTypes = {
  changeHandler: func,
  model: shape({
    packageCode: string,
  }),
  errorMap: shape({
    packageCode: string,
  }),
  isEdit: bool,
}

CreateForm.defaultProps = {
  changeHandler: () => {},
  model: {},
  errorMap: {},
  isEdit: false,
}

export default CreateForm
