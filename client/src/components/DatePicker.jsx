import React, {useState} from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useDispatch, useSelector} from 'react-redux';
import { setDate } from '../store/OptionSlice';

export default function TableDatePicker() {
  const [myDate, setMyDate] = useState(new Date());
  useSelector(state=>state.option);
  const dispatch = useDispatch();

  return (
    <Container>
      <DatePicker selected={myDate} onChange={
        myDate => {
          setMyDate(myDate);
          dispatch(setDate(`${myDate.getFullYear()}-${myDate.getMonth()+1}-${myDate.getDate()}`));
        }
    }/>
    </Container>
  );
}

const Container = styled.div`
  display:flex;
  justify-content:center;
  input {
    border: none;
    text-align: center;
    width: 100%;
  }

  button {
    width: 10px;
  }
`