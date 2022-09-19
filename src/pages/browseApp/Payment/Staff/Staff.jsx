import React, { PureComponent } from 'react'
import { func } from 'prop-types'
import { connect } from 'react-redux'

import axios from 'axios'

import {
  Anchor, Button, SelectBox, Col, Currency, Layout, Table,
} from '@base'
import { PageHeader, Filter } from '@local'
import { getYearList, getMonthListMap } from '@utils'
import { getCurrentYear, getCurrentMonth } from '@utils/date'

import { actions } from './staff.conf.js'

class StaffPayment extends PureComponent {
  state = {
    isLoading: false,
    year: getCurrentYear(),
    month: getCurrentMonth(),
    data: [],
  }

  calculatePaymentDetails = (staff = [], staffAccount = []) => staff.reduce((acc, next) => {
    const {
      _id: staffId,
      category: {
        _id: categoryId,
      },
    } = next
    const {
      advancePayment,
      totalNightHalt = 0,
      totalDriverAllowance = 0,
    } = staffAccount.filter(({ staff, staffCategory }) => staff === staffId && categoryId === staffCategory)[0] || {}
    const item = {
      ...next,
      advancePayment,
      totalNightHalt,
      totalDriverAllowance,
    }
    acc.push(item)
    return acc
  }, [])

  getStaffDetails = () => {
    const { year, month } = this.state
    this.setState({ isLoading: true })
    const { getAllStaff, getStaffAccount } = this.props
    const staffAccountRequestBody = {
      filterData: {
        year,
        month,
      },
    }

    const staffDetails = getAllStaff()
    const staffAccount = getStaffAccount(staffAccountRequestBody)
    axios.all([staffDetails, staffAccount]).then(axios.spread((staff, staffAccount) => {
      this.setState({
        isLoading: false,
        data: this.calculatePaymentDetails(staff.data, staffAccount.data),
      })
    }))
  }

  componentDidMount() {
    this.getStaffDetails()
  }

  changeHandler = (valueObj) => {
    this.setState(valueObj)
  }

  render() {
    const {
      year, month, data, isLoading,
    } = this.state

    const amountClass = 'text-right'

    const breadCrumbData = [{
      label: 'Home',
      route: '/dashboard',
    },
    {
      label: 'Staff payment',
    }]

    const columns = [{
      label: 'Staff category',
      map: 'category.name',
      classes: 'capitalize',
    }, {
      label: 'Staff',
      custom: ({
        _id,
        name,
        category: { _id: staffCategory },
      }) => (
        <Anchor asLink href={`/staff/${staffCategory}/${_id}/detail`}>
          {name}
        </Anchor>
      ),
    }, {
      label: 'Base Salary',
      classes: amountClass,
      custom: ({ salary }) => (
        <Currency data={salary} />
      ),
    }, {
      label: 'Other changes',
      classes: amountClass,
      custom: ({
        totalNightHalt, totalDriverAllowance,
      }) => {
        const totalOtherCharges = totalNightHalt + totalDriverAllowance
        return (
          <Currency data={totalOtherCharges} />
        )
      },
    }, {
      label: 'Advanced payment',
      classes: amountClass,
      custom: ({ advancePayment }) => (
        <Currency data={advancePayment} />
      ),
    }, {
      label: 'Final payout',
      classes: amountClass,
      custom: ({
        salary, advancePayment, totalNightHalt, totalDriverAllowance,
      }) => {
        const finalPayout = (salary + totalNightHalt + totalDriverAllowance) - advancePayment
        return (
          <Currency data={finalPayout} />
        )
      },
    }]

    return (
      <>
        <PageHeader
          title="Staff payment"
          withBreadCrumb
          breadCrumbData={breadCrumbData}
        />
        <Filter>
          <Col
            col={{
              xs: 12, sm: 12, md: 2, lg: 2,
            }}
            classes="pad-b-10"
          >
            <SelectBox
              name="month"
              options={getMonthListMap()}
              value={month}
              changeHandler={this.changeHandler}
            />
          </Col>
          <Col
            col={{
              xs: 12, sm: 12, md: 2, lg: 2,
            }}
            classes="pad-b-10"
          >
            <SelectBox
              name="year"
              options={getYearList()}
              value={year}
              changeHandler={this.changeHandler}
            />
          </Col>
          <Col
            col={{
              xs: 12, sm: 12, md: 2, lg: 2,
            }}
            classes="pad-b-10"
          >
            <Button clickHandler={this.getVehiclePayment}>Search</Button>
          </Col>
        </Filter>
        <Layout bgColor="white" classes="flex-1 overflow-auto">
          <Table
            columns={columns}
            data={data}
            isLoading={isLoading}
            classes="table-hover"
          />
        </Layout>
      </>
    )
  }
}

StaffPayment.propTypes = {
  getAllStaff: func.isRequired,
  getStaffAccount: func.isRequired,
}

StaffPayment.defaultProps = {}

const StaffPaymentWithConnect = connect(null, actions)(StaffPayment)

export {
  StaffPaymentWithConnect as default,
  StaffPayment,
}
