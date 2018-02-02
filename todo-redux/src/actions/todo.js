export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const DELETE_ALLSELECTEDTODO = 'DELETE_ALLSELECTEDTODO';
export const TOGGLE_COMPLETE = 'TOGGLE_COMPLETE';
export const TOGGLE_SELECT = 'TOGGLE_SELECT';
export const TOGGLE_SELECTALL = 'TOGGLE_SELECTALL';

let nextTodoId = 0;

export function addTodo(title, selected) {
  return { 
    type: ADD_TODO,
    id: nextTodoId++,
    selected,
    title
  };
}

export function deleteTodo(id) {
  return { type: DELETE_TODO, id };
}

export function toggleComplete(id, isCompleted) {
  return { type: TOGGLE_COMPLETE, id, isCompleted };
}

export function toggleSelect(id, isSelected) {
  return { type: TOGGLE_SELECT, id, isSelected };
}

export function toggleSelectAll(isSelected) {
  return { type: TOGGLE_SELECTALL, isSelected };
}

export function deleteAllSelected() {
  return { type: DELETE_ALLSELECTEDTODO };
}