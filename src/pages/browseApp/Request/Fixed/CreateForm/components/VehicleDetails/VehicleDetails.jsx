import React, { memo } from 'react'
import {
  arrayOf, bool, func, shape, string,
} from 'prop-types'

import { Panel } from '@base'

import RegularVehicleSelection from '../RegularVehicleSelection/RegularVehicleSelection.jsx'

import CommonVehicleDetails from '../../../../common/components/VehicleDetails/VehicleDetails.jsx'

const VehicleDetails = ({
  model,
  errorMap,
  isEdit,
  vehicleList,
  vehicleSelectionHandler,
  selectedVehicle,
  changeHandler,
}) => {
  const { vehicleType } = model
  if (vehicleType === 'regular') {
    return (
      <Panel title="Regular vehicle" classes="mar-b-15 pad-b-10">
        <RegularVehicleSelection
          vehicleList={vehicleList}
          changeHandler={vehicleSelectionHandler}
          regularVehicleUpdateHandler={changeHandler}
          selectedVehicle={selectedVehicle}
        />
      </Panel>
    )
  }

  return (
    <CommonVehicleDetails
      model={model}
      errorMap={errorMap}
      isEdit={isEdit}
      changeHandler={changeHandler}
    />
  )
}

VehicleDetails.propTypes = {
  model: shape({
    packageCode: string,
  }),
  errorMap: shape({
    packageCode: string,
  }),
  changeHandler: func,
  vehicleSelectionHandler: func,
  isEdit: bool,
  vehicleList: arrayOf(shape({
    _id: string,
  })),
  selectedVehicle: string,
}

VehicleDetails.defaultProps = {
  changeHandler: () => {},
  vehicleSelectionHandler: () => {},
  model: {},
  errorMap: {},
  isEdit: false,
  vehicleList: [],
  selectedVehicle: '',
}

export default memo(VehicleDetails)
