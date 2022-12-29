import { useState, useEffect } from 'react';
import styled from 'styled-components';
import {MyPageProfileEdit,MyPageSecurityEdit} from '../components/MyPageEdit';
import { getToken } from '../utils/utils';
import * as userApi from "../lib/userApi";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { StyledSubTitle, StyledTitle } from '../styles/Styled';

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
`
const StyledInfoContainer = styled.div`
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 50px;
  box-shadow: -1px -1px 10px rgb(0 0 0 / 18%);
  border: 1px solid rgba(0,0,0,0.18);
`


const MyPage = () => {
  const [userInfo, setUserInfo] = useState({}); 
  const [loading, setLoading] = useState(true);

  const getUserInfo = async () => {
    const token = getToken();
    const res = await userApi.get("/api/myInfo", {
      headers: {
        authorization: token,
      },
    });
    setUserInfo({
      id:res.data.id,
      name: res.data.name,
      phoneNum: res.data.phoneNum,
      email: res.data.email,
    })
    setLoading(false);
  };
  
  useEffect(() => {
    getUserInfo();
  },[]);

  const {id, name, phoneNum, email} = userInfo;

  const list = [
    {
     id:"name",
     title: "이름",
     name: `${name}`,
    },
    {
      id:"phoneNum",
      title:"전화번호",
      name: `${phoneNum}`,
    },
    {
      id:"email",
      title:"이메일",
      name: `${email}`,
    },
  ]

  return (
    <Container>
      <StyledTitle>내 정보 관리</StyledTitle>
      <StyledInfoContainer>
        <StyledSubTitle marginBottom>
          기본정보
          <AiOutlineExclamationCircle/>
        </StyledSubTitle>
        {list.map((item) => (
          <MyPageProfileEdit 
            key={item.id}
            id={item.id}
            name={item.name}
            title={item.title}
            userId={id}
            loading={loading}
          />
        ))}
      </StyledInfoContainer>
      <StyledInfoContainer>
        <StyledSubTitle marginBottom>
          보안설정
          <AiOutlineExclamationCircle/>
        </StyledSubTitle>
        <MyPageSecurityEdit userId={id} />
      </StyledInfoContainer>
    </Container>
  )
};


export default MyPage;