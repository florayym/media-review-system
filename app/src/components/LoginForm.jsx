import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import PropTypes from 'prop-types';

const Container = styled.div.attrs({
    className: 'container',
})``;

const Input = styled.input.attrs(props => ({
    type: props.type || "password"
}))`
    color: #282c34;
    margin: 0.5em;
    font-size: 1em;
    border: 2px solid #282c34;
    border-radius: 3px;
    
`;

// required: true;

const Button = styled.button`
    background: ${props => props.primary ? "#282c34" : "white"};
    color: ${props => props.primary ? "white" : "#282c34"};
    font-size: 1em;
    margin: 0.5em;
    padding: 0.25em 1em;
    border: 2px solid #282c34;
    border-radius: 3px;
`;

// Login.css
/*
@media all and (min-width: 480px) {
    .Login {
      padding: 60px 0;
    }
  
    .Login form {
      margin: 0 auto;
      max-width: 320px;
    }
}
*/

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            usertype: 'junior',
        }
    }

    change = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    changeRadio = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    onSubmit = e => {
        e.preventDefault();
        
        console.log(this.state);

        this.props.onSubmit(this.state);
        this.setState({
            username: '',
            password: '',
            usertype: 'junior',
        });
    }

    render() {
        return (
            <div>

                {/** TODO require content submitted not empty */}

                <Container>

                    <form>

                        <p>[delete this] In this page you'll login to auditor's inner working page.</p>
                        <label htmlFor="username">工号：</label>
                        <Input
                            type="text"
                            id="username"
                            placeholder="请输入工号"
                            value={this.state.username}
                            onChange={e => this.change(e)}
                        />
                        <br />
                        <label htmlFor="password">密码：</label>
                        <Input
                            id="password"
                            placeholder="请输入密码"
                            value={this.state.password}
                            onChange={e => this.change(e)}
                        />
                        <br />
                        <label htmlFor="senior">主审</label>
                        <Input
                            type="radio"
                            name="usertype"
                            id="senior"
                            value="senior"
                            onChange={e => this.changeRadio(e)}
                        />
                        <label htmlFor="junior">初审</label>
                        <Input
                            checked
                            type="radio"
                            name="usertype"
                            id="junior"
                            value="junior"
                            onChange={e => this.changeRadio(e)}
                        />
                        <br />
                        <Button primary onClick={(e) => this.onSubmit(e)}>登录</Button>

                    </form>

                </Container>
                <Container>
                    <button onClick={() => this.props.history.push('upload')}>通过函数跳转</button>
                    <Link to="/upload">去upload</Link>
                </Container>

            </div>
        )
    }
}

LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
}

export default LoginForm