import React from 'react';

import axios from 'axios';

export default class App extends React.Component {
  state = {
    spans: []
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/spans`)
      .then(res => {
        console.log(res)
        const spans = res.data.data;
        this.setState({ spans });
      }).catch((error)=>{
        console.error(error)
      })
  }

  render() {
    const {spans} = this.state
    if (!spans){
      return <h1>No spans</h1>
    }
    return (
      <ul>
        { spans.map(span => <li>{JSON.stringify(span)}</li>)}
      </ul>
    )
  }
}