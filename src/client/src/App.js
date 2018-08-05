import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { getValues } from './api/values';

class App extends Component {
  state = {
    values: [],
    hasLoaded: false
  }
  async componentDidMount() {
    const values = await getValues();
    this.setState({
      values,
      hasLoaded: true
    })
  }
  render() {
    const { hasLoaded, values } = this.state;
    if (!hasLoaded) return <div/>;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to ASP.NET and React</h1>
        </header>
        <p className="App-intro">
          Example of user the server values endpoint:
        </p>
        <ul className="App-values">
         {values.map((value, index) => <li key={index}>{value}</li>)}
        </ul>
      </div>
    );
  }
}

export default App;
