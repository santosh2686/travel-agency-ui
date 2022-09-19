import React, { memo } from 'react'
import { string, oneOf, func } from 'prop-types'

import { MapCssModules } from '@utils'
import { Button, Layout } from '@base'

import AlertIcon from '../AlertIcon/AlertIcon.jsx'

const Message = ({
  message, type, buttonLabel, listRoute, closeHandler,
}) => (
  <div styleName="bg-white text-center pad-30">
    <AlertIcon type={type} />
    <p styleName="pad-tb-20">
      {type === 'error' ? 'System not responding, please try after some time' : message}
    </p>
    <Layout flex={{ align: 'center', justify: 'center' }}>
      <Button
        outline
        clickHandler={closeHandler}
        classes="mar-r-15"
      >
        Close
      </Button>
      { type === 'success' && <Button asLink href={listRoute}>{buttonLabel}</Button> }
    </Layout>
  </div>
)

Message.propTypes = {
  message: string,
  type: oneOf(['success', 'error']),
  buttonLabel: string,
  listRoute: string,
  closeHandler: func,
}

Message.defaultProps = {
  message: '',
  type: '',
  buttonLabel: '',
  listRoute: '',
  closeHandler: () => {},
}

export default memo(MapCssModules(Message))
