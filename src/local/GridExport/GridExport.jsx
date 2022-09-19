import React, { PureComponent } from 'react'
import {
  arrayOf, func, shape, string,
} from 'prop-types'

import JsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

import { Button, Icon } from '@base'

class GridExport extends PureComponent {
  onExport = () => {
    const { exportConfig } = this.props
    const {
      fetchHandler, query,
    } = exportConfig
    fetchHandler(query)
    const { columns, rows, pdfName } = this.props
    const doc = new JsPDF()
    autoTable(doc, {
      head: [columns],
      body: [
        rows,
      ],
    })
    doc.save(`${pdfName}.pdf`)
  }

  render() {
    return (
      <Button
        category="success"
        clickHandler={this.onExport}
      >
        <Icon name="file-pdf-o" color="white" />
      </Button>
    )
  }
}

GridExport.propTypes = {
  columns: arrayOf(string),
  rows: arrayOf(arrayOf(string)),
  pdfName: string,
  exportConfig: shape({
    fetchHandler: func,
  }),
}

GridExport.defaultProps = {
  columns: [],
  rows: [],
  pdfName: 'table',
  exportConfig: {},
}

export default GridExport
