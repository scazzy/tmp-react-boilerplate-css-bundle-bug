import React from 'react';
import cx from '../../styles';
import style from './style.scss';

export default function Todo ({ id, title, completed, onToggleTodo }) {
  const classnames = {
    [style['todo-item']]: true,
    [style.completed]: completed
  };

  return (
    <div className={cx(classnames)}>
      <label>
        <input onChange={() => onToggleTodo(id)} type="checkbox" checked={completed} />{' '}
        { title }
      </label>
    </div>
  )
}
