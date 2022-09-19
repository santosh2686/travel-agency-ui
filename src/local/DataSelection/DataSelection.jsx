import React, { memo } from 'react'
import {
  bool, func, arrayOf, shape, string,
} from 'prop-types'

import { Col, Row, SelectBox } from '@base'

const DataSelection = ({
  type,
  dataValueMap,
  categorySelected,
  valueSelected,
  categoryError,
  valueError,
  isLoading,
  categoryList,
  dataList,
  categorySelectHandler,
  dataSelectHandler,
}) => (
  <Row>
    <Col
      col={{
        xs: 12, sm: 12, md: 4, lg: 4,
      }}
      classes="pad-b-15"
    >
      <SelectBox
        label={`${type} category`}
        name="category"
        options={categoryList}
        value={categorySelected || ''}
        keyMap="_id"
        valueMap="name"
        required
        invalid={!!categoryError}
        errorMessage={categoryError}
        changeHandler={categorySelectHandler}
      />
    </Col>
    <Col
      col={{
        xs: 12, sm: 12, md: 4, lg: 4,
      }}
      classes="pad-b-15"
    >
      <SelectBox
        label={type}
        name="data"
        options={dataList}
        value={valueSelected || ''}
        keyMap="_id"
        valueMap={dataValueMap}
        required
        isLoading={isLoading}
        invalid={!!valueError}
        errorMessage={valueError}
        disabled={!categorySelected}
        changeHandler={dataSelectHandler}
      />
    </Col>
  </Row>
)

DataSelection.propTypes = {
  type: string.isRequired,
  dataValueMap: string.isRequired,
  categorySelected: string,
  valueSelected: string,
  categoryError: string,
  valueError: string,
  isLoading: bool,
  categoryList: arrayOf(shape({
    name: string,
  })),
  dataList: arrayOf(shape({
    _id: string,
  })),
  categorySelectHandler: func.isRequired,
  dataSelectHandler: func.isRequired,
}

DataSelection.defaultProps = {
  categoryList: [],
  dataList: [],
  categorySelected: '',
  valueSelected: '',
  categoryError: '',
  valueError: '',
  isLoading: false,
}

export default memo(DataSelection)
