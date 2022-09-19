import React from 'react'
import { shape, string } from 'prop-types'

import { Panel, Row, Currency } from '@base'
import { DetailViewItem } from '@local'

import TimeMaterialDetail from '../../common/components/TimeMaterialDetail/TimeMaterialDetail.jsx'

const DetailView = ({ model }) => {
  const {
    customer = {}, vehicle = {}, vehicleDetails = {}, staff = {}, staffDetails = {},
    packageFromProvidedVehicle = {}, otherCharges = {}, advancedPayment = {}, comment,
  } = model
  const { name, contact, address = {} } = customer
  const {
    addressLine1, addressLine2, city, pinCode, state,
  } = address
  const { manufacturer, name: vehicleName, registrationNo } = vehicle || vehicleDetails
  const { ownerName, ownerContact } = vehicleDetails
  const { name: staffName, contact: staffContact } = staff || staffDetails
  const {
    driverAllowance = {}, nightHalt = {}, parking = {}, toll = {},
  } = otherCharges
  const {
    advancedFromCustomer, advancedToCustomer, advancedFromProvidedVehicle, advancedToProvidedVehicle,
  } = advancedPayment
  const { package: providedVehiclePackage = {} } = packageFromProvidedVehicle
  const { packageCode } = providedVehiclePackage
  return (
    <>
      <Panel title="Customer details" classes="mar-b-15">
        <Row>
          <DetailViewItem label="Name">
            {name}
          </DetailViewItem>
          <DetailViewItem label="Contact">
            {contact}
          </DetailViewItem>
          <DetailViewItem label="Address">
            {`${addressLine1}, ${addressLine2}, ${city}, ${state}, ${pinCode}`}
          </DetailViewItem>
        </Row>
      </Panel>
      <TimeMaterialDetail model={model} />
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
      {packageCode && (
        <Panel title="Package from provided vehicle details" classes="mar-b-15">
          <Row>
            <DetailViewItem label="Package">
              {packageCode}
            </DetailViewItem>
          </Row>
        </Panel>
      )}
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
