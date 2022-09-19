import React, { memo } from 'react'
import { arrayOf, bool, string } from 'prop-types'
import ClassNames from 'classnames'
import { MapCssModules } from '@utils'

const List = ({
  tag: Tag, list, inline, classes,
}) => {
  const eltClass = ClassNames('list', {
    'flex flex-wrap': inline,
    'pad-l-15': Tag === 'ol',
    'un-ordered-list': Tag === 'ul',
    [classes]: classes,
  })
  const listItemClasses = ClassNames({
    'pad-r-25': inline,
    'pad-b-10': !inline,
    'relative pad-l-10': Tag === 'ul',
  })
  return (
    <Tag styleName={eltClass}>
      {list.map((listItem, index) => (
        <li styleName={listItemClasses} key={index}>{listItem}</li>
      ))}
    </Tag>
  )
}

List.propTypes = {
  tag: string,
  list: arrayOf(string),
  inline: bool,
  classes: string,
}

List.defaultProps = {
  tag: 'ul',
  list: [],
  inline: false,
  classes: '',
}

export default memo(MapCssModules(List))
