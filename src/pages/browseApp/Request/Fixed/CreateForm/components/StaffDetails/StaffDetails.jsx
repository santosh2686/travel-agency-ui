import React, { memo } from 'react'
import {
  arrayOf, bool, func, shape, string,
} from 'prop-types'

import { Panel } from '@base'

import RegularStaffSelection from '../RegularStaffSelection/RegularStaffSelection.jsx'

import CommonStaffDetails from '../../../../common/components/StaffDetails/StaffDetails.jsx'

const StaffDetails = ({
  model,
  errorMap,
  isEdit,
  vehicleList,
  staffName,
  changeHandler,
}) => {
  const { staffType } = model
  if (staffType === 'regular') {
    return (
      <Panel title="Regular staff" classes="mar-b-15 pad-b-10">
        <RegularStaffSelection
          vehicleList={vehicleList}
          staffName={staffName}
        />
      </Panel>
    )
  }

  return (
    <CommonStaffDetails
      model={model}
      errorMap={errorMap}
      isEdit={isEdit}
      changeHandler={changeHandler}
    />
  )
}

StaffDetails.propTypes = {
  model: shape({
    staffType: string,
  }),
  errorMap: shape({
    staffType: string,
  }),
  changeHandler: func,
  isEdit: bool,
  vehicleList: arrayOf(shape({
    _id: string,
  })),
  staffName: string,
}

StaffDetails.defaultProps = {
  changeHandler: () => {},
  model: {},
  errorMap: {},
  isEdit: false,
  vehicleList: [],
  staffName: '',
}

export default memo(StaffDetails)
