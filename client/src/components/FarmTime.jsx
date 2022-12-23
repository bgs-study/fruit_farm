import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Time
const FarmTime = (props) =>{
    // 전체 타임 목록
    const [timeList, setTimeList] = useState([]);
    // 시작타임
    const [startTime, setStartTime] = useState('');
    // 끝나는타임
    const [endTime, setEndTime] = useState('');
    // 한 타임에서 체험할 시간 
    const [forTime, setForTime] = useState('');
    // 최대인원수
    const [maxHeadCount, setMaxHeadCount] = useState(0);
    // 각 타임별 최대인원수
    const [maxHeadCountList, setMaxHeadCountList] = useState([]);

    // 타임리스트를 그려주는 함수
    const renderTime = () =>{
        return (
        <div>
            {
            timeList.map((time,idx) => { 
                return (
                    <div key={`${time[0]}-${time[1]}-${idx}`}>
                        <button type='button' onClick={onDelTime} value={idx}>-</button>
                        <li>{idx+1}타임  {time[0]} ~ {time[1]} {maxHeadCountList[idx]}명</li>
                    </div>
                )
            })  
        }    
        </div>);
    };

    // 타임 생성함수
    const onCreateTime = () =>{
        //시작타임 입력없이 생성을 할 수 없다
        if(!isNaN(startTime)){alert('Please enter start time');return;}
        //인원을 1이상 입력해야한다.
        if(maxHeadCount<1){alert('Please enter headCount');return;}
        //한 타임에서 체험할 시간은 1이상으로 입력해야한다.
        if(forTime<1){alert('Please enter forTime');return;}

        for (let i=0; i<timeList.length; i++){
            // 등록하고자하는 startTime이 타임리스트의 타임에서 엔드타임보다 작다면
            // 중복된 시간이 존재한다는 것이므로 리턴하여 이를 방지한다.
            if(timeList[i][1] > startTime){
                alert('Please enter correct forTime');return;
            }
        }
        // 타임리스트에 추가한다.
        setTimeList([...timeList, [startTime, endTime]]);
        // 인원리스트에 추가한다.
        setMaxHeadCountList([...maxHeadCountList,maxHeadCount]);
    };

    // 타임 삭제함수
    const onDelTime = (e) =>{
        const idx = e.target.value;
        // 타임리스트의 idx에 해당하는 원소를 하나 삭제
        timeList.splice(idx,1);
        setTimeList([...timeList]);

        //인원리스트의 idx에 해당하는 원소를 하나 삭제
        maxHeadCountList.splice(idx,1);
        setMaxHeadCountList([...maxHeadCountList]);
        props.onStateLiftining({maxHeadCountList:maxHeadCountList});
    };

    const handleStartTime = (e) =>{
        setStartTime(e.target.value);
    };
    const handleMaxHeadCount = (e)=>{
        setMaxHeadCount(e.target.value);
    }

    // startTime변경시 endTime를 set시켜주는 사이드이펙트
    useEffect(() => {
        let [hour,min] = startTime.split(':');   
        hour = parseInt(hour)+parseInt(forTime);  
        // endTime = startTime + forTime시간
        // 문자열이므로 split하여 시간에만 forTime 더해 endTime를 set한다.
        setEndTime([ hour < 10 ? `0${hour}`: hour , min].join(':'));
    },[startTime]);

    // timeList변경시 사이드이펙트
    useEffect (() => {
        // 타임리스트를 상위 컴포넌트로 전달해주는 기능
        props.onStateLiftining({timeList:[...timeList]});

        // 하나이상의 타임이 등록되면 forTime를 변경하지 못하게 함
        // formTime이 변경되면 체험시간(ex. 2시간, 6시간)이 달라져도 같은 금액으로 측정되기때문
        const formTimeInput = document.getElementById('forTime');
        timeList.length >0 ? formTimeInput.readOnly = true : formTimeInput.readOnly = false;
        // 타임리스트 렌더링
        renderTime();
    },[timeList]);

    return (
        <>
        { timeList &&
            <>
                <div style={{display:'flex'}}>
                    <div>
                        <label>시간</label>
                        <input type='text' id='forTime' placeholder='체험시간을 입력하세요' value={forTime} onChange={(e)=>setForTime(e.target.value)}/>
                    </div>
                    <div>
                        <label>시작시각</label>
                        <input type='time' value={startTime} onChange={handleStartTime}/>
                    </div>
                    <div>
                        <label>인원</label>
                        <input style={{width:'40px'}} type='text' placeholder='인원' value={maxHeadCount} onChange={handleMaxHeadCount} ></input>
                    </div>

                    <div>
                        <label>추가</label>
                        <button type='button' onClick={onCreateTime}>+</button>
                    </div>
                </div>   
                <div>
                    {renderTime()}
                </div>
            </>
        }
        </>
    )
};

export default FarmTime;