import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';
import cx from '../../styles';
import style from './style.scss';

export default function TodoList ({ todos, onToggleTodo }) {
  todos = todos || [];
  console.log(cx('btn'))
  return (
    <div>
      { todos.map((todo, i) => {
        return <Todo {...todo} key={i} onToggleTodo={onToggleTodo}/>
      })}
    </div>
  )
}

TodoList.propTypes = {
  todos: PropTypes.array
}
