import React from 'react'
import { shape, string } from 'prop-types'

import { Panel, Row } from '@base'
import { DetailViewItem, ActiveIndicator } from '@local'

const DetailView = ({ model = {} }) => {
  const {
    name, address = {}, contact, whatsAppNumber,
    email, isActive, comment,
  } = model
  const {
    addressLine1, addressLine2, city, state, pinCode,
  } = address

  return (
    <>
      <Panel title="Staff detail" classes="mar-b-15">
        <Row>
          <DetailViewItem label="Customer name">
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
