import React, { Component } from 'react';
import logo from './logo.svg';
import { Form, Icon, Input, Button, Checkbox, Card } from 'antd';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username : '',
      password : '',
      total : ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);

  }

  handleChange(event) {
    this.setState({username: event.target.value});
  }

  handleChangePassword(event) {
    this.setState({password: event.target.value});
    console.log(this.state.password);
  }

  handleOnClick(event) {
    let temp = ''
    //temp = +this.state.username + +this.state.password;

    temp = parseInt(this.state.username) + parseInt(this.state.password);
    this.setState({total : temp});
  }

  render() {

    return (
        <div className="App">
            <h1>Welcome to my application</h1>
            <Card title="Sing In" style={{ width: 300, margin: 'auto' }}>
              <Form className="login-form">
                <Form.Item>
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username" value={this.state.username}
                        onChange={this.handleChange}
                     />
                </Form.Item>
                <Form.Item>
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password" placeholder="Password"
                      value={this.state.password}
                      onChange={this.handleChangePassword}
                      />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button"
                      onClick={this.handleOnClick}
                      >
                      Sign in
                    </Button>
                    <a className="login-form-forgot" href="">Forgot password</a>
                </Form.Item>
                <hr></hr>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      Sign up
                    </Button>
                </Form.Item>
              </Form>
              Total is ..... {this.state.total}
            </Card>
        </div>
    );
  }
}

export default App;
