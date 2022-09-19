import React, { memo } from 'react'
import {
  arrayOf, shape, bool, string,
} from 'prop-types'

import { Text } from '@base'

const RegularStaffSelection = ({
  vehicleList,
  staffName,
}) => {
  if (vehicleList.length === 1) {
    const { monthlyFixedDetails = {} } = vehicleList[0]
    const { staff = {} } = monthlyFixedDetails
    const { name } = staff
    return (
      <Text color="gray">
        {name}
      </Text>
    )
  }

  return (
    <Text color="gray">
      {staffName}
    </Text>
  )
}

RegularStaffSelection.propTypes = {
  vehicleList: arrayOf(shape({
    isMonthlyFixed: bool,
  })),
  staffName: string,
}

RegularStaffSelection.defaultProps = {
  vehicleList: [],
  staffName: '',
}

export default memo(RegularStaffSelection)
