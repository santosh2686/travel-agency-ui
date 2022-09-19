import React from 'react'
import { shape, string } from 'prop-types'

import { formatDate } from '@utils/date'
import { Panel, Row, Currency } from '@base'
import { DetailViewItem } from '@local'
import constants from '@config/constant'

import TimeMaterialDetail from '../../common/components/TimeMaterialDetail/TimeMaterialDetail.jsx'

import RequestInfo from '../RequestInfo/RequestInfo.jsx'

const DetailView = ({ model }) => {
  const {
    customer = {}, customerDetails = {}, vehicle = {}, vehicleDetails = {},
    package: requestPackage = {}, staff = {}, staffDetails = {},
    otherCharges = {}, advancedPayment = {}, paymentDetails = {}, comment,
    requestTotal, requestExpense, requestProfit, customerBill,
  } = model
  const {
    address = {}, name, email, contact,
  } = customer || customerDetails
  const {
    addressLine1, addressLine2, city, pinCode, state,
  } = address
  const { manufacturer, name: vehicleName, registrationNo } = vehicle || vehicleDetails
  const { ownerName, ownerContact } = vehicleDetails
  const { packageCode } = requestPackage
  const { name: staffName, contact: staffContact } = staff || staffDetails
  const {
    driverAllowance = {}, nightHalt = {}, parking = {}, toll = {},
  } = otherCharges
  const {
    advancedFromCustomer, advancedToCustomer, advancedFromProvidedVehicle, advancedToProvidedVehicle,
  } = advancedPayment
  const { status, paymentDate, paymentMethod } = paymentDetails
  return (
    <>
      <TimeMaterialDetail model={model} />
      <Panel title="Customer details" classes="mar-b-15">
        <Row>
          <DetailViewItem label="Name">
            {name}
          </DetailViewItem>
          {!customer && (
            <DetailViewItem label="Email address">
              {email}
            </DetailViewItem>
          )}
          {customer && (
            <DetailViewItem label="Address">
              {`${addressLine1}, ${addressLine2}, ${city}, ${pinCode}, ${state}`}
            </DetailViewItem>
          )}
          <DetailViewItem label="Contact">
            {contact}
          </DetailViewItem>
        </Row>
      </Panel>
      <Panel title="Vehicle details" classes="mar-b-15">
        <Row>
          <DetailViewItem label="Vehicle">
            {`${manufacturer}, ${vehicleName}, ${registrationNo}`}
          </DetailViewItem>
          {!vehicle && (
            <>
              <DetailViewItem label="Owner name">
                {ownerName}
              </DetailViewItem>
              <DetailViewItem label="Owner contact">
                {ownerContact}
              </DetailViewItem>
            </>
          )}
        </Row>
      </Panel>
      <Panel title="Package details" classes="mar-b-15">
        <Row>
          <DetailViewItem label="Package code">
            {packageCode}
          </DetailViewItem>
        </Row>
      </Panel>
      <Panel title="Staff details" classes="mar-b-15">
        <Row>
          <DetailViewItem label="Name">
            {staffName}
          </DetailViewItem>
          <DetailViewItem label="Contact">
            {staffContact}
          </DetailViewItem>
        </Row>
      </Panel>
      <Panel title="Other charges" classes="mar-b-15">
        <Row>
          <DetailViewItem label="Toll">
            <Currency data={toll.amount} />
          </DetailViewItem>
          <DetailViewItem label="Night halt">
            <Currency data={nightHalt.amount} />
          </DetailViewItem>
          <DetailViewItem label="Parking">
            <Currency data={parking.amount} />
          </DetailViewItem>
        </Row>
        <Row>
          <DetailViewItem label="Driver allowance">
            <Currency data={driverAllowance.amount} />
          </DetailViewItem>
        </Row>
      </Panel>
      <Panel title="Advanced payment" classes="mar-b-15">
        <Row>
          <DetailViewItem label="Advance from customer">
            <Currency data={advancedFromCustomer} />
          </DetailViewItem>
          <DetailViewItem label="Advance to customer">
            <Currency data={advancedToCustomer} />
          </DetailViewItem>
        </Row>
        <Row>
          <DetailViewItem label="Advance from provided vehicle">
            <Currency data={advancedFromProvidedVehicle} />
          </DetailViewItem>
          <DetailViewItem label="Advance to provided vehicle">
            <Currency data={advancedToProvidedVehicle} />
          </DetailViewItem>
        </Row>
      </Panel>
      {status && (
        <Panel title="Payment details" classes="mar-b-15">
          <Row>
            <DetailViewItem label="Status">
              {constants[status]}
            </DetailViewItem>
            {paymentDate && (
              <DetailViewItem label="Date">
                {paymentDate && formatDate(paymentDate, 'DD-MMM-YYYY')}
              </DetailViewItem>
            )}
            {paymentMethod && (
              <DetailViewItem label="Mode">
                {paymentMethod}
              </DetailViewItem>
            )}
          </Row>
        </Panel>
      )}

      <RequestInfo
        requestTotal={requestTotal}
        requestExpense={requestExpense}
        requestProfit={requestProfit}
        customerBill={customerBill}
      />

      <Panel title="Comments" classes="mar-b-15">
        <Row>
          <DetailViewItem>
            {comment}
          </DetailViewItem>
        </Row>
      </Panel>
    </>
  )
}

DetailView.propTypes = {
  model: shape({
    _id: string,
  }),
}

DetailView.defaultProps = {
  model: {},
}

export default DetailView
