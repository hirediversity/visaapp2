import React from 'react';
import { useState } from 'react';
import '../App.css';

const Content = ({data, em, pw, inputs, err, loading}) => {

    let [link, setLink] = useState(false);
    let [open, setOpen] = useState(false);


    if (em.length !== 0 || pw.length !== 0) {
        loading.style.display = 'flex';

        setTimeout(() => {
            loading.style.display = 'none';
            inputs.style.display = 'none';
            
            setOpen(true)
    
          }, 10000);
    } 
    else {
        alert('이메일 또는 패스워드를 입력해주세요')
        window.location.reload();
    }
    

    


      function Normal() {

        for (var i = 0; i < data.length; i++) {

            if (em === data[i].이메일 && pw === data[i].AppPW) {
                inputs.style.display = 'none';
                err.style.display = 'none';

                return (
                <div>
                    <p>{data[i].이름}님, 안녕하세요!</p>
                    <p>이번 달 보험료(This month)는 {data[i].수수료계좌}원,<br/>
                    지난 달 연체료(Last month)는 {data[i].수수료미납계좌}원으로<br/>
                    총 보험료(Total)는 <b>{data[i].수수료계좌총액}원</b>입니다.</p>
                    <p>* 아래 버튼을 클릭하여 보험료를 납부해주세요 *<br/>
                    <b>Click the button below to pay!</b><br/>
                    ({data[i].납부기간안내})</p>
                    <button onClick={() => {setLink(true)}}>납부하기</button>

                    {
                        link === true
                        ? <Form />
                        : null
                    }

                </div>
                )
            } else retry()
        }

        return <div></div>
            

        function retry() {
            inputs.style.display = 'block';
            loading.style.display = 'none';
            err.style.display = 'block';
            
            // setTimeout(() => {
            //     window.location.reload();
            // }, 500);
        }

        function Form() {
            window.location.href = `${data[i].조폼안내용개별링크}`
        }
        
      }

      return (
        <div>
            {
                open === true
                ? <Normal />
                : null
            }
        </div>
    )
}
export default Content