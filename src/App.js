import React, { Component } from 'react';
import Dropdown from './components/dropdown'

export default class App extends Component {
  render() {
    const options = [
      { value: 'india', label: 'India'},
      { value: 'afganistan', label: 'Afganistan'}
    ]
    return (
      <Dropdown options={options} />
    );
  }
}
