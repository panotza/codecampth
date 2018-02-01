import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'antd';

class Header extends Component {
  constructor (props) {
    super (props);
    this.state = {
      current: props.location.pathname,
    }
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }

  render () {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="/">
          <Link to='/'>Koa</Link>
        </Menu.Item>
        <Menu.Item key="/mock">
          <Link to='/mock'>Mock API</Link>
        </Menu.Item>
        <Menu.Item key="/firebase">
          <Link to='/firebase'>Firebase</Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(Header);