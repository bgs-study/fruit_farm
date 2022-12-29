import styled from "styled-components";
import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import optionSlice from '../store/OptionSlice';
import { setLocation, setFruit } from "../store/OptionSlice";
import store from '../store/Store';
import { HOST, yellow } from './../global-variables';

// 옵션 변경
const Selector = React.memo(({searchType, temp, setTemp, setOptions}) => {

  const dispatch = useDispatch();
  const option = useSelector(state=>state.option);
  const [cat, setCat] = useState([]);

  // useEffect(()=>{
  //   console.log(option);
  // }, [option])

  const setOption = async (e) => {
    await setTemp({
      ...temp,
      [searchType]: e.target.id
    });
    setOptions(temp);
  };

  useEffect(()=>{
    getFruits();
  }, []);

  const getFruits = async () => {
    await axios.get(`/api/farms?limit=100000000`)
    .then(res=>res.data)
    .then(data=>{
      const cat = [];
      data.map(x=>{
        if (!cat.includes(x.type)) cat.push(x.type);
      })
      // console.log(cat);
      setCat(cat);
    });
  }

  return (
    searchType === "location" && (
      <Container>
        {location.map((x, i) => (
          <Item to="/" key={i} id={x[0]} onClick={e=>{
            dispatch(setLocation(e.target.id));
            dispatch(setFruit(null));
          }}>{location[i][0]}</Item>
        ))}
      </Container>
    ) || searchType === "fruit" && (
      <Container>
        {cat && cat.map((x, i)=>(
          <Item to="/" key={i} id={x} onClick={e=>{
            dispatch(setFruit(e.target.id));
            dispatch(setLocation(null));
          }}>{cat[i]}</Item>
        ))}
      </Container>
    )
  );
});

const location = [
  ["인천", '인천', 'Incheon'],
  ["서울", '서울', 'Seoul'],
  ["경기", '경기도', 'Gyeonggi'],
  ["강원", '강원도', 'Gangwon'],
  ["충남", '충청남도', 'Chungnam'],
  ["충북", '충청북도', 'Chungbuk'],
  ["대전", '대전', 'Daejeon'],
  ["경북", '경상북도', 'Gyeongbuk'],
  ["경남", '경상남도', 'Gyeongnam'],
  ["대구", '대구', 'Daegu'],
  ["울산", '울산', 'Ulsan'],
  ["부산", '부산', 'Busan'],
  ["전북", '전라북도', 'Jeonbuk'],
  ["광주", '광주', 'Gwangju'],
  ["전남", '전라남도', 'Jeonnam'],
  ["제주", '제주', 'Jeju'],
];

//
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  text-align: center;
  line-height:40px;

  width: 100%;
  background-color: white;
  border-radius:20px;
  
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
  z-index:9999;
`;

const Item = styled(Link)`
  padding: 10px 0px;
  height: 60px;
  border-bottom: 1px solid #c3c2c2;

  border-right: 1px solid #c3c2c2;

  &:nth-child(4n) {
    border-right: none;
  }

  &:nth-last-child(-n+4):nth-child(4n+1){
    border-bottom: none;
  }

  &:nth-last-child(-n+4):nth-child(4n):last-child{
    border-bottom: none;
  }

  &:hover {
    cursor: pointer;
		font-weight:700;
		color: ${yellow};
`;



export default Selector;
