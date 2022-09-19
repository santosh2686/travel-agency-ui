import React, { Component } from 'react'
import {
  arrayOf, bool, func, shape, string,
} from 'prop-types'

import { connect } from 'react-redux'

import VehicleDetails from '../VehicleDetails/VehicleDetails.jsx'
import StaffDetails from '../StaffDetails/StaffDetails.jsx'

import { mapStateToProps } from './regularVehicleStaffDetails.conf'

class RegularVehicleStaffDetails extends Component {
  state = {
    staffName: '',
    selectedVehicle: '',
  }

  componentDidMount() {
    const { isEdit, model } = this.props
    const { vehicle } = model
    const { _id: vehicleId } = vehicle || {}

    if (isEdit) {
      this.setState({
        selectedVehicle: vehicleId,
      })
    }
  }

  componentDidUpdate() {
    const { regularVehicleStaffDetails, changeHandler, model } = this.props
    const { vehicleType } = model
    const { data: vehicleList = [] } = regularVehicleStaffDetails
    if (vehicleList.length === 1 && vehicleType === 'regular') {
      const { monthlyFixedDetails = {}, _id, category } = vehicleList[0]
      const { staff, staffCategory } = monthlyFixedDetails
      const { _id: staffId } = staff
      changeHandler({
        $merge: {
          regularVehicle: _id,
          vehicle: _id,
          vehicleCategory: category,
          staff: staffId,
          staffCategory,
        },
      })
    }
  }

  vehicleSelectionHandler = ({ regularVehicle }) => {
    const { regularVehicleStaffDetails, changeHandler } = this.props
    const { data: vehicleList } = regularVehicleStaffDetails
    const { monthlyFixedDetails = {}, _id, category } = vehicleList.filter(({ _id }) => regularVehicle === _id)[0]
    const { staff, staffCategory } = monthlyFixedDetails
    const { name, _id: staffId } = staff

    this.setState({
      staffName: name,
      selectedVehicle: _id,
    })
    changeHandler({
      $merge: {
        regularVehicle,
        vehicle: _id,
        vehicleCategory: category,
        staff: staffId,
        staffCategory,
      },
    })
  }

  render() {
    const { staffName, selectedVehicle } = this.state
    const {
      model, errorMap, isEdit, regularVehicleStaffDetails, changeHandler,
    } = this.props
    const { customer } = model
    const { data: vehicleList } = regularVehicleStaffDetails
    if (!customer) {
      return null
    }

    return (
      <>
        <VehicleDetails
          model={model}
          errorMap={errorMap}
          isEdit={isEdit}
          changeHandler={changeHandler}
          vehicleSelectionHandler={this.vehicleSelectionHandler}
          vehicleList={vehicleList}
          selectedVehicle={selectedVehicle}
        />
        <StaffDetails
          model={model}
          errorMap={errorMap}
          isEdit={isEdit}
          vehicleList={vehicleList}
          staffName={staffName}
          changeHandler={changeHandler}
        />
      </>
    )
  }
}

RegularVehicleStaffDetails.propTypes = {
  model: shape({
    staffType: string,
  }),
  errorMap: shape({
    staffType: string,
  }),
  isEdit: bool,
  regularVehicleStaffDetails: shape({
    data: arrayOf(shape({
      _id: string,
    })),
  }),
  changeHandler: func,
}

RegularVehicleStaffDetails.defaultProps = {
  model: {},
  errorMap: {},
  isEdit: false,
  regularVehicleStaffDetails: {},
  changeHandler: () => {},
}

const RegularVehicleStaffDetailsWithConnect = connect(mapStateToProps)(RegularVehicleStaffDetails)

export {
  RegularVehicleStaffDetailsWithConnect as default,
  RegularVehicleStaffDetails,
}
