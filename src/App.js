import React, { useState } from 'react';
import './App.css';
import Content from './components/Content'

var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyJzEKvIACHqssJQ'}).base('appmdn5kLtTSnivLC');

const table = base('통합데이터관리');
const data = [];

const getRecords = async () => {
  const records = await table.select({
      maxRecords: 99999,
      view: 'APP용'
  }).eachPage((lists, fetchNextPage) => {
    lists.forEach((list) => data.push(list.fields))
    fetchNextPage();
  });
}

getRecords();


function App() {

  const [box, setBox] = useState(false)

  // setTimeout(() => {
  //   console.log(data);
  // }, 10000);

  return (
    <div className="App">
      <div id="search">
        <input id="email" placeholder='e-mail'></input>
        <input id="rcNumber" placeholder='password'></input>
        <button type="button" className="btn btn-primary btn-sm" id="searchBtn" onClick={() => {
          setBox(true);
          }}>Login</button>
       
          <div id="loading" className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
     
        <p id="err">* 가입 정보가 없거나, 입력하신 정보가 틀렸습니다. *</p>
      </div>
      <p></p>
      <div className="container">
          {
            box === true
            ? <Content 
            data={data}
            pw={document.getElementById('rcNumber').value}
            em={document.getElementById('email').value}
            inputs={document.getElementById('search')}
            err={document.getElementById('err')}
            loading={document.getElementById('loading')}
            />
            : null
          }
      </div>
    </div>
  )
}

export default App
