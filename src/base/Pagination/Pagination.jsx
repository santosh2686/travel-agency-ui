import React, { PureComponent } from 'react'
import { number, func, string } from 'prop-types'
import ClassNames from 'classnames'
import { MapCssModules } from '@utils'

import Button from '../Button/Button.jsx'

class Pagination extends PureComponent {
  prevHandler = () => {
    const { changeHandler, currentPage } = this.props
    changeHandler(currentPage - 1)
  }

  nextHandler = () => {
    const { changeHandler, currentPage } = this.props
    changeHandler(currentPage + 1)
  }

  render() {
    const { totalPages, currentPage, classes } = this.props
    const eltClass = ClassNames('flex align-center', {
      [classes]: classes,
    })

    if (!totalPages) {
      return false
    }

    return (
      <div styleName={eltClass}>
        <Button
          category="success"
          disabled={currentPage === 1}
          clickHandler={this.prevHandler}
        >
          {'<<'}
        </Button>
        <div styleName="mar-lr-10">
          <span styleName="font-bold">{currentPage}</span>
          {` of `}
          <span styleName="font-bold">{totalPages}</span>
        </div>
        <Button
          category="success"
          disabled={currentPage === totalPages}
          clickHandler={this.nextHandler}
        >
          {'>>'}
        </Button>
      </div>
    )
  }
}

Pagination.propTypes = {
  totalPages: number,
  currentPage: number,
  changeHandler: func,
}

Pagination.defaultProps = {
  totalPages: 10,
  currentPage: 1,
  changeHandler: () => {},
}

export default MapCssModules(Pagination)
