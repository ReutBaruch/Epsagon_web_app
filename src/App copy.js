import React, { useEffect, useState } from 'react';

import axios from 'axios';

export const App = () =>{
  const [spans, setSpans] = useState([])
  useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/spans`)
      .then(data => {
        console.log(data)
        setSpans(data.data)}).catch((error)=>{
          console.error(error)
        })
  }, [])

    if (!spans){
      return <h1>No spans</h1>
    }
    return (
      <ul>
        { spans.map(span => <li>{JSON.stringify(span)}</li>)}
      </ul>
    )
}