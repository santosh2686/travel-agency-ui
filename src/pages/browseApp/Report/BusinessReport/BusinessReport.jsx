/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { func } from 'prop-types'
import { connect } from 'react-redux'

import {
  Button, Currency, Layout, Table,
  SelectBox, Row, Col,
} from '@base'
import { PageHeader, Filter, InfoBox } from '@local'

import { getYearList } from '@utils'
import { getCurrentYear } from '@utils/date'

import { actions } from './businessReport.conf'

class BusinessReport extends Component {
  state = {
    isLoading: false,
    data: [],
    year: getCurrentYear(),
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

  fetchReport = () => {
    const { year } = this.state
    const { getReport } = this.props
    const params = {
      year,
    }

    this.setState({ isLoading: true })

    getReport(params).then((response) => {
      const { data } = response
      this.setState({
        data,
        total: this.calculateTotal(data),
        isLoading: false,
      })
    })
  }

  componentDidMount() {
    this.fetchReport()
  }

  yearChangeHandler = (valueObj) => {
    this.setState(valueObj)
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
      label: 'Business report',
    }]

    const {
      isLoading, data, year, total,
    } = this.state
    const { totalIncome = 0, totalExpense = 0 } = total
    return (
      <>
        <PageHeader
          title="Business report"
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
              name="year"
              options={getYearList()}
              value={year}
              changeHandler={this.yearChangeHandler}
            />
          </Col>
          <Col
            col={{
              xs: 12, sm: 12, md: 2, lg: 2,
            }}
            classes="pad-b-10"
          >
            <Button clickHandler={this.fetchReport}>Search</Button>
          </Col>
        </Filter>
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
    )
  }
}

BusinessReport.propTypes = {
  getReport: func.isRequired,
}

const BusinessReportWithConnect = connect(null, actions)(BusinessReport)

export {
  BusinessReportWithConnect as default,
  BusinessReport,
}
