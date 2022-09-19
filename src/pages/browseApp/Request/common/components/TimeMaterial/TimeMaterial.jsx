import React, { PureComponent } from 'react'
import {
  bool, arrayOf, func, shape, string,
} from 'prop-types'

import {
  Row, Col, TextInput, DatePicker, Text, SelectBox,
} from '@base'

import { numberToTime } from '@utils'

import { formatDate, getDifference } from '@utils/date'

const format = 'YYYY-MM-DD hh:mm:ss A'

class TimeMaterial extends PureComponent {
  state = {
    requestType: '',
    pickUpDateTime: null,
    dropDateTime: null,
    openingKm: 0,
    closingKm: 0,
  }

  changeHandler = (valueObj) => {
    const { changeHandler } = this.props
    changeHandler(valueObj)
  }

  componentDidMount() {
    const { model, isEdit } = this.props
    const {
      pickUpDateTime, dropDateTime, openingKm, closingKm,
    } = model
    if (isEdit) {
      const { requestType } = model
      const { _id: requestTypeId } = requestType || {}
      this.setState({
        requestType: requestTypeId,
      })
    }
    this.setState({
      pickUpDateTime,
      dropDateTime,
      openingKm,
      closingKm,
    })
  }

  calculateTotal = () => {
    const {
      pickUpDateTime, dropDateTime, openingKm, closingKm,
    } = this.state
    const totalKilometers = (closingKm > 0 && openingKm > 0) ? (closingKm - openingKm) : 0
    const totalHours = (dropDateTime && pickUpDateTime) ? getDifference(dropDateTime, pickUpDateTime, 'hour', true) : 0

    this.changeHandler({
      totalKm: totalKilometers,
      totalHr: totalHours,
    })
  }

  valueChangeHandler = (valueObj) => {
    this.setState(valueObj, () => {
      this.calculateTotal()
    })
    this.changeHandler(valueObj)
  }

  requestTypeChangeHandler = (valueObj) => {
    const { requestType } = valueObj
    this.setState({ requestType })
    this.changeHandler(valueObj)
  }

  filterPassedTime = (time) => {
    const { model } = this.props
    const { pickUpDateTime } = model
    return getDifference(time, pickUpDateTime, 'minutes') > 0
  }

  render() {
    const { requestType } = this.state
    const { model, errorMap = {}, requestTypes } = this.props
    const {
      pickUpDateTime, dropDateTime, openingKm,
      closingKm, totalKm, totalHr,
      pickUpLocation, dropOffLocation,
    } = model
    return (
      <>
        <Row>
          <Col
            col={{
              xs: 12, sm: 12, md: 4, lg: 4,
            }}
            classes="pad-b-15"
          >
            <SelectBox
              label="Request type"
              name="requestType"
              valueMap="name"
              keyMap="_id"
              options={requestTypes}
              value={requestType}
              invalid={!!errorMap.requestType}
              errorMessage={errorMap.requestType}
              changeHandler={this.requestTypeChangeHandler}
            />
          </Col>
          <Col
            col={{
              xs: 12, sm: 12, md: 4, lg: 4,
            }}
            classes="pad-b-15"
          >
            <TextInput
              label="Pickup location"
              name="pickUpLocation"
              required
              value={pickUpLocation}
              invalid={!!errorMap.pickUpLocation}
              errorMessage={errorMap.pickUpLocation}
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
              label="Drop location"
              name="dropOffLocation"
              required
              value={dropOffLocation}
              invalid={!!errorMap.dropOffLocation}
              errorMessage={errorMap.dropOffLocation}
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
            <DatePicker
              label="Pick up date-time"
              name="pickUpDateTime"
              selected={pickUpDateTime}
              maxDate={formatDate(null, format)}
              placeholder="Select date time"
              invalid={!!errorMap.pickUpDateTime}
              errorMessage={errorMap.pickUpDateTime}
              options={{
                showTimeSelect: true,
                timeIntervals: 15,
                timeCaption: 'Time',
                dateFormat: 'dd-MM-yyyy, h:mm aaa',
              }}
              changeHandler={this.valueChangeHandler}
            />
          </Col>
          <Col
            col={{
              xs: 12, sm: 12, md: 4, lg: 4,
            }}
            classes="pad-b-15"
          >
            <DatePicker
              label="Drop off date-time"
              name="dropDateTime"
              selected={dropDateTime}
              minDate={formatDate(pickUpDateTime, format)}
              maxDate={formatDate(null, format)}
              placeholder="Select date time"
              invalid={!!errorMap.dropDateTime}
              errorMessage={errorMap.dropDateTime}
              options={{
                showTimeSelect: true,
                timeIntervals: 15,
                timeCaption: 'Time',
                dateFormat: 'dd-MM-yyyy, h:mm aaa',
                filterTime: this.filterPassedTime,
              }}
              changeHandler={this.valueChangeHandler}
            />
          </Col>
          <Col
            col={{
              xs: 12, sm: 12, md: 4, lg: 4,
            }}
            classes="pad-b-15"
          >
            <Text tag="label" classes="show-block text-center pad-b-5">
              Total time
            </Text>
            <Text tag="p" align="center" weight="bold" color="success" size="22">
              {numberToTime(totalHr)}
            </Text>
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
              type="number"
              label="Opening KM"
              name="openingKm"
              value={openingKm}
              invalid={!!errorMap.openingKm}
              errorMessage={errorMap.openingKm}
              changeHandler={this.valueChangeHandler}
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
              label="Closing KM"
              name="closingKm"
              value={closingKm}
              invalid={!!errorMap.closingKm}
              errorMessage={errorMap.closingKm}
              changeHandler={this.valueChangeHandler}
            />
          </Col>
          <Col
            col={{
              xs: 12, sm: 12, md: 4, lg: 4,
            }}
            classes="pad-b-15"
          >
            <Text tag="label" classes="show-block text-center pad-b-5">
              Total kilometers
            </Text>
            <Text tag="p" align="center" weight="bold" color="success" size="22">
              {totalKm > 0 ? totalKm : '-'}
            </Text>
          </Col>
        </Row>
      </>
    )
  }
}

TimeMaterial.propTypes = {
  model: shape({
    customerType: string,
  }),
  errorMap: shape({
    pickUpLocation: string,
  }),
  requestTypes: arrayOf(shape({
    name: string,
  })),
  changeHandler: func,
  isEdit: bool,
}

TimeMaterial.defaultProps = {
  model: {},
  errorMap: {},
  requestTypes: [],
  changeHandler: () => {},
  isEdit: false,
}

export default TimeMaterial
