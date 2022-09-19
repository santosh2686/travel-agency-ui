import React from 'react'
import { shape, string } from 'prop-types'

import { Panel, Row, Currency } from '@base'
import { DetailViewItem, ActiveIndicator } from '@local'

import { formatDate } from '@utils/date'

const DetailView = ({ model = {} }) => {
  const {
    name, address = {}, contact, whatsAppNumber,
    email, joiningDate, salary, license, isActive, comment,
  } = model
  const {
    addressLine1, addressLine2, city, state, pinCode,
  } = address

  return (
    <>
      <Panel title="Staff detail" classes="mar-b-15">
        <Row>
          <DetailViewItem label="Staff name">
            {name}
          </DetailViewItem>
          <DetailViewItem label="Contact">
            {contact}
          </DetailViewItem>
          <DetailViewItem label="Whats app number">
            {whatsAppNumber}
          </DetailViewItem>
        </Row>
        <Row>
          <DetailViewItem label="Email address">
            {email}
          </DetailViewItem>
          <DetailViewItem label="Joining date">
            {formatDate(joiningDate)}
          </DetailViewItem>
          <DetailViewItem label="Licence">
            {license}
          </DetailViewItem>
        </Row>
        <Row>
          <DetailViewItem label="Salary">
            <Currency data={salary} />
          </DetailViewItem>
          <DetailViewItem label="Address">
            {`${addressLine1}, ${addressLine2}, ${city}, ${state}, ${pinCode}`}
          </DetailViewItem>
        </Row>
        <Row>
          <DetailViewItem label="Is active">
            <ActiveIndicator isActive={isActive} />
          </DetailViewItem>
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
