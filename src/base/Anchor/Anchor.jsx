import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import {
  bool, func, string, node, shape,
} from 'prop-types'
import ClassNames from 'classnames'
import { MapCssModules } from '@utils'

const Anchor = ({
  children,
  href,
  color,
  hoverColor,
  attributes,
  asButton,
  block,
  asLink,
  type,
  clickHandler,
  noUnderline,
  title,
  classes,
}) => {
  const eltClass = ClassNames({
    [`color-${color}`]: color,
    [`hover-color-${hoverColor}`]: hoverColor,
    'bor-none pad-0 text-decoration-none bg-none': asButton,
    'text-decoration-none': noUnderline,
    'show-block': block,
    [classes]: classes,
  })

  if (asButton) {
    return (
      <button
        // eslint-disable-next-line react/button-has-type
        type={type}
        onClick={clickHandler}
        styleName={eltClass}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...attributes}
      >
        {children}
      </button>
    )
  }

  if (asLink) {
    return (
      <NavLink
        to={href}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...attributes}
        styleName={eltClass}
      >
        {children}
      </NavLink>
    )
  }

  return (
    <a
      href={href}
      title={title}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...attributes}
      styleName={eltClass}
    >
      {children}
    </a>
  )
}

Anchor.propTypes = {
  children: node.isRequired,
  href: string,
  classes: string,
  color: string,
  hoverColor: string,
  title: string,
  asButton: bool,
  type: string,
  asLink: bool,
  block: bool,
  noUnderline: bool,
  clickHandler: func,
  attributes: shape({
    name: string,
  }),
}

Anchor.defaultProps = {
  classes: '',
  href: '/',
  color: 'primary',
  hoverColor: 'primary-light',
  title: '',
  asButton: false,
  type: 'button',
  asLink: false,
  block: false,
  noUnderline: false,
  clickHandler: () => {
  },
  attributes: {},
}

export default memo(MapCssModules(Anchor))
