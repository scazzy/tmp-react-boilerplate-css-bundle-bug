import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';

window.onload = () => {
  render (
    <Root/>,
    document.getElementById('root')
  )
}
