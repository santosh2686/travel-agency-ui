import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'

import { MapCssModules } from '@utils'
import ModalHeader from './ModalHeader.jsx'

class Modal extends PureComponent {
  state = {
    inClass: false,
  };

  componentWillReceiveProps() {
    this.setState({ inClass: false })
    setTimeout(() => {
      this.setState({ inClass: true })
    }, 0)
  }

  closeModal = () => {
    this.setState({ inClass: false })
    setTimeout(() => {
      this.props.closeHandler()
    }, 300)
  };

  render() {
    const {
      show, title, children, size,
    } = this.props

    if (!show) {
      return null
    }

    const modalClass = ClassNames(`fixed flex flex-column align-center flex-center pad-20 modal ${size}`, {
      in: this.state.inClass,
    })

    const childrenWithProps = React.Children.map(children, (child) => React.cloneElement(child, { closeModal: this.closeModal }))

    return (
      <div styleName={modalClass}>
        <div styleName="bg-white relative flex flex-column modal-content">
          {title && <ModalHeader title={title} closeHandler={this.closeModal} /> }
          {childrenWithProps}
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  show: PropTypes.bool,
  title: PropTypes.string,
  size: PropTypes.string,
  closeHandler: PropTypes.func,
}

Modal.defaultProps = {
  show: false,
  title: '',
  size: '',
  closeHandler: () => {},
}

export default MapCssModules(Modal)
