import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import * as todoAction from '../actions/todo';
import TodoList from '../components/Todo';

class Todo extends Component {
  state = {
    isSelectAll: false
  }

  handleAddTodo = (title, isSelectAll) => {
    if (title.length > 0) {
      this.props.addTodo(title, isSelectAll);
    }
  }

  handleSelectAll = isSelectAll => {
    this.setState({ isSelectAll }, () => {
      this.props.toggleSelectAll(isSelectAll)
    });
  }

  handleDeleteAll = () => {
    this.setState({ isSelectAll: false }, () => {
      this.props.deleteAllSelected();
    });
  }

  render () {
    return (
      <TodoList
        { ...this.props }
        handleAddTodo={this.handleAddTodo}
        handleSelectAll={this.handleSelectAll}
        handleDeleteAll={this.handleDeleteAll}
        isSelectAll={this.state.isSelectAll}
      />
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos
})

export default connect(mapStateToProps, todoAction)(Todo);