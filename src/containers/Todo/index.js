import React, { Component } from 'react';
import TodoList from '../../components/Todo';
import AddTodoForm from '../../components/Todo/AddTodoForm';
import TodoFilters from '../../components/Todo/TodoFilters';
import uuidv4 from 'uuid/v4';

const initialTodos = [
  {id: uuidv4(), title: 'Buy milk', completed: false},
  {id: uuidv4(), title: 'Read book', completed: true},
];

export default class TodoApp extends Component {

  constructor (props) {
    super(props);

    this.state = {
      todos: initialTodos || []
    }
  }

  onAddTodo = (title) => {
    const todos = this.state.todos;
    todos.push({
      id: uuidv4(),
      title,
      completed: false
    });
    this.setState({
      todos
    });
  }

  onToggleTodo = (id) => {
    if(!id) return false;
    const todos = this.state.todos;
    const idx = todos.findIndex(todo => todo.id === id);
    const todo = todos[idx];
    todos[idx].completed = !todos[idx].completed;
    this.setState({
      todos
    });
  }

  render () {
    return (
      <div>
        <h3>This is todo app</h3>
        <TodoFilters/>
        <TodoList
          todos={this.state.todos}
          onToggleTodo={this.onToggleTodo}
          />
        <AddTodoForm onAddTodo={this.onAddTodo}/>
      </div>
    )
  }
}
