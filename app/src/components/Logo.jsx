import React, { Component } from 'react'
import styled from 'styled-components'

const Wrapper = styled.a.attrs({
  className: 'navbar-brand',
})``

class Logo extends Component {
  render() {
    return (
      <Wrapper href="https://github.com/florayym">
        <img src="https://www.hfut.edu.cn/images/hgd_logo.png" width="70" height="50" alt="Qifei Yu" />
      </Wrapper>
    );
  }
}

export default Logo;