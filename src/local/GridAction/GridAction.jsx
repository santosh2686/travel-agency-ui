import React, { PureComponent, Fragment } from 'react'
import { string, func } from 'prop-types'

import { Button, Icon } from '@base'

class GridAction extends PureComponent {
  onDelete = () => {
    const { deleteHandler, id } = this.props
    deleteHandler(id)
  }

  render() {
    const { route, id } = this.props
    return (
      <>
        <Button
          asLink
          href={`${route}/${id}/edit`}
          size="small"
          classes="mar-r-5"
        >
          <Icon name="pencil" color="white" />
        </Button>
        <Button
          category="danger"
          size="small"
          clickHandler={this.onDelete}
        >
          <Icon name="trash" color="white" />
        </Button>
      </>
    )
  }
}

GridAction.propTypes = {
  deleteHandler: func.isRequired,
  id: string.isRequired,
  route: string.isRequired,
}

export default GridAction
