import React, { memo } from 'react'
import { arrayOf, object, string } from 'prop-types'
import ClassNames from 'classnames'
import { MapCssModules } from '@utils'

import Anchor from '../Anchor/Anchor'
import Text from '../Text/Text'

const ListView = ({
  list, title, titleClasses, classes,
}) => {
  const eltClass = ClassNames({
    [classes]: classes,
  })
  const titleClass = ClassNames('pad-b-10', {
    [titleClasses]: titleClasses,
  })
  return (
    <div styleName={eltClass}>
      <Text tag="h3" size="16" transform="capitalize" classes={titleClass}>{title}</Text>
      <ul>
        {list.map((listItem, index) => (
          <li key={index} styleName="bor-t-gray-light">
            <Anchor
              href={listItem.to}
              color="gray"
              hoverColor="gray"
              asLink
              classes="text-decoration-none capitalize show-block pad-5 hover-bg-gray-lighter"
            >
              {listItem.label}
            </Anchor>
          </li>
        ))}
      </ul>
    </div>
  )
}

ListView.propTypes = {
  list: arrayOf(object),
}

ListView.defaultProps = {
  list: [
    { label: 'offer', to: '/' },
    { label: 'footwear', to: '/' },
    { label: 'clothing', to: '/' },
    { label: 'offer', to: '/' },
    { label: 'footwear', to: '/' },
    { label: 'clothing', to: '/' },
    { label: 'offer', to: '/' },
    { label: 'footwear', to: '/' },
    { label: 'clothing', to: '/' },
  ],
}

export default memo(MapCssModules(ListView))
