import React, { memo } from 'react'
import { node, string } from 'prop-types'
import { MapCssModules } from '@utils'
import { Layout, Text } from '@base'

const AuthPanel = ({ children, title, subTitle }) => (
  <Layout
    flex={{ align: 'center', justify: 'center' }}
    classes="flex-1 overflow-auto"
  >
    <div styleName="bg-white auth-panel pad-20">
      <Text tag="h2" align="center" classes="pad-b-10">
        {title}
      </Text>
      <Text tag="p" align="center" classes="pad-b-20">
        {subTitle}
      </Text>
      {children}
    </div>
  </Layout>
)

AuthPanel.propTypes = {
  children: node,
  title: string,
  subTitle: string,
}

AuthPanel.defaultProps = {
  children: {},
  title: '',
  subTitle: '',
}

export default memo(MapCssModules(AuthPanel))
