import React from 'react';
import { Input, Icon, Button, Card, List , Checkbox } from 'antd';

const Todo = (props) => {
  const {
    todos,
    isSelectAll,
    deleteTodo,
    toggleComplete,
    toggleSelect,
    handleAddTodo,
    handleSelectAll,
    handleDeleteAll
   } = props;
  let input;
  return (
    <div>
      <Card style={{ width: 500 }}>
        <h1>To-do-list</h1>
        <div style={{ marginBottom:'10px' }}>
          <Input
            ref={node => input = node}
            addonAfter={
              <Button type="primary" onClick={() => {
                  const title = input.input.value.trim();
                  handleAddTodo(title, isSelectAll);
                  input.input.value = '';
                }}
              >
                Add
              </Button>
            }
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                const title = input.input.value.trim();
                handleAddTodo(title, isSelectAll);
                input.input.value = '';
              }
            }}
          />
        </div>
        <List
        bordered
        dataSource={todos}
        style={{ height: 300, overflow: 'auto' }}
        header={
          <div style={{ position: 'relative', height: 20 }}>
            <Checkbox
              checked={isSelectAll}
              onChange={(e) => handleSelectAll(e.target.checked)}
              style={{ marginRight: 10, position: 'absolute', left: 0 }}
            >
              Select All
            </Checkbox>
            <Button
              type="danger"
              size="small"
              style={{ position: 'absolute' , right: 0}}
              onClick={handleDeleteAll}
            >
              Delete
            </Button>
          </div>
        }
          renderItem={todo => (
            <List.Item
              actions={[<a onClick={() => deleteTodo(todo.id)}><Icon type="close-circle" style={{ fontSize: 16, color: 'rgb(255, 145, 0)' }} /></a>]}
              style={{ textDecorationLine: todo.completed ? 'line-through' : 'none' }}
            >
              <Checkbox
                checked={todo.selected}
                onChange={() => toggleSelect(todo.id, todo.selected)}
                style={{ marginRight: 10 }}
              >
              </Checkbox>
              <h4 
                onClick={() => toggleComplete(todo.id, todo.completed)}
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

export default Todo;