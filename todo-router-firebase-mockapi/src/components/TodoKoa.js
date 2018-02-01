import React, { Component } from 'react';

import { Input, Icon, Button, Card, List, Checkbox } from 'antd';

const URL = 'ใส่ url api ตรงนี้เลยจ้า';

export default class TodoKoa extends Component {

  constructor(props) {
    super(props);

    this.state = {
      inputText : '',
      todos: [],
      isLoading: true,
      isSelectAll: false
    }

    this.handleChangeText = this.handleChangeText.bind(this);
    this.submitList = this.submitList.bind(this);
    this.handleDeleteSelected = this.handleDeleteSelected.bind(this);

  }

  componentDidMount () {
    this.getTodos();
  }

  async fetchAsync (url, opts) {
    this.setState({ isLoading : true });

    const resp = await fetch(url, opts);
    if (resp.status !== 200) {
      return;
    }

    this.setState({isLoading : false});
    return resp.json();
  }
  
  async getTodos () {
    let todos = await this.fetchAsync(URL);
    todos = todos.map(todo => {
      return { ...todo, selected: false }
    });
    this.setState({ todos });
  }

  async saveTodos (title) {
    const newTodo = await this.fetchAsync(URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title
      }),
    });
    if (newTodo) {
      this.setState({
        todos: [...this.state.todos, newTodo]
      });
    }
  }

  async deleteTodo (id) {
    const resp = await this.fetchAsync(URL + id, {
        method: 'DELETE'
      });
    if (resp) {
      const todos = this.state.todos.filter(todo =>
        todo.id !== id
      );
      this.setState({ todos });
    }
  }

  async setIncompleteTodo (id) {
    const resp = await this.fetchAsync(URL + `${id}/complete`, {
        method: 'DELETE'
      });
    if (resp) {
      const todos = this.state.todos.map(todo => 
        todo.id === id
        ? { ...todo, completed: 0 }
        : todo
      );
      this.setState({ todos });
    }
  }

  async setCompleteTodo (id) {
    const resp = await this.fetchAsync(URL + `${id}/complete`, {
        method: 'PUT'
      });
    if (resp) {
      const todos = this.state.todos.map(todo => 
        todo.id === id
        ? { ...todo, completed: 1 }
        : todo
      );
      this.setState({ todos });
    }
  }

  async submitList () {
    this.saveTodos(this.state.inputText);
    this.setState({
      inputText: ''
    })
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.submitList();
    }
  }

  handleChangeText = (event) => {
    this.setState({inputText: event.target.value});
  }

  handleToggleComplete (id, isCompleted) {
    if (isCompleted) {
      this.setIncompleteTodo(id);
    } else {
      this.setCompleteTodo(id);
    }
  }

  handleCheckAll () {
    const isSelect = !this.state.isSelectAll;
    const todos = this.state.todos.map(todo => {
      return { ...todo, selected: isSelect }
    });
    this.setState({ todos, isSelectAll: isSelect });
  }
  handleCheck (id, isSelected) {
    const todos = this.state.todos.map(todo => 
      todo.id === id
      ? { ...todo, selected: !todo.selected }
      : todo
    );
    this.setState({ todos });
  }

  handleDeleteSelected () {
    for (let todo of this.state.todos) {
      if (todo.selected) {
        this.deleteTodo(todo.id);
      }
    }
    this.setState({ isSelectAll: false });
  }

  render() {
    return (
      <div>
        <Card style={{ width: 500 , backgroundColor : this.props.myColor }}>
          <h1>To-do-list</h1>

          <div style={{ marginBottom:'10px'}}>
            <Input
              addonAfter={<Button type="primary" onClick={this.submitList}>Add</Button>}
              onChange={this.handleChangeText}
              value={this.state.inputText}
              onKeyPress={this.handleKeyPress}/>
          </div>

          <List
            bordered
            dataSource={this.state.todos}
            style={{ height: 300, overflow: 'auto' }}
            loading={this.state.isLoading}
            header={
              <div style={{ position: 'relative', height: 20 }}>
                <Checkbox
                  checked={this.state.isSelectAll}
                  onChange={() => this.handleCheckAll(this.state.isSelectAll)}
                  style={{ marginRight: 10, position: 'absolute', left: 0 }}
                >
                Select All
                </Checkbox>
                <Button 
                  type="danger"
                  size="small"
                  style={{ position: 'absolute' , right: 0}}
                  onClick={this.handleDeleteSelected}
                >
                  Delete
                </Button>
              </div>
            }
            renderItem={todo => (
              <List.Item
                actions={[<a onClick={() => this.deleteTodo(todo.id)}><Icon type="close-circle" style={{ fontSize: 16, color: 'rgb(255, 145, 0)' }} /></a>]}
                style={{ textDecorationLine: todo.completed ? 'line-through' : 'none' }}
              >
                <Checkbox
                  checked={todo.selected}
                  onChange={() => this.handleCheck(todo.id, todo.selected)}
                  style={{ marginRight: 10 }}
                >
                </Checkbox>
                <h4 
                  onClick={() => { this.handleToggleComplete(todo.id, todo.completed) }}
                >
                {todo.title}
                </h4>
              </List.Item>
            )}
          />
        </Card>
      </div>
    );
  }
}
