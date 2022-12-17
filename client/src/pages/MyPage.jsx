import { useState } from 'react';
import styled, {css} from 'styled-components';
import MyPageEdit from '../components/MyPageEdit';
import * as userApi from "../lib/userApi";
import { useEffect } from 'react';

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
`

const StyledTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
  position: relative;
  margin-bottom: 3%;
  display: inline-block;

  &::after {
    content:'';
    width: 100%;
    height: 2px;
    background-color:lightgray;
    display: block;
    position: absolute;
  }
`
const StyledUserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`
const StyledUserInfoWrap = styled.form`
  position: relative;
  padding-bottom: 2%;
  &::after {
    content:'';
    width: 100%;
    height: 2px;
    background-color:lightgray;
    display: block;
    position: absolute;
    bottom: 0;
}
`
const StyledButton = styled.button`
  border: none;
  position: relative;
  background: none;
  text-decoration: underline;
  font-size: 1rem;
`

const MyPage = () => {
  const [userInfo, setUserInfo] = useState({}); 
  
  const getUserInfo = async () => {
    const getToken = localStorage.getItem('token');
    const res = await userApi.get("//localhost:3500/api/me", {
      headers: {
        authorization: getToken,
      },
    });
    setUserInfo({
      name: res.data.name,
      tel: res.data.phoneNum,
      email: res.data.email
    })
  }
  
  useEffect(() => {
    getUserInfo();
  },[])

  const {name, tel, email, password} = userInfo;

  const list = [
    {
     id:"name",
     title: "이름",
     name: `${name}`,
    },
    {
      id:"tel",
      title:"전화번호",
      name: `${tel}`,
    },
    {
      id:"email",
      title:"이메일",
      name: `${email}`,
    },
    {
      id:"password",
      title:"비밀번호",
      name: `${password}`,
    }
  ]

  return (
    <Container>
      <StyledTitle>내 정보 관리</StyledTitle>
      {list.map((item) => (
        <MyPageEdit 
          key={item.id}
          id={item.id}
          name={item.name}
          title={item.title}
        />
      ))}
      <StyledUserInfoWrap>
        <div><h4>회원탈퇴</h4></div>
          <StyledUserInfo>
            <span>탈퇴 시 복구 할 수 없습니다.</span>
              <StyledButton>회원탈퇴</StyledButton>
          </StyledUserInfo>
      </StyledUserInfoWrap>
    <button>저장하기</button>
    <button>취소</button>
    </Container>
  )
}

export { MyPage, StyledButton, StyledUserInfo, StyledUserInfoWrap };