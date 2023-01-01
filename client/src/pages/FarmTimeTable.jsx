import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showModal, closeModal } from '../store/ModalSlice';
import { initDate } from '../store/FormSlice';
import ModalContainer from '../components/Modal'
import FarmPeriod from '../components/FarmPeriod';
import UpdatePeriod from '../components/UpdatePeriod';
import FarmFormat from '../components/FarmFormat';
import FarmTime from '../components/FarmTime';
import Pagination from '../components/TimeTablePagination';
import styled from 'styled-components';
import { ConfirmButton, DeleteButton, ContentContainer, NormalButton, SubmitButton, Input } from '../styles/Styled';
import Moment from 'moment';

import * as API from '../lib/userApi';

const Subject = styled.h2`
	text-align: center;
	margin-bottom: 4%;
`;
const ModalTitle = styled(Subject)`
    font-size : 1.5rem;
`   
const TimeTableList = styled(ContentContainer)`
    border : 2px lightgray solid;
    border-radius : 10px;
    padding 15px;
    margin : 2% 0;
`;
const FarmImg = styled.img`
    margin-right: 20px;
    width: 140px;
    height: 120px;
    object-fit : cover;
`;
const TimTableContent = styled.div`
    display:block
    width: 100%;
`; 
const TimTableItem = styled.div`
    display:flex;
`;
const AddTimTable = styled(NormalButton)`
    display:block;
    margin-left:auto;
    margin-bottom:10px;
`;
const TimeTableButtons = styled.div`
    display:flex;
    flex-direction:column;
    margin-left:auto;
`;
const UpdateButton =styled(ConfirmButton)`
    display: block;
    width: 100%;
    + button {
        margin-left: 0px;
    }
    :not(:last-child) {
        margin-bottom:10px;
    }
`;
const DelButton = styled(DeleteButton)`
    display: block;
    width: 100%;
    + button {
        margin-left: 0px;
    }
`;
const H3 = styled.h3`
    margin : 30px 0 10px;
    font-size : 1.1rem;
`;
const SubmitBtn = styled(SubmitButton)`
    display: block;
    width: 100%;
    margin-top : 7%;
`;
const FailAnnouncement = styled.p`
	text-align: center;
	margin-top: 5rem;
`;
const Div = styled(ContentContainer)`
    margin : 2% 0;
`
const CommonInput = styled(Input)`
    display : block;
    width: 100%;
    font-size : 0.9rem;
`;
const CostInput = styled(CommonInput)``;

//memo 지혜 : TimeTable
const TimeTable = ()=>{
    let farmRegistraion = true;
    const [timeTable, setTimeTable] = useState([]);
    const [postData, setPostData] = useState({});
    const [date, setDate] = useState([]);
    const [cost, setCost] = useState('');
    const [maxHeadCount, setMaxHeadCount] = useState([]);

    // memo 지혜: 수정할 타켓
    const [target,setTarget] = useState('');

    // memo 지혜 : 페이지네이션
    const [page, setPage] = useState(1);    
    const [lastId, setLastId] = useState([0]);
    const [first,setFirst] = useState(1);
    const [last,setLast] = useState(1);
    const [pageGroup, setPageGroup] = useState(0);

    const limit = 20;
    const perpage = 5;
    const pageCount = limit / perpage;
    const offset = ((page-1) - (pageCount * pageGroup) )* perpage;

    const dispatch = useDispatch();
    const modalOpen = useSelector(({modal}) => modal);

    const fetchData = async () => {
        try {
            await API.get(`/api/farmers/farmInfo`)
            await API.get(`/api/timetables/owner?lastId=${lastId[pageGroup]}&limit=${limit}`).then(
                (res) => {
                    const data = res.data;
                    setTimeTable([...data]);
                }
            );
        }
        catch(e){
            if (e.response.data.message ==='농장주에게 등록된 농장이 없습니다.'){
                farmRegistraion = false;
            }   
            return;
        }
    };

    const handleSubmit = async(e , target) =>{   
        e.preventDefault();
        //memo 지혜 : 체험테이블 생성
        if (target === ''){ 
            if(postData.timeList.length < 1 || cost < 1 || !postData.startDate || !postData.endDate) {
                alert('모든 값을 올바르게 기입해주세요');
                return;
            };

            const {timeList,startDate,endDate} = postData;
            const d1 = Moment(startDate,'YYYY-MM-DD');
            const d2 = Moment(endDate,'YYYY-MM-DD');
            const diffDate = d2.diff(d1,'days');
            let date = d1;

            for (let i = 0; i <= diffDate ; i++){
                for (let j = 0; j< timeList.length; j++){
                    const start_time = timeList[j][0];
                    const end_time = timeList[j][1];
                    const personnel = maxHeadCount[j];
                    try {
                        await API.post('/api/timetables',{
                            'date': date,
                            'personnel':personnel,
                            'price':cost,
                            'start_time':start_time,
                            'end_time':end_time
                        });
                    }
                    catch(e){
                        console.log(e);
                    }
                }
                date = d1.add(1, 'days'); 
            }
        }
        //memo 지혜 : 체험테이블 수정
        else {
            try {
                const res = await API.put(`/api/timetables/${target}`,{
                    'date': date[0],
                    'personnel':maxHeadCount[0],
                    'price':cost,
                    'start_time':postData.timeList[0][0],
                    'end_time':postData.timeList[0][1]
                });
            }
            catch(e){
                console.log(e);
            }
        }
        alert(`체험시간표 ${Isupdate()}완료`);
        dispatch(closeModal());
        dispatch(initDate());
        resetForm();
        fetchData();
    };
    
    const LiftingHeadCount = state =>{
        setMaxHeadCount([...maxHeadCount,...state]);
    };
    const LiftingDate = state =>{
        setDate([state,...date]);
    };
    const stateLifting = state => {
        setPostData({...postData,...state});
    };

    const onTimeTableDelete = async(id) => {
        const result = window.confirm('삭제하시겠습니까?');
        if(result){
            await API.delete(`/api/timetables/${id}`);
            fetchData();
        }
    };
    const onTimeTableUpdate = (id)=>{
        resetForm();
        setTarget(id);
        dispatch(showModal());
    };

    const handleCost =  (e) =>{
        const value = e.target.value;
        const onlyNumber = value.replace(/[^0-9]/g, '')
        setCost(onlyNumber)
    }
    const handleCreate = () => {
        if(farmRegistraion){ 
            resetForm();
            dispatch(showModal());
            return;
        }
        alert('농장을 먼저 등록해주세요');
    };
    const Isupdate = () => {
        return (target === '' ? '등록' : '수정');
    };

    const resetForm  = () => {
        setDate('');
        setCost('');
        setTarget('');
    };

    useEffect (() => {
        fetchData();
    }, [lastId,pageGroup]);


    return (
        <>
        <FarmFormat>
            <Subject>체험시간표</Subject>
            <AddTimTable type='button' onClick = {handleCreate}>추가하기</AddTimTable>
            { timeTable.length > 0 ? 
                    timeTable.slice(offset, offset + perpage).map((table,idx) =>{
                        const {id, url, date, start_time, end_time, price, personnel} = table;
                        return(
                            <TimeTableList key={idx}>
                                <TimTableItem>
                                    <FarmImg src={url.split(",")[0]} alt='농장이미지'></FarmImg>
                                    <TimTableContent>
                                        <div>
                                            <span>날짜 : </span>
                                            <span>{date}</span>
                                        </div>
                                        <div>
                                            <span>시작시간 : </span>
                                            <span>{start_time.slice(0,5)}</span>
                                        </div>
                                        <div>
                                            <span>끝나는시간 : </span>
                                            <span>{end_time.slice(0,5)}</span>
                                        </div>
                                        <div>
                                            <span>가격 : </span>
                                            <span>{price.toLocaleString('ko-KR')}</span>  
                                        </div>
                                        <div>
                                            <span>인원수 : </span>
                                            <span>{personnel}</span>
                                        </div>
                                    </TimTableContent>
                                    <TimeTableButtons>
                                        <UpdateButton type='button' onClick={()=>onTimeTableUpdate(id)}>수정</UpdateButton>
                                        <DelButton type='button' onClick={()=>onTimeTableDelete(id)}>삭제</DelButton>
                                    </TimeTableButtons>
                                </TimTableItem>
                            </TimeTableList>
                        )
                    }) 
                    : (<FailAnnouncement>체험시간표를 추가하세요</FailAnnouncement>) 
            }
            { timeTable.length > 0 
                && <Pagination pageCount={pageCount} timeTable={timeTable} 
                perpage={perpage} page={page} setPage={setPage}
                pageGroup={pageGroup} setPageGroup={setPageGroup} 
                first={first} setFirst={setFirst} last={last} setLast={setLast} 
                lastId = {lastId} setLastId={setLastId}/>
            }
        </FarmFormat>

        { modalOpen && <ModalContainer  w='35%' h='77%'>
                <form onSubmit={(e) => handleSubmit(e , target)}>
                    <ModalTitle>체험시간표 {Isupdate()}</ModalTitle>
                    <Div>
                        <H3>체험 날짜</H3>
                        {target==='' 
                            ? <FarmPeriod onStateLifting ={stateLifting}/>  
                            : <UpdatePeriod timeTable={timeTable} target={target} LiftingDate ={LiftingDate}/>
                        }
                    </Div>
                    <Div>
                        <H3>체험 시간</H3>
                        <FarmTime onStateLifting={stateLifting} LiftingHeadCount={LiftingHeadCount} target={target}></FarmTime>
                    </Div>
                    <Div>
                        <H3>체험 비용</H3>
                        <CostInput type='text' placeholder='체험비용을 입력하세요' value={cost} onChange={handleCost}></CostInput>
                    </Div>
                    <SubmitBtn type='submit'>{Isupdate()}</SubmitBtn>
                </form>
                </ModalContainer>
        }
        </>
    )
}

export default TimeTable;