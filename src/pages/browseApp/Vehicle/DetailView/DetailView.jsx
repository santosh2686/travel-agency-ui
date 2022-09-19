/* eslint-disable no-unused-vars */
import React from 'react'
import { shape, string } from 'prop-types'

import { Panel, Row } from '@base'
import { formatDate } from '@utils/date'
import { DetailViewItem, ActiveIndicator } from '@local'

const DetailView = ({ model }) => {
  const {
    type = {}, manufacturer, name, registrationNo,
    noOfSeats, hasAc, isMonthlyFixed, comment, isActive,
    monthlyFixedDetails = {},
  } = model
  const {
    customer = {}, package: packageDetails = {}, staff = {},
    contractStartDate, contractEndDate,
  } = monthlyFixedDetails
  const { name: customerName, contact } = customer
  const { packageCode } = packageDetails
  const { name: staffName } = staff
  const { name: vehicleType } = type
  return (
    <>
      <Panel title="Vehicle details" classes="mar-b-15">
        <Row>
          <DetailViewItem label="Vehicle type">
            {vehicleType}
          </DetailViewItem>
          <DetailViewItem label="Manufacturer">
            {manufacturer}
          </DetailViewItem>
          <DetailViewItem label="Name">
            {name}
          </DetailViewItem>
        </Row>
        <Row>
          <DetailViewItem label="Vehicle Registration no">
            {registrationNo}
          </DetailViewItem>
          <DetailViewItem label="No. of seats">
            {noOfSeats}
          </DetailViewItem>
          <DetailViewItem label="AC">
            {hasAc ? 'Yes' : 'No'}
          </DetailViewItem>
        </Row>
        <Row>
          <DetailViewItem label="Monthly fixed">
            {isMonthlyFixed ? 'Yes' : 'No'}
          </DetailViewItem>
          <DetailViewItem label="Is active">
            <ActiveIndicator isActive={isActive} />
          </DetailViewItem>
          <DetailViewItem label="comment">
            {comment || '-'}
          </DetailViewItem>
        </Row>
      </Panel>
      {isMonthlyFixed && (
        <>
          <Panel title="Monthly fixed customer details" classes="mar-b-15">
            <Row>
              <DetailViewItem label="Name">
                {customerName}
              </DetailViewItem>
              <DetailViewItem label="Contact">
                {contact}
              </DetailViewItem>
            </Row>
          </Panel>
          <Panel title="Monthly fixed package details" classes="mar-b-15">
            <Row>
              <DetailViewItem label="Package code">
                {packageCode}
              </DetailViewItem>
            </Row>
          </Panel>
          <Panel title="Monthly fixed staff details" classes="mar-b-15">
            <Row>
              <DetailViewItem label="Name">
                {staffName}
              </DetailViewItem>
            </Row>
          </Panel>
          <Panel title="Monthly fixed contract details" classes="mar-b-15">
            <Row>
              <DetailViewItem label="Start date">
                {formatDate(contractStartDate, 'DD-MMM-YYYY')}
              </DetailViewItem>
              <DetailViewItem label="End date">
                {formatDate(contractEndDate, 'DD-MMM-YYYY')}
              </DetailViewItem>
            </Row>
          </Panel>
        </>
      )}
    </>
  )
}

DetailView.propTypes = {
  model: shape({
    packageCode: string,
  }),
}

DetailView.defaultProps = {
  model: {},
}

export default DetailView
