import React, { memo } from 'react'
import {
  arrayOf, shape, bool, func, string,
} from 'prop-types'

import {
  Alert, Row, Col, Text, SelectBox,
} from '@base'

const RegularVehicleSelection = ({
  vehicleList,
  selectedVehicle,
  changeHandler,
}) => {
  if (vehicleList.length === 0) {
    return (
      <Alert
        message="This customer does not have vehicle on monthly basis. Please choose another customer."
        type="warning"
      />
    )
  }

  if (vehicleList.length === 1) {
    const { manufacturer, name, registrationNo } = vehicleList[0]
    return (
      <Text color="gray">
        {`${manufacturer} ${name}, ${registrationNo}`}
      </Text>
    )
  }

  return (
    <Row>
      <Col
        col={{
          xs: 12, sm: 12, md: 4, lg: 4,
        }}
        classes="pad-b-15"
      >
        <SelectBox
          id="regularVehicle"
          name="regularVehicle"
          label="Select vehicle"
          keyMap="_id"
          valueMap="registrationNo"
          options={vehicleList}
          value={selectedVehicle}
          changeHandler={changeHandler}
        />
      </Col>
    </Row>
  )
}

RegularVehicleSelection.propTypes = {
  vehicleList: arrayOf(shape({
    isMonthlyFixed: bool,
  })),
  changeHandler: func,
  selectedVehicle: string,
}

RegularVehicleSelection.defaultProps = {
  vehicleList: [],
  changeHandler: () => {},
  selectedVehicle: '',
}

export default memo(RegularVehicleSelection)
