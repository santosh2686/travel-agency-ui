import React, { PureComponent, Fragment } from 'react'
import {
  arrayOf, bool, func, object, string, shape,
} from 'prop-types'
import ClassNames from 'classnames'
import { MapCssModules, computeValue } from '@utils'

import Spinner from '../Spinner/Spinner.jsx'
import TableCell from './TableCell.jsx'
import HeaderCell from './HeaderCell.jsx'

class Table extends PureComponent {
  state = {
    expandedIndex: -1,
    resizeTimer: undefined,
  };

  rowClickHandler(index, len) {
    if (len === 0) {
      return
    }
    this.setState((currentState) => {
      const { expandedIndex } = currentState
      return {
        expandedIndex: expandedIndex === index ? -1 : index,
      }
    })
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateTable)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateTable)
  }

  updateTable = () => {
    clearTimeout(this.state.resizeTimer)
    this.state.resizeTimer = setTimeout(() => {
      this.setState({ resizeTimer: null })
    }, 0)
  }

  render() {
    const {
      data, columns, children, classes, isLoading,
    } = this.props
    const eltName = ClassNames({
      [classes]: classes,
    })

    let device = 'desktop'
    const windowInnerWidth = window.innerWidth || (document.body ? document.body.offsetWidth : 0)
    if (windowInnerWidth > 979 && windowInnerWidth < 1200) {
      device = 'iPadLandscape'
    } else if (windowInnerWidth > 767 && windowInnerWidth < 980) {
      device = 'iPadPortrait'
    } else if (windowInnerWidth > 567 && windowInnerWidth < 768) {
      device = 'smallTablet'
    } else if (windowInnerWidth > 479 && windowInnerWidth < 568) {
      device = 'phoneLandscape'
    } else if (windowInnerWidth < 480) {
      device = 'phonePortrait'
    }

    const visibleColumns = columns.filter((column) => !column.hideOn || column.hideOn !== device)
    const hiddenColumns = columns.filter((column) => column.hideOn && column.hideOn === device)
    const visibleColumnLength = visibleColumns.length
    const hiddenColumnLength = hiddenColumns.length

    return (
      <table styleName={eltName}>
        <thead>
          <tr>
            {visibleColumns.map((column, index) => (
              <HeaderCell
                key={index}
                classes={column.classes}
                label={column.label}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={columns.length} styleName="text-center pad-tb-10">
                <Spinner size="small" />
              </td>
            </tr>
          )}
          {(!isLoading && data.length === 0) && (
            <tr>
              <td colSpan={columns.length} styleName="text-center color-gray pad-tb-10">
                No record found.
              </td>
            </tr>
          )}
          {!isLoading && data.map((item, index) => (
            <Fragment key={index}>
              <tr
                onClick={this.rowClickHandler.bind(this, index, hiddenColumnLength > 0)}
                styleName={this.state.expandedIndex === index ? 'expanded' : ''}
              >
                {visibleColumns.map((column, index) => (
                  <TableCell
                    key={index}
                    expand={column.expand && hiddenColumnLength > 0}
                    item={item}
                    column={column}
                  />
                ))}
              </tr>
              {hiddenColumnLength > 0 && (
                <tr styleName="hide hidden-row">
                  <td colSpan={visibleColumnLength} styleName="pad-tb-10 pad-lr-15 bor-b-gray-light">
                    <ul>
                      {hiddenColumns.map(({ label, custom, map }, index) => (
                        <li key={index}>
                          <div styleName="font-bold vertical-middle pad-b-5">{label}</div>
                          <div styleName="pad-lr-10 pad-b-5 vertical-middle">:</div>
                          <div
                            styleName="vertical-middle pad-b-5"
                          >
                            {custom ? custom(item) : computeValue(item, map)}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
          {children}
        </tbody>
      </table>
    )
  }
}

Table.propTypes = {
  columns: arrayOf(shape({
    label: string,
  })),
  data: arrayOf(shape({})),
  isLoading: bool,
}

Table.defaultProps = {
  columns: [],
  data: [],
  isLoading: false,
}

export default MapCssModules(Table)
