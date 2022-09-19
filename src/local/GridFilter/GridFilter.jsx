import React, { memo } from 'react'
import {
  bool, node, arrayOf, string, shape, func,
} from 'prop-types'

import { Row, Col, Layout } from '@base'

import GridExport from '../GridExport/GridExport.jsx'

const GridFilter = ({
  children, withExport, columns, pdfName, exportConfig,
}) => (
  <Layout
    bgColor="white"
    classes="bg-white mar-b-10 pad-l-10 pad-t-10 pad-r-10"
  >
    <Row>
      <Col col={{
        xs: 12, sm: 12, md: 10, lg: 8,
      }}
      >
        {children}
      </Col>
      <Col
        col={{
          xs: 12, sm: 12, md: 2, lg: 4,
        }}
        classes="text-right"
      >
        {withExport && (
          <GridExport
            columns={columns}
            exportConfig={exportConfig}
            pdfName={pdfName}
          />
        )}
      </Col>
    </Row>
  </Layout>
)

GridFilter.propTypes = {
  children: node,
  columns: arrayOf(string),
  pdfName: string,
  withExport: bool,
  exportConfig: shape({
    fetchHandler: func,
  }),
}

GridFilter.defaultProps = {
  children: '',
  columns: [],
  pdfName: 'table',
  withExport: false,
  exportConfig: {},
}

export default memo(GridFilter)
