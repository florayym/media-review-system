import React, { Fragment, Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Collapse = styled.div.attrs({
  className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
  className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
  className: 'collpase navbar-collapse',
})``

class Links extends Component {
  render() {
    return (
      <Fragment>
        <Link to="/" className="navbar-brand">
          媒体资料管理系统
        </Link>
        <Collapse>
          <List>
            <Item>
              <Link to="/gallery" className="nav-link">
                浏览
              </Link>
            </Item>
            <Item>
              {/* <Link to="/medias/create" className="nav-link"> */}
              <Link to="/upload" className="nav-link">
                上传
              </Link>
            </Item>
            <Item>
              <Link to="/se/dashboard" className="nav-link">
                审核
              </Link>
            </Item>
          </List>
        </Collapse>
      </Fragment>
    )
  }
}

export default Links