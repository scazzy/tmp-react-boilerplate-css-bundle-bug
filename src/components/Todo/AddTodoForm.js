import React, { Component } from 'react';

export default class AddTodoForm extends Component {
  constructor (props) {
    super(props);
  }

  onKeyDown = (e) => {
    // call onAddTodo on press of Enter
    if (e.key === 'Enter' && e.shiftKey == false) {
      e.preventDefault();
      if(e.target.value.trim() === '') return false;
      this.props.onAddTodo(e.target.value.trim());
      e.target.value = '';
    }
  }

  render () {
    return (
      <div>
        <input onKeyDown={this.onKeyDown} type="text" placeholder="type and press enter.."/>
      </div>
    )
  }
}
