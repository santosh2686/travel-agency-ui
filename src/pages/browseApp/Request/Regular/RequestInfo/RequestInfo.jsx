import React from 'react'
import { number } from 'prop-types'

import { Row, Col } from '@base'
import { InfoBox } from '@local'

const RequestInfo = ({
  requestTotal, requestExpense, requestProfit, customerBill,
}) => (
  <Row>
    <Col
      col={{
        xs: 12, sm: 12, md: 6, lg: 3,
      }}
      classes="pad-b-15"
    >
      <InfoBox
        iconName="paper-plane"
        label="Request total"
        value={requestTotal}
        isCurrency
      />
    </Col>
    <Col
      col={{
        xs: 12, sm: 12, md: 6, lg: 3,
      }}
      classes="pad-b-15"
    >
      <InfoBox
        iconName="credit-card"
        label="Other charges"
        value={requestExpense}
        isCurrency
      />
    </Col>
    <Col
      col={{
        xs: 12, sm: 12, md: 6, lg: 3,
      }}
      classes="pad-b-15"
    >
      <InfoBox
        iconName="line-chart"
        label="Request profit"
        value={requestProfit}
        isCurrency
      />
    </Col>
    <Col
      col={{
        xs: 12, sm: 12, md: 6, lg: 3,
      }}
      classes="pad-b-15"
    >
      <InfoBox
        iconName="money"
        label="Customer bill"
        value={customerBill}
        isCurrency
      />
    </Col>
  </Row>
)

RequestInfo.propTypes = {
  requestTotal: number,
  requestExpense: number,
  requestProfit: number,
  customerBill: number,
}

RequestInfo.defaultProps = {
  requestTotal: 0,
  requestExpense: 0,
  requestProfit: 0,
  customerBill: 0,
}

export default RequestInfo
