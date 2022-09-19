import React from 'react'
import { shape, string } from 'prop-types'

import { Panel, Row, Currency } from '@base'

import { DetailViewItem, ActiveIndicator } from '@local'

const DetailView = ({ model }) => {
  const {
    packageCode, baseAmount, minimumKm, extraKmPerKmRate,
    minimumHr, extraHrPerHrRate, isActive, comment,
  } = model
  return (
    <>
      <Panel title="Package details" classes="mar-b-15">
        <Row>
          <DetailViewItem label="Package code">
            {packageCode}
          </DetailViewItem>
          <DetailViewItem label="Minimum KM">
            {minimumKm}
          </DetailViewItem>
          <DetailViewItem label="Minimum HR">
            {minimumHr}
          </DetailViewItem>
        </Row>
        <Row>
          <DetailViewItem label="Basic amount">
            <Currency data={baseAmount} />
          </DetailViewItem>
          <DetailViewItem label="Extra KM rate">
            <Currency data={extraKmPerKmRate} />
          </DetailViewItem>
          <DetailViewItem label="Extra HR rate">
            <Currency data={extraHrPerHrRate} />
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
    packageCode: string,
  }),
}

DetailView.defaultProps = {
  model: {},
}

export default DetailView
