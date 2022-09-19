import React from 'react'
import { shape, string } from 'prop-types'

import {
  Panel, Row, Currency,
} from '@base'
import { DetailViewItem } from '@local'
import { formatDate } from '@utils/date'

const DetailView = ({ model = {} }) => {
  const {
    staff = {}, paymentMethod = {},
    amount, paymentDate, comment,
  } = model

  return (
    <>
      <Panel title="Staff details" classes="mar-b-15">
        <Row>
          <DetailViewItem label="Staff name">
            {staff.name}
          </DetailViewItem>
        </Row>
      </Panel>
      <Panel title="Payment details" classes="mar-b-15">
        <Row>
          <DetailViewItem label="Payment date">
            {formatDate(paymentDate)}
          </DetailViewItem>
          <DetailViewItem label="Amount">
            <Currency data={amount} />
          </DetailViewItem>
          <DetailViewItem label="Payment method">
            {paymentMethod.name}
          </DetailViewItem>
        </Row>
      </Panel>
      <Panel title="comments" classes="mar-b-15 pad-b-10">
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
