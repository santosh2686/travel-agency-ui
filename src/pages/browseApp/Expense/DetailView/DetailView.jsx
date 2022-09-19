import React from 'react'
import { shape, string } from 'prop-types'

import { Panel, Row, Currency } from '@base'
import { DetailViewItem } from '@local'

import { formatDate } from '@utils/date'

const DetailView = ({ model = {} }) => {
  const {
    date, location, amount, vehicleCategory,
    staffCategory, vehicle, staff, comment,
  } = model

  return (
    <>
      <Panel title="Staff detail" classes="mar-b-15">
        <Row>
          <DetailViewItem label="Date">
            {formatDate(date)}
          </DetailViewItem>
          <DetailViewItem label="Payment method">
            cash
          </DetailViewItem>
          <DetailViewItem label="Amount">
            <Currency data={amount} />
          </DetailViewItem>
        </Row>
        <Row>
          <DetailViewItem label="Location">
            {location}
          </DetailViewItem>
          {vehicleCategory && (
            <DetailViewItem label="Vehicle">
              {vehicle.registrationNo}
            </DetailViewItem>
          )}

          {staffCategory && (
            <DetailViewItem label="Staff">
              {staff.name}
            </DetailViewItem>
          )}
        </Row>
        <Row>
          <DetailViewItem label="comment">
            {comment || '-'}
          </DetailViewItem>
        </Row>
      </Panel>
    </>
  )
}

DetailView.propTypes = {
  model: shape({
    name: string,
  }),
}

DetailView.defaultProps = {
  model: {},
}

export default DetailView
