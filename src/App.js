import React, { useState } from 'react';
import './App.css';
import Content from './components/Content';
import Data from './통합데이터관리-APP용.json';

<<<<<<< HEAD
=======
var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyVWc7psFCmYWDcd'}).base('appmdn5kLtTSnivLC');
>>>>>>> 2b1081830bad2eb4e93c447fc7b5a6e2f7eb3247

// var Airtable = require('airtable');
// var base = new Airtable({apiKey: 'keyVWc7psFCmYWDcd'}).base('appmdn5kLtTSnivLC');

// const table = base('통합데이터관리');
// const data = [];

// const getRecords = async () => {
//   const records = await table.select({
//       maxRecords: 99999,
//       view: 'APP용'
//   }).eachPage((lists, fetchNextPage) => {
//     lists.forEach((list) => data.push(list.fields))
//     fetchNextPage();
//   });
// }

// getRecords();


function App() {

  const [db, setDb] = useState(Data);
  const [box, setBox] = useState(false);

  // setTimeout(() => {
  //   console.log(data.length);
  // }, 8000);

  return (
    <div className="App">
      <div id="search">
        <p id="emoji">🏥</p>
        <p id='title'>* 건강보험 조회 & 납부 *</p>
        <input id="email" placeholder='e-mail'></input>
        <input id="rcNumber" placeholder='password'></input>
        <button type="button" className="btn btn-primary btn-sm" id="searchBtn" onClick={() => {
          setBox(true);
          }}>Login</button>
       
          <div id="loading" className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
     
        <p id="err">⚠<br/>
        가입 정보가 없거나,<br/>
        입력하신 정보가 틀렸습니다.</p>
      </div>
      <p></p>
      <div className="container">
          {
            box === true
            ? 
            <Box />

            // <Content 
            // data={data}
            // pw={document.getElementById('rcNumber').value}
            // em={document.getElementById('email').value}
            // inputs={document.getElementById('search')}
            // err={document.getElementById('err')}
            // loading={document.getElementById('loading')}
            // />

            // alert('납부 기간이 아닙니다. (납부 기간 : 매월 20일까지)\nIt is not the payment period.\n(until the 20th of every month)\n现在不是缴纳费用的期间。\n(每月20日为截止日)')
            : null
          }
      </div>
    </div>
  );

  function Box() {

    

    const em = document.getElementById("email").value;
    const pw = document.getElementById("rcNumber").value;

    if (em.length === 0 || pw.length === 0) {
      
      alert('이메일 또는 패스워드를 입력해주세요')
      window.location.reload();
  }

    let [Link, setLink] = useState(false);

    for (var i = 0; i < db.length; i++) {
      
      if (em === db[i].이메일 && pw === db[i].AppPW) {
        
        document.getElementById("search").style.display = "none";
        document.getElementById("err").style.display = "none";

        return (
          <div className='조회화면'>
                    <p>{db[i].이름}님,<br/>
                    안녕하세요!</p>
                    <p>이번 달 보험료(This month)는 {db[i].수수료계좌}원,<br/>
                    지난달 연체료(Last month)는 {db[i].수수료미납계좌}원으로<br/>
                    총 보험료(Total)는 <b>{db[i].수수료계좌총액}원</b>입니다.</p>
                    <p>* 아래 버튼을 클릭하여 보험료를 납부해주세요 *<br/>
                    <b id="기간안내">({db[i].납부기간안내})</b><br/>
                    <b>Click the button below to pay!</b></p>
                    <button id="납부하기" onClick={() => {setLink(true)}}>납부하기</button>

                    {
                        Link === true
                        ? <Form />
                        : null
                    }

                </div>
        )
      } else document.getElementById("err").style.display = "block"
    }

    function Form() {
      window.location.href = `${db[i].조폼안내용개별링크}`
    }

    return (
      <div></div>
    )

  }

  

  
} export default App