import React from 'react'
import { useHistory } from 'react-router-dom'
import '../App.css';
import SignIn from '../components/SignIn';
import api from '../api';

const authenticate = async (inputs, cb) => {

  // await api.getReviewerById(inputs[0])
  //   .then(res => {
  //     if (res.data.success === true) {

  //     } else {

  //     }
  //   },
  //     err => {

  //     }
  //   );

  // using post login
  await api.reviewerLogin(inputs)
    .then(res => {
      if (res.status === 200) {
        alert(`登录成功！\n欢迎 ${inputs['ID']}！`);
        localStorage.setItem('token', res.data['access-token']);
        localStorage.setItem('refreshToken', res.data['refresh-token']);
        setTimeout(cb, 1000);
      }
    })
    .catch(err => {
      console.error(err);
      alert('登录失败，请检查输入');
    });

};

export default () => {

  let history = useHistory(); // to access history

  // <Redirect to={{
  //   pathname: '/order',
  //   state: { id: '123' } // To access: props.location.state.id
  // }}
  // />

  //let { from } = location.state || { from: { pathname: "/" } };
  const { from } = { from: { pathname: "/" } }

  let onSubmit = (inputs) => {
    //e.preventDefault();
    authenticate(inputs, () => {
      history.replace(from); // 回不到上一级 适用于登录后，不需要重新回到登页面
      // history.push: 可以回到上一级, 适合navigate
    });
  };

  return (
    <div className="App">
      {/* <LoginForm onSubmit={fields => this.onSubmit(fields)} /> */}
      <SignIn onSubmit={inputs => onSubmit(inputs)} />

      {/* <p>
        {JSON.stringify(this.state.fields, null, 2)}
      </p> */}
    </div>
  )
};