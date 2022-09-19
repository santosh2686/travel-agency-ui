import React, { PureComponent } from 'react'
import {
  bool, func, shape, string,
} from 'prop-types'

import {
  Panel, Row, Col, DatePicker,
} from '@base'

import CustomerSelection from '@local/CustomerSelection/CustomerSelection.jsx'
import PackageSelection from '@local/PackageSelection/PackageSelection.jsx'
import StaffSelection from '@local/StaffSelection/StaffSelection.jsx'

class MonthlyFixedDetails extends PureComponent {
  state = {
    customer: '',
    package: '',
    staff: '',
  }

  componentDidMount() {
    const { isEdit, model, changeHandler } = this.props
    if (isEdit) {
      const { monthlyFixedDetails = {} } = model
      const { customer, package: selectedPackage, staff } = monthlyFixedDetails
      const { _id: customerId } = customer || {}
      const { _id: packageId } = selectedPackage || {}
      const { _id: staffId } = staff || {}
      this.setState({
        customer: customerId,
        package: packageId,
        staff: staffId,
      })
      changeHandler({
        $merge: {
          monthlyFixedDetails,
        },
      })
    }
  }

  changeHandler = (valueObj) => {
    const { changeHandler } = this.props
    changeHandler({
      monthlyFixedDetails: {
        $merge: valueObj,
      },
    })
  }

  customerChangeHandler = (valueObj) => {
    const { customer } = valueObj
    this.setState({ customer })
    this.changeHandler(valueObj)
  }

  packageChangeHandler = (valueObj) => {
    const { package: selectedPackage } = valueObj
    this.setState({ package: selectedPackage })
    this.changeHandler(valueObj)
  }

  staffChangeHandler = (valueObj) => {
    const { staff } = valueObj
    this.setState({ staff })
    this.changeHandler(valueObj)
  }

  render() {
    const {
      model,
      errorMap = {},
    } = this.props
    const { monthlyFixedDetails = {} } = model
    const {
      customerCategory, packageCategory, staffCategory,
      contractStartDate, contractEndDate,
    } = monthlyFixedDetails
    const { customer, package: selectedPackage, staff } = this.state
    return (
      <>
        <Panel title="Monthly fixed customer details" classes="mar-b-15">
          <CustomerSelection
            category={customerCategory}
            value={customer}
            categoryError={errorMap['monthlyFixedDetails.customerCategory']}
            valueError={errorMap['monthlyFixedDetails.customer']}
            changeHandler={this.customerChangeHandler}
          />
        </Panel>
        <Panel title="Monthly fixed package details" classes="mar-b-15">
          <PackageSelection
            category={packageCategory}
            value={selectedPackage}
            categoryError={errorMap['monthlyFixedDetails.packageCategory']}
            valueError={errorMap['monthlyFixedDetails.package']}
            changeHandler={this.packageChangeHandler}
          />
        </Panel>
        <Panel title="Monthly fixed staff details" classes="mar-b-15">
          <StaffSelection
            category={staffCategory}
            value={staff}
            categoryError={errorMap['monthlyFixedDetails.staffCategory']}
            valueError={errorMap['monthlyFixedDetails.staff']}
            changeHandler={this.packageChangeHandler}
          />
        </Panel>
        <Panel title="Monthly fixed contract details" classes="mar-b-15">
          <Row>
            <Col
              col={{
                xs: 12, sm: 12, md: 4, lg: 4,
              }}
              classes="pad-b-15"
            >
              <DatePicker
                label="Contract start date"
                name="contractStartDate"
                selected={contractStartDate}
                placeholder="Select date time"
                required
                invalid={!!errorMap['monthlyFixedDetails.contractStartDate']}
                errorMessage={errorMap['monthlyFixedDetails.contractStartDate']}
                changeHandler={this.changeHandler}
              />
            </Col>
            <Col
              col={{
                xs: 12, sm: 12, md: 4, lg: 4,
              }}
              classes="pad-b-15"
            >
              <DatePicker
                label="Contract end date"
                name="contractEndDate"
                selected={contractEndDate}
                placeholder="Select date time"
                required
                minDate={contractStartDate}
                invalid={!!errorMap['monthlyFixedDetails.contractEndDate']}
                errorMessage={errorMap['monthlyFixedDetails.contractEndDate']}
                changeHandler={this.changeHandler}
              />
            </Col>
          </Row>
        </Panel>
      </>
    )
  }
}

MonthlyFixedDetails.propTypes = {
  changeHandler: func,
  model: shape({
    packageCode: string,
  }),
  errorMap: shape({
    packageCode: string,
  }),
  isEdit: bool,
}

MonthlyFixedDetails.defaultProps = {
  changeHandler: () => {},
  model: {},
  errorMap: {},
  isEdit: false,
}

export default MonthlyFixedDetails
