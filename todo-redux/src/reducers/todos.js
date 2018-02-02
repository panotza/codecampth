import { 
  ADD_TODO, 
  DELETE_TODO,
  DELETE_ALLSELECTEDTODO,
  TOGGLE_COMPLETE,
  TOGGLE_SELECT,
  TOGGLE_SELECTALL
} from '../actions/todo';

export default function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, {
          id : action.id,
          title: action.title,
          completed: 0,
          selected: action.selected
        }
      ];
    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.id);
    case DELETE_ALLSELECTEDTODO:
      return state.filter(todo => !todo.selected);
    case TOGGLE_COMPLETE:
      return state.map(todo =>
        (todo.id === action.id)
        ? { ...todo, completed: !action.isCompleted }
        : todo
      );
    case TOGGLE_SELECT:
      return state.map(todo =>
        (todo.id === action.id)
        ? { ...todo, selected: !action.isSelected }
        : todo
      );
    case TOGGLE_SELECTALL:
      return state.map(todo => {
        return { ...todo, selected: action.isSelected };
      });
    default:
      return state
  }
}