import React from 'react'
import { shape, string } from 'prop-types'

import {
  Anchor, Panel, Row, Col,
} from '@base'
import { DetailViewItem } from '@local'
import { formatDate } from '@utils/date'

const DetailView = ({ model = {} }) => {
  const {
    pickUpLocation, dropOffLocation, pickUpDateTime, comment,
    noOfSeats, hasAc, vehicleType, customerCategory, customer, customerType,
    customerDetails = {},
  } = model
  const { name, contact, email } = customerDetails
  const { _id } = customer || {}

  return (
    <>
      <Panel title="Bookings details" classes="mar-b-15">
        <Row>
          <DetailViewItem label="Customer type">
            {customerType}
          </DetailViewItem>
          <DetailViewItem label="Pick up location">
            {pickUpLocation}
          </DetailViewItem>
          <DetailViewItem label="Drop off location">
            {dropOffLocation}
          </DetailViewItem>
        </Row>
        <Row>
          <DetailViewItem label="Pickup date and time">
            {formatDate(pickUpDateTime, 'DD-MM-YYYY, hh:mm A')}
          </DetailViewItem>
          <DetailViewItem label="Vehicle type">
            {vehicleType.name}
          </DetailViewItem>
          <Col
            col={{
              xs: 12, sm: 12, md: 4, lg: 4,
            }}
            classes="pad-b-15"
          >
            <Row>
              <DetailViewItem label="No. of seats">
                {noOfSeats}
              </DetailViewItem>
              <DetailViewItem label="AC">
                {hasAc ? 'Yes' : 'No'}
              </DetailViewItem>
            </Row>
          </Col>
        </Row>
      </Panel>
      <Panel title="Customer details" classes="mar-b-15">
        {customerType === 'existing' && (
          <DetailViewItem label="Existing customer">
            <Anchor asLink href={`/customer/${customerCategory}/${_id}/detail`}>
              {customer.name}
            </Anchor>
          </DetailViewItem>
        )}
        {customerType === 'new' && (
          <Row>
            <DetailViewItem label="Name">
              {name}
            </DetailViewItem>
            <DetailViewItem label="Contact">
              {contact}
            </DetailViewItem>
            <DetailViewItem label="Email address">
              {email}
            </DetailViewItem>
          </Row>
        )}
      </Panel>
      <Panel title="comments" classes="mar-b-15">
        {comment}
      </Panel>
    </>
  )
}

DetailView.propTypes = {
  model: shape({
    pickUpLocation: string,
  }),
}

DetailView.defaultProps = {
  model: {},
}

export default DetailView
