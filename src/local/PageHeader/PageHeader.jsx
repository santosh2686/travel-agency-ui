import React, { memo } from 'react'
import {
  arrayOf, bool, number, shape, string,
} from 'prop-types'

import {
  Button, BreadCrumb, Layout, Text,
} from '@base'

const PageHeader = ({
  title,
  total,
  btnLabel,
  btnRoute,
  withBreadCrumb,
  breadCrumbData,
}) => (
  <Layout flex={{ justify: 'space-between', align: 'center' }} mar={{ b: 15 }}>
    <Text tag="h4">
      {title}
    </Text>
    {withBreadCrumb && (
      <BreadCrumb data={breadCrumbData} classes="hidden-md-down" />
    )}
    {!withBreadCrumb && (
      <Layout flex={{ align: 'center' }}>
        <Text classes="mar-r-5">
          {`Total: ${total} `}
        </Text>
        <Button asLink href={btnRoute}>
          {btnLabel}
        </Button>
      </Layout>
    )}
  </Layout>
)

PageHeader.propTypes = {
  title: string.isRequired,
  total: number,
  btnLabel: string,
  btnRoute: string,
  withBreadCrumb: bool,
  breadCrumbData: arrayOf(shape({
    label: string,
  })),
}

PageHeader.defaultProps = {
  total: 0,
  btnLabel: 'Add new',
  btnRoute: '/',
  withBreadCrumb: false,
  breadCrumbData: [],
}

export default memo(PageHeader)
