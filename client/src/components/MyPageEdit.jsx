import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'
import { StyledButton, StyledUserInfo, StyledUserInfoWrap } from '../pages/MyPage';

const Input = styled.input`
  border-radius: 10px;
  border: 1px solid lightgray;
  padding: 10px;
`

const MyPageEdit = ({id, name, title}) => {
  const [gname, setName] = useState({})
  const [change, setChange] = useState(false);
  const textInput = useRef();

  useEffect(() => {
    let replaceName = '';

    if(id === 'tel') {
      replaceName =  name.slice(0, 3) + "*".repeat(name.length - 6) + name.slice(-4);
    }else if(id === 'password'){
      replaceName =  "*".repeat(name.length)
    }else{
      replaceName = name;
    }
    
    setName({
      value: replaceName,
    })
  },[name])
 
  const changeEditMode = () => {
    setChange(cur => !cur)
  }

  const upDateComponents = () => {
    setChange(cur => !cur)
    setName({
      ...gname,
      value: textInput.current.value
    })
  }

  const DefaultView = () => {
    return (
      <StyledUserInfo>
        <div><span>{gname.value === undefined ? ".." : gname.value}</span></div>
        <div>
          <StyledButton onClick={changeEditMode}>수정</StyledButton> 
        </div>
      </StyledUserInfo>
    )
  }

  const RenderEditView = () => {
    return (
      <StyledUserInfo>
        <div>
          <Input 
            id={id}
            name={id} 
            type={id === "password" ? "password" : "text"} 
            defaultValue={gname.value}
            ref={textInput}
          />
        </div>
        <div>
          <StyledButton onClick={upDateComponents}>확인</StyledButton> 
          <StyledButton onClick={changeEditMode}>취소</StyledButton>
        </div>
      </StyledUserInfo>
    )
  }

  return(
    <StyledUserInfoWrap>
      <div><h4>{title}</h4></div>
      {change ? <RenderEditView/> : <DefaultView />}
    </StyledUserInfoWrap>  
  )
}

export default MyPageEdit;