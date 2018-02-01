import React, { Component } from 'react';
import firebase from '../libs/firebase';
import { Input, Icon, Button, Card, List, Checkbox } from 'antd';

export default class TodoFirebase extends Component {

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
    const todoRef = firebase.ref('/');
    todoRef.on('value', snapshot => {
      const vals = snapshot.val();
      let todoArray;
      if (vals) {
        todoArray = Object.entries(snapshot.val());
      } else {
        todoArray = [];
      }
      this.updateTodos(todoArray);
      this.setState({ isLoading: false });
    });
  }

  updateTodos (todoArray) {
    const todos = todoArray.map(todo => {
      return { 
        id: todo[1].id,
        title: todo[1].title,
        completed: todo[1].completed,
        selected: false 
      }
    });
    this.setState({ todos });
  }

  saveTodos (title) {
    const key = firebase.ref('/').push().key
    firebase.ref('/' + key).set({
      id: key,
      title,
      completed: 0,
    });
  }

  deleteTodo (id) {
    const todoRef = firebase.ref('/' + id);
    todoRef.remove();
  }

  submitList () {
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
    const todoRef = firebase.ref('/' + id);
    if (isCompleted) {
      todoRef.child('completed').set(0);
    } else {
      todoRef.child('completed').set(1);
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
