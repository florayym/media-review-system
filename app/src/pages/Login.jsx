import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Input = styled.input.attrs(props => ({
    type: props.type || "password"
}))`
color: blue;
margin: 0.5em;
font-size: 1em;
border: 2px solid blue;
border-radius: 3px;
`;

const Button = styled.button`
    background: ${props => props.primary ? "blue" : "white"};
    color: ${props => props.primary ? "white" : "blue"};
    font-size: 1em;
    margin: 0.5em;
    padding: 0.25em 1em;
    border: 2px solid blue;
    border-radius: 3px;
`;

//const LoginBlock = 

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>In this page you'll login to auditor's inner working page.</p>
                
                <Input type = "text" id="username" placeholder="请输工号" ref={dom=>this.a=dom}/>
                <br></br>
                <Input id="password" placeholder="请输入密码" ref={this.b}/>
                <br />
                <Button primary onClick={this.handleClick}>Login</Button>
                <button onClick={() => this.props.history.push('upload')}>通过函数跳转</button>
                <br />
                <Link to="/upload">去upload</Link>
            </div>
        )
    }
}

export default Login