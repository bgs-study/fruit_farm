import {useState,useEffect,useContext} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getHeadCount ,getTotalPrice} from "../store/FormStore";
import { useNavigate } from "react-router-dom";
import { DetailContext } from "../pages/DetailPage";
import styled from 'styled-components';

const FloatingForm = () =>{
    const {detailData:data} = useContext(DetailContext);
    const {price,title,company} = data;
    
    const [headCount, setHeadCount] = useState(1);
    const [totalPrice, setTotalPrice] = useState(undefined);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useSelector(state => state);

    const handleHeadCount = (e) => {
        setHeadCount(e.target.value);  
    };

    const handleSubmit = (e) =>{    
        // console.log({
        //     ...state,
        //     "price":price,
        //     "farm": company.name,
        //     "programName":title
        // });     

        // 페이지 이동전, 인원이 초과 되는 지 확인을 위한 get 요청 
        // 인원초과 되면 alert창 + return 
        // + 동시접속에 대한 확인요청

        navigate("/pay",{
            paymentData : {
                ...state,
                "price":price,
                "farm": company.name,
                "programName":title
            }
        });
    };

    useEffect(()=>{
        setTotalPrice(headCount*price);
        dispatch(getHeadCount(headCount));
    },[headCount])

    useEffect(()=>{
        dispatch(getTotalPrice(totalPrice));
    },[totalPrice]);

    return(
        <Form onSubmit={handleSubmit}>
            <p>{state.date}</p>
            <p>{state.time}</p>
            <p>{price}원/명</p>
            <SelectBox onChange={handleHeadCount} value={headCount}>
                {[...Array(10).keys()].map(n => <option key={`HeadCount-${n+1}`} value={n+1} >{n+1}</option>)}
            </SelectBox>
            <span>명</span>
            <button type="submit">예약하기</button>
            <p>총 합게 : { totalPrice || price }</p> 
        </Form>
    );
};

const Form = styled.form`
    height: 200px;
    border : 1px solid black;
    position: sticky;
    top: 20%;
`;
const SelectBox = styled.select`
    
`;

export default FloatingForm;