import React, { Component, cloneElement } from 'react'
import {
  arrayOf, bool, func, number, shape, string, node,
} from 'prop-types'

import update from 'immutability-helper'

import {
  Table, Layout, Modal, Pagination,
} from '@base'

import GridFilter from '@local/GridFilter/GridFilter.jsx'

import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation.jsx'
import GridAction from '../GridAction/GridAction.jsx'

class Grid extends Component {
  state = {
    isLoading: true,
    isFilteredApplied: false,
    showDeleteConfirmation: false,
    idToBeDeleted: '',
    filterData: {},
  }

  fetchData = (page = 1) => {
    this.setState({ isLoading: true })
    const {
      queryParams, withPagination, fetchHandler,
    } = this.props
    const requestBody = {
      filterData: queryParams,
    }

    if (withPagination) {
      requestBody.page = page
    }

    fetchHandler(requestBody).then(() => {
      this.setState({ isLoading: false })
    })
  }

  fetchFilteredData = () => {
    this.setState({ isLoading: true })
    const { filterData } = this.state
    const {
      queryParams, withPagination, withFilter,
      fetchHandler,
    } = this.props
    let requestBody = {
      filterData: queryParams,
    }

    if (withFilter) {
      requestBody = update(requestBody, {
        filterData: {
          $merge: filterData,
        },
      })
    }

    if (withPagination) {
      requestBody.page = 1
    }

    fetchHandler(requestBody).then(() => {
      this.setState({ isLoading: false, isFilteredApplied: true })
    })
  }

  componentDidMount() {
    this.fetchData()
  }

  filterChangeHandler = (valueObj) => {
    this.setState((prevState) => update(prevState, {
      filterData: {
        $merge: valueObj,
      },
    }))
  }

  filterSearchHandler = () => {
    this.fetchFilteredData()
  }

  filterClearHandler = () => {
    this.setState({
      filterData: {},
    }, () => {
      this.setState({ isFilteredApplied: false })
      this.fetchData()
    })
  }

  deleteHandler = (id) => {
    this.setState({
      showDeleteConfirmation: true,
      idToBeDeleted: id,
    })
  }

  modalCloseHandler = () => {
    this.setState({
      showDeleteConfirmation: false,
    })
  };

  pageChangeHandler = (page) => {
    this.fetchData(page)
  }

  deleteSuccessHandler = () => {
    const { withPagination } = this.props
    if (withPagination) {
      this.fetchData()
    }
  }

  render() {
    const {
      isLoading, showDeleteConfirmation, idToBeDeleted,
      filterData, isFilteredApplied,
    } = this.state
    const {
      columns, data, routeParams, editRoute, children, deleteHandler,
      currentPage, totalPages, withPagination, withFilter, fetchHandler,
      queryParams,
    } = this.props
    const { category } = routeParams
    const columnsWithAction = [
      ...columns,
      {
        label: 'Action',
        classes: 'table-action text-center',
        custom: ({ _id }) => (
          <GridAction
            route={editRoute}
            id={_id}
            deleteHandler={this.deleteHandler}
          />
        ),
      },
    ]

    const childrenWithProps = withFilter && cloneElement(children, {
      changeHandler: this.filterChangeHandler,
      searchHandler: this.filterSearchHandler,
      clearHandler: this.filterClearHandler,
      filterData,
    }, null)

    let exportQuery = {
      filterData: queryParams,
    }

    if (isFilteredApplied) {
      exportQuery = update(exportQuery, {
        filterData: {
          $merge: filterData,
        },
      })
    }

    const exportConfig = {
      fetchHandler,
      columns,
      query: exportQuery,
    }

    return (
      <>
        {withFilter && (
          <GridFilter withExport exportConfig={exportConfig}>
            {childrenWithProps}
          </GridFilter>
        )}
        <Layout bgColor="white" classes="flex-1 overflow-auto">
          <Table
            columns={columnsWithAction}
            data={data}
            isLoading={isLoading}
            classes="table-hover"
          />
        </Layout>
        {withPagination && (
          <Layout flex={{ justify: 'end' }} pad={{ t: 15 }}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              changeHandler={this.pageChangeHandler}
            />
          </Layout>
        )}
        <Modal
          size="small"
          show={showDeleteConfirmation}
          closeHandler={this.modalCloseHandler}
        >
          <DeleteConfirmation
            category={category}
            id={idToBeDeleted}
            deleteAction={deleteHandler}
            deleteSuccessMessage="Record deleted successfully."
            deleteSuccessHandler={this.deleteSuccessHandler}
          />
        </Modal>
      </>
    )
  }
}

Grid.propTypes = {
  fetchHandler: func.isRequired,
  deleteHandler: func.isRequired,
  routeParams: shape({
    category: string,
  }),
  queryParams: shape({
    category: string,
  }),
  columns: arrayOf(shape({
    label: string,
  })),
  data: arrayOf(shape({
    _id: string,
  })),
  editRoute: string,
  totalPages: number,
  currentPage: number,
  withPagination: bool,
  withFilter: bool,
  children: node,
}

Grid.defaultProps = {
  queryParams: {},
  routeParams: {},
  columns: [],
  data: [],
  editRoute: '/',
  totalPages: 0,
  currentPage: 1,
  withPagination: false,
  withFilter: false,
  children: '',
}

export default Grid
