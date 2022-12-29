import { useState, useEffect, useRef, useCallback } from 'react';
import * as userApi from "../lib/userApi";
import { useNavigate } from 'react-router-dom';
// 입력 폼, 유효성 검사 패키지
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {userformSchema} from '../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import ModalContainer from './Modal';
import { showModal } from '../store/ModalSlice';
import { closeModal } from '../store/ModalSlice';
import { logout } from '../utils/utils';
import styled from 'styled-components'
import { AiOutlineLock } from "react-icons/ai";
import { AiOutlineUserDelete } from "react-icons/ai";
import { 
  SubmitButton, 
  Input, 
  StyledSubTitle, 
  StyledParagraph, 
  ConfirmButton,
  DeleteButton,
  StyledConfirmModal,
} from '../styles/Styled';

const StyledForm = styled.form`
 display: flex;
 flex-direction: column;
`
const StyledLable = styled.label`
  margin-top:2%;
  font-weight: 500;
`
const StyledSubHeading = styled.p`
  margin: 10px 0px;
  font-weight: 400;
  color: gray;
`
const StyledUserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`
const StyledUserInfoWrap = styled.div`
  padding-bottom: 1%;
  &::after {
    content:'';
    height: 1px;
    background-color:lightgray;
    display: block;
    margin-top: 5px;
}
`

const MyPageProfileEdit = ({id, name, title, userId, loading}) => {
  const [reName, setReName] = useState({});
  const [change, setChange] = useState(false);
  const textInput = useRef();
  const navigate = useNavigate();

  const setReplaceName = useCallback(() => {
    setReName({
      value: name,
    });
  },[name]);

  useEffect(() => {
    setReplaceName();
  },[setReplaceName]);
 
  const changeEditMode = (e) => {
    setChange(cur => !cur);
  };

  const upDateComponents = async() => {
    if(textInput.current.dataset.id === "email"){
      
    }
    try {
      setChange(cur => !cur);
      setReName({
      ...reName,
      value: textInput.current.value,
      });
     await userApi.patch(`/api/myInfo/${userId}`, {
      [textInput.current.dataset.id]: textInput.current.value,
      }); 
    } catch(err) {
      alert(err.response.data.message)
    }
    
    navigate('/mypage')
  }

  const DefaultView = () => {
    return (
      <StyledUserInfo>
        <div><span>{loading ? "..." : reName.value}</span></div>
        <div>
          <ConfirmButton onClick={changeEditMode}>수정</ConfirmButton> 
        </div>
      </StyledUserInfo>
    )
  };

  const RenderEditView = () => {
    return (
      <StyledUserInfo>
        <div>
          <Input 
            id={id}
            name={id} 
            type={id === "password" ? "password" : "text"} 
            defaultValue={reName.value}
            ref={textInput}
            data-id={id}
          />
        </div>
        <div>
          <ConfirmButton onClick={upDateComponents}>확인</ConfirmButton> 
          <ConfirmButton onClick={changeEditMode} reject>취소</ConfirmButton>
        </div>
      </StyledUserInfo>
    )
  };

  return(
    <StyledUserInfoWrap>
      <StyledSubHeading>{title}</StyledSubHeading>
      {change ? <RenderEditView/> : <DefaultView />}
    </StyledUserInfoWrap>  
  )
}

const MyPageSecurityEdit = ({userId}) => {
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.modal.modal);
  const [modalPassword, setModalPassword]= useState(false);
  const [modalConfirm, setModalConfirm]= useState(false);
  const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm({ mode: 'onChange', resolver: yupResolver(userformSchema) });

  const upDatePassword = async({oldpassword, password}) => {
    try {
      await userApi.patch(`/api/myPassword/${userId}`, {
        currentPassword: oldpassword,
        password: password,
      }); 
      alert('비밀번호가 변경되었습니다. 다시 로그인 해주세요.');
      dispatch(closeModal());
      logout();
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const deleteUser = async() => {
    try {
      await userApi.delete(`/api/myInfo/${userId}`);
      logout();
    } catch (err) {
      console.log(err.response.data.Error)
    }
  };

  return (
    <>
      <StyledUserInfoWrap>
          <StyledUserInfo>
            <StyledParagraph>
              <AiOutlineLock />
              비밀번호
            </StyledParagraph>
            <>
              {modalPassword && modalOpen &&
                <ModalContainer w="400px" h="450px" overflow="auto">
                  <StyledSubTitle>비밀번호 변경</StyledSubTitle>
                  <StyledForm>
                  <StyledLable>현재비밀번호</StyledLable>
                  <Input 
                    type="password" 
                    name="currentPassword" 
                    {...register('oldpassword')}/>
                  <StyledLable>새비밀번호</StyledLable>
                  <Input 
                    type="password" 
                    name="newPassword" 
                    {...register('password')} />
                  {errors.password && (
                    <small role="alert">{errors.password.message}</small>
                  )}
                  <Input 
                    type="password" 
                    name="newPasswordConfirm" 
                    placeholder='비밀번호 확인' 
                    {...register('passwordConfirm')}/>
                  {errors.passwordConfirm && (
                  <small role="alert">{errors.passwordConfirm.message}</small>
                  )}
                  <SubmitButton 
                    type="submit" 
                    disabled={isSubmitting}
                    onClick={handleSubmit(data => {
                    upDatePassword(data)})}
                  >저장
                  </SubmitButton>
                  </StyledForm>
                </ModalContainer>
              }
            </>
            <ConfirmButton 
              type="button" 
              onClick={() => {
              dispatch(showModal());
              setModalPassword(prev => !prev);
              setModalConfirm(false);
            }}>
              비밀번호재설정
            </ConfirmButton>
          </StyledUserInfo>
      </StyledUserInfoWrap>
      <StyledUserInfoWrap>
          <StyledUserInfo>
            <StyledParagraph>
              <AiOutlineUserDelete/>
              회원탈퇴
            </StyledParagraph>
            <DeleteButton onClick={() => {
              dispatch(showModal());
              setModalConfirm(prev => !prev);
              setModalPassword(false);
            }}>회원탈퇴</DeleteButton>
            {modalConfirm && modalOpen && 
              <ModalContainer w="320px" h="160px">
                <StyledConfirmModal>
                <p>탈퇴 시 복구할 수 없습니다. <br />
                  탈퇴하시겠습니까?</p>
                <ConfirmButton onClick={deleteUser}>확인</ConfirmButton>
                <ConfirmButton reject>취소</ConfirmButton>
                </StyledConfirmModal>
              </ModalContainer>}
          </StyledUserInfo>
      </StyledUserInfoWrap>
      </>
    )
}

export{MyPageProfileEdit, MyPageSecurityEdit}
