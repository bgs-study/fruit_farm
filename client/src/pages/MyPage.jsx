import { useState } from 'react';
import styled from 'styled-components';
import MyPageEdit from '../components/MyPageEdit';
import * as userApi from "../lib/userApi";
import { useEffect } from 'react';
import { getToken } from '../utils/utils';
// 입력 폼, 유효성 검사 패키지
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {formSchema} from '../hooks/useForm';

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
const StyledUserInfoWrap = styled.div`
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
  const [change, setChange] = useState(false);

  const getUserInfo = async () => {
    const token = getToken();
    const res = await userApi.get("//localhost:3500/api/myInfo", {
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

	const {
		register,
		handleSubmit,
		reset,
		formState: { isValid, errors }, // 제출중이라면 가입하기 버튼 disabled됨
	} = useForm({ mode: 'onChange', resolver: yupResolver(formSchema) });

  const upDatePassword = async({oldpassword, password}) => {
    
    try {
      await userApi.passwordPatch(`//localhost:3500/api/myPasword/${id}`, {
        currentPassword: oldpassword,
        password: password,
      }); 
    } catch (err) {
      console.log(err.response.data.Error)
    }
    
  }

  return (
    <Container>
      <StyledTitle>내 정보 관리</StyledTitle>
      {list.map((item) => (
        <MyPageEdit 
          key={item.id}
          id={item.id}
          name={item.name}
          title={item.title}
          userId={id}
        />
      ))}
      <StyledUserInfoWrap>
        <div><h4>비밀번호</h4></div>
          <StyledUserInfo>
            {!change ? <span></span> : (<form onSubmit={handleSubmit((data) => upDatePassword(data))}>
              <label>현재비밀번호</label>
              <input type="password" name="currentPassword" {...register('oldpassword')}></input>
              <label>새비밀번호</label>
              <input type="password"  name="newPassword" {...register('password')}></input>
              
						{errors.password && (
							<small role="alert">{errors.password.message}</small>
						)}
              <input type="password" placeholder='비밀번호 확인' {...register('passwordConfirm')}></input>
              {errors.passwordConfirm && (
							<small role="alert">{errors.passwordConfirm.message}</small>
						)}
              <button type="submit" disabled={!isValid}>저장</button>
              </form>
            )}
              <StyledButton onClick={(e) => {
                setChange(prev => !prev)
                }}>{!change ? '비밀번호재설정' : '취소'}</StyledButton>
          </StyledUserInfo>
      </StyledUserInfoWrap>
      <StyledUserInfoWrap>
        <div><h4>회원탈퇴</h4></div>
          <StyledUserInfo>
            <span>탈퇴 시 복구 할 수 없습니다.</span>
              <StyledButton>회원탈퇴</StyledButton>
          </StyledUserInfo>
      </StyledUserInfoWrap>
    </Container>
  )
}


export { MyPage, StyledButton, StyledUserInfo, StyledUserInfoWrap };