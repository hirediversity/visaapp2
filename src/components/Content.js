import React from 'react';
import { useState } from 'react';
import '../App.css';

const Content = ({data, em, pw, inputs, loading, logo}) => {

    let [link, setLink] = useState(false);
    let [open, setOpen] = useState(false);
    let [link2, setLink2] = useState(false);
    let errors = [];


    if (em.length !== 0 || pw.length !== 0) {
        loading.style.display = 'flex';

        setTimeout(() => {
            loading.style.display = 'none';
            inputs.style.display = 'none';
            
            setOpen(true)
    
          }, 4000);
    } 
    else {
        alert('이메일 또는 패스워드를 입력해주세요')
        window.location.reload();
    }
    


      function Normal() {

        for (var i = 0; i < data.length; i++) {

            if (em == data[i].이메일 && pw == data[i].AppPW) {
                inputs.style.display = 'none';
                logo.style.display = 'none';

                let 진행상황 = data[i].진행상황.replace(/\.|\-|[(0-9)]/g,'');
                let 진행중국어 = 진행상황.replace('사법처리대상', '罚款处理对象')
                                        .replace('심사대기', '材料审核待机')
                                        .replace('검토중', '材料审核中')
                                        .replace('보완서류 요청', '材料补交请求中')
                                        .replace('서류 준비 완료', '材料准备完成')
                                        .replace('서류 출력 완료', '材料打印完成')
                                        .replace('서류 접수 완료', '材料已提交至出入境事务所')
                                        .replace('반려', '材料已驳回')
                                        .replace('반려email안내 완료', '材料驳回通知邮件已发送')
                                        .replace('반려서류 준비 완료', '驳回材料提交准备完成')
                                        .replace('지문등록 안내', '指纹登陆已通知')
                                        .replace('지문등록 완료', '指纹登陆已完成')
                                        .replace('외국인등록증 수령', '外国人登陆证已领取')
                                        .replace('외국인등록증 배송시작', '外国人登陆证已开始配送')
                                        .replace('외국인등록증 배송시작 email안내 완료', '外国人登陆证配送通知邮件发送完成')
                                        .replace('외국인등록증 배포 완료', '外国人登陆证分发完毕')
                                        .replace('절차 모두 완료', '所有步骤均已完成')
                                        .replace('무효신청', '无效申请')


                return (
                <div className='조회화면'>
                    <p>({data[i].하다시연번})<br/>
                    {data[i].전체이름}님,<br/>
                    안녕하세요!</p>
                    <p>현재 외국인등록증 신청 진행 상황은<br/>
                    <b>{진행상황}</b>입니다.</p><br/>

                    <p>{data[i].전체이름}同学<br/>
                    您好</p>
                    <p>目前国人登陆证申请进行状态为<br/>
                    <b>{진행중국어}</b></p><br/>

                    {

                        data[i].진행상황 === '1.보완서류 요청'
                        ? setLink(true)
                        : null

                    }

                    {
                        
                        link === true
                        ? <Form />
                        : null
                    }

                    

                </div>
                )
            } else {
                errors.push(i)
            }
        }

        if (errors.length === data.length) {
            alert('신청 정보가 없거나,\n입력하신 정보가 틀렸습니다.');
            window.location.reload()
        }

        return <div></div>

        function Airt() {
            window.location.href = `${data[i].app보완링크}`
        }

        function Form() {

            const rea = [data[i].증명사진보완, data[i].여권보완, data[i].사증보완, 
                        data[i].재학보완, data[i].거주지보완, data[i].GKS보완, data[i].수원보완];

            const newRea = rea.filter(item => {
                if (item != null && item !== '보완완료') {
                    return true;
                } return false;

            }).map((m) => {
                let aaa = m.replace(/\"/g,'')
                return <p id='reasons'>◼ {aaa}</p>
            })

            

            return (
                <>
                    <p>보완 사유는 아래와 같습니다 / 需要补交的材料如下<br/>
                    <span id="기간안내">(보완 마감일 / 材料补交截止日期 : {data[i].보완마감일})</span></p>

                    <div id="reasonBox">{newRea}</div>

                    <button id="납부하기" onClick={() => {setLink2(true)}}>보완서류 제출 / 点击补交材料<br/>Submission of supplementary documents</button>

                    {
                        link2 === true
                        ? <Airt />
                        : null
                    }
                </>
            )
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
