import React from "react";
import styled from "styled-components";
import Modal from "../components/modal";
// 입력 폼, 유효성 검사 패키지
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const ModalTitle = styled.h1`
  color: blue;
  text-align: center;
  font-size: 1.5rem;
`;

const InputForm = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10% 0;
`;

const Label = styled.label``;

const Input = styled.input``;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  + button {
    margin-top: 2%;
  }
`;

const Line = styled.div`
  content: "  ";
  display: block;
  width: 100%;
  height: 0.5px;
  background-color: gray;
  margin: 5% 0;
`;

const SocialLogin = styled.div`
  display: flex;
  justify-content: center;
`;
const SocialButton = styled.button`
  + button {
    margin-left: 1rem;
  }
`;

function Login() {
  const formSchema = yup.object({
    email: yup
      .string()
      .required("이메일을 입력해주세요")
      .email("이메일 형식이 아닙니다."),
    password: yup
      .string()
      .required("영문, 숫자, 특수문자를 포함해서 입력해주세요.")
      .min(8, "최소 8자 이상 입력해주세요")
      .max(15, "최대 15자 까지만 가능합니다")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,15}$/,
        "영문, 숫자, 특수문자를 포함하여 입력해주세요."
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }, // 제출중이라면 가입하기 버튼 disabled됨
  } = useForm({ mode: "onChange", resolver: yupResolver(formSchema) });

  return (
    <>
      <Modal>
        <ModalTitle>로그인</ModalTitle>
        <InputForm>
          <Label htmlFor="email">이메일</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && <small role="alert">{errors.email.message}</small>}

          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            placeholder="영문, 숫자, 특수문자 조합 최소 8자"
            {...register("password")}
          />
          {errors.password && (
            <small role="alert">{errors.password.message}</small>
          )}
        </InputForm>
        <ButtonWrapper>
          <Button>로그인</Button>
          <Button>회원가입하기</Button>
        </ButtonWrapper>
        <Line />
        <SocialLogin>
          <SocialButton>카카오</SocialButton>
          <SocialButton>구글</SocialButton>
        </SocialLogin>
      </Modal>
    </>
  );
}

export default Login;
