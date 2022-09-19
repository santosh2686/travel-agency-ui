import React from 'react'
import { shape, string } from 'prop-types'

import { numberToTime } from '@utils'
import { formatDate } from '@utils/date'
import { Panel, Row } from '@base'
import { DetailViewItem } from '@local'

const TimeMaterialDetail = ({ model }) => {
  const {
    requestNo, requestType = {}, pickUpLocation, dropOffLocation,
    pickUpDateTime, dropDateTime, totalHr, openingKm, closingKm, totalKm,
  } = model
  const { name: requestTypeName } = requestType
  return (
    <Panel title={`Request details  - ${requestNo}`} classes="mar-b-15">
      <Row>
        <DetailViewItem label="Request type">
          {requestTypeName}
        </DetailViewItem>
        <DetailViewItem label="Pickup location">
          {pickUpLocation}
        </DetailViewItem>
        <DetailViewItem label="Drop location">
          {dropOffLocation}
        </DetailViewItem>
      </Row>
      <Row>
        <DetailViewItem label="Pick up date-time">
          {formatDate(pickUpDateTime, 'DD-MMM-YYYY, hh:mm A')}
        </DetailViewItem>
        <DetailViewItem label="Drop off date-time">
          {formatDate(dropDateTime, 'DD-MMM-YYYY, hh:mm A')}
        </DetailViewItem>
        <DetailViewItem label="Total time">
          {numberToTime(totalHr)}
        </DetailViewItem>
      </Row>
      <Row>
        <DetailViewItem label="Opening KM">
          {openingKm}
        </DetailViewItem>
        <DetailViewItem label="Closing KM">
          {closingKm}
        </DetailViewItem>
        <DetailViewItem label="Total kilometers">
          {totalKm}
        </DetailViewItem>
      </Row>
    </Panel>
  )
}

TimeMaterialDetail.propTypes = {
  model: shape({
    _id: string,
  }),
}

TimeMaterialDetail.defaultProps = {
  model: {},
}

export default TimeMaterialDetail
