import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>In this page you'll see the form to update the medias</p>
                <Link to="/upload">去upload</Link>
                <button onClick={() => this.props.history.push('upload')}>通过函数跳转</button>
            </div>
        )
    }
}

export default Login