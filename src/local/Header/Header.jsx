import React, { memo } from 'react'
import { func, string } from 'prop-types'
import { MapCssModules } from '@utils'
import { Layout, Text, Icon } from '@base'

const Header = ({ classes, clickHandler }) => (
  <Layout
    flex={{ align: 'center', justify: 'space-between' }}
    bgColor="white"
    pad={{ tb: 5, r: 20 }}
    classes={classes}
  >
    <Layout
      flex={{ align: 'center' }}
    >
      <Text tag="div" color="success" weight="bold" align="center" classes="logo">T</Text>
      <Text tag="h3" classes="overflow-hidden brand">Travel Agency</Text>
      <Icon
        name="bars"
        size="22"
        classes="cur-pointer"
        attributes={{
          onClick: clickHandler,
        }}
      />
    </Layout>
    <div styleName="circle color-gray bor-gray font-24 pad-lr-10 cur-pointer relative profile">
      <Icon name="user" />
    </div>
  </Layout>
)

Header.propTypes = {
  classes: string,
  clickHandler: func,
}

Header.defaultProps = {
  classes: '',
  clickHandler: () => {},
}

export default memo(MapCssModules(Header))
