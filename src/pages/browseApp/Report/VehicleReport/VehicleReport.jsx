/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { func } from 'prop-types'
import { connect } from 'react-redux'
import update from 'immutability-helper'

import {
  Currency, Layout, Table,
  Row, Col, Alert,
} from '@base'
import {
  PageHeader, InfoBox, GridFilter, FilterByVehicle,
} from '@local'

import { getCurrentYear } from '@utils/date'

import { actions } from './vehicleReport.conf'

class VehicleReport extends Component {
  state = {
    isLoading: false,
    filteredApplied: false,
    data: [],
    filterData: {
      vehicleCategory: '',
      vehicle: '',
      year: getCurrentYear(),
    },
    total: {},
  }

  calculateTotal = (data) => data.reduce((acc, next) => {
    const { income = 0, expense = 0 } = next
    acc.totalIncome += income
    acc.totalExpense += expense
    return acc
  }, {
    totalIncome: 0,
    totalExpense: 0,
  })

  fetchVehicleReport = () => {
    const { filterData } = this.state
    const { getVehicleReport } = this.props

    const params = {
      filterData,
    }

    this.setState({ isLoading: true })

    getVehicleReport(params).then((response) => {
      const { data } = response
      this.setState({
        data,
        total: this.calculateTotal(data),
        isLoading: false,
        filteredApplied: true,
      })
    })
  }

  changeHandler = (valueObj) => {
    this.setState((prevState) => update(prevState, {
      filterData: {
        $merge: valueObj,
      },
    }))
  }

  searchHandler = () => {
    this.fetchVehicleReport()
  }

  clearHandler = () => {
    this.setState((prevState) => update(prevState, {
      filteredApplied: {
        $set: false,
      },
      filterData: {
        $merge: {
          vehicleCategory: '',
          vehicle: '',
          year: getCurrentYear(),
        },
      },
    }))
  }

  render() {
    const amountCellClass = 'text-right'

    const columns = [
      {
        label: 'Month',
        custom: ({ month, year }) => (
          <span>
            {`${month} - ${year}`}
          </span>
        ),
      },
      {
        label: 'Income',
        classes: amountCellClass,
        custom: ({ income = 0 }) => (
          <Currency data={income} />
        ),
      },
      {
        label: 'Expense',
        classes: amountCellClass,
        custom: ({ expense = 0 }) => (
          <Currency data={expense} />
        ),
      },
      {
        label: 'Profit',
        classes: amountCellClass,
        custom: ({ income = 0, expense = 0 }) => (
          <Currency data={income - expense} />
        ),
      },
    ]
    const breadCrumbData = [{
      label: 'Home',
      route: '/dashboard',
    },
    {
      label: 'Vehicle report',
    }]
    const {
      isLoading, data, filterData, total, filteredApplied,
    } = this.state
    const { totalIncome = 0, totalExpense = 0 } = total
    return (
      <>
        <PageHeader
          title="Vehicle report"
          withBreadCrumb
          breadCrumbData={breadCrumbData}
        />
        <GridFilter>
          <FilterByVehicle
            changeHandler={this.changeHandler}
            searchHandler={this.searchHandler}
            clearHandler={this.clearHandler}
            filterData={filterData}
            withYear
          />
        </GridFilter>
        {!filteredApplied && (
          <Alert type="info" message="Please select the vehicle." />
        )}
        {filteredApplied && (
          <>
            <Row>
              <Col
                col={{
                  xs: 12, sm: 12, md: 4, lg: 4,
                }}
                classes="pad-b-15"
              >
                <InfoBox
                  iconName="line-chart"
                  label="Total income"
                  value={totalIncome}
                  isCurrency
                />
              </Col>
              <Col
                col={{
                  xs: 12, sm: 12, md: 4, lg: 4,
                }}
                classes="pad-b-15"
              >
                <InfoBox
                  iconName="database"
                  label="Total expense"
                  value={totalExpense}
                  isCurrency
                />
              </Col>
              <Col
                col={{
                  xs: 12, sm: 12, md: 4, lg: 4,
                }}
                classes="pad-b-15"
              >
                <InfoBox
                  iconName="money"
                  label="Total profit"
                  value={totalIncome - totalExpense}
                  isCurrency
                />
              </Col>
            </Row>
            <Layout bgColor="white" classes="flex-1 overflow-auto">
              <Table
                columns={columns}
                data={data}
                isLoading={isLoading}
                classes="table-hover"
              />
            </Layout>
          </>
        )}
      </>
    )
  }
}

VehicleReport.propTypes = {
  getVehicleReport: func.isRequired,
}

const VehicleReportWithConnect = connect(null, actions)(VehicleReport)

export {
  VehicleReportWithConnect as default,
  VehicleReport,
}
