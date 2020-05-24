import React from 'react'
import bg_img from '../img/Loneliness_in_the_park.jpg';
import { NavBar } from '../components';
import styled from 'styled-components'
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

// Black background with opacity
// Specify a stack order in case you're using a different order for other elements
// Add a pointer on hover

const Wrapper = styled.a.attrs({
  className: 'navbar-brand',
})`
  margin-right: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
`

const StyledBackground = styled.div`
  background: url(${bg_img}) 60% 40% no-repeat;
`
const StyledHeader = styled.header`
  background-color: #282c34b0;
  width: 1110px;
  color: white;
  padding-top: 10em;
  min-height: 77vh;
`

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/florayym">
        媒体资料管理
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Home() {
  return (
    <div>
      <NavBar />

      <Wrapper id="Welcode-wrapper">
        <StyledBackground id="Background">
          <StyledHeader id="Header">
            <h1>
              欢迎来到媒体资料在线管理与审核系统！
            </h1>
          </StyledHeader>
        </StyledBackground>
      </Wrapper>

      <Box mt={8}>
        <Copyright />
      </Box>
    </div>
  );
}