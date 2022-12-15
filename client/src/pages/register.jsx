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

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 10% 0;
`;

const Label = styled.label``;

const Input = styled.input``;

const RegisterBtn = styled.button`
  width: 100%;
`;

const LoginBtn = styled.button``;

function Register() {
  // 입력값 유효성 검사할 형태
  const formSchema = yup.object({
    email: yup
      .string()
      .required("이메일을 입력해주세요")
      .email("이메일 형식이 아닙니다."),
    password: yup
      .string()
      .required("영문, 숫자, 특수문자를 포함해서 입력해주세요.")
      .min(8, "최소 8자 이상 가능합니다")
      .max(15, "최대 15자 까지만 가능합니다")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,15}$/,
        "영문, 숫자, 특수문자를 포함하여 입력해주세요."
      ),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "비밀번호가 다릅니다."),
    name: yup
      .string("문자를 입력해주세요")
      .required("이름을 입력해주세요")
      .min(2, "최소 2자 이상 가능합니다")
      .max(15, "최대 15자까지 가능합니다"),
    phoneNumber: yup
      .string()
      .matches(/^[0-9]+$/, "숫자만 입력주세요")
      .min(5, "5자 이상의 전화번호를 입력해주세요")
      .max(15, "15자 미만의 전화번호를 입력해주세요"),
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }, // 제출중이라면 가입하기 버튼 disabled됨
  } = useForm({ mode: "onChange", resolver: yupResolver(formSchema) });

  return (
    <>
      <Modal>
        <ModalTitle>회원가입</ModalTitle>
        <InputForm
          onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}
        >
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

          <Input
            placeholder="비밀번호를 다시 입력해주세요"
            {...register("passwordConfirm")}
          />
          {errors.passwordConfirm && (
            <small role="alert">{errors.passwordConfirm.message}</small>
          )}

          <Label htmlFor="name">이름</Label>
          <Input id="name" {...register("name")} />
          {errors.name && <small role="alert">{errors.name.message}</small>}

          <Label htmlFor="phoneNumber">전화번호</Label>
          <Input
            id="phoneNumber"
            placeholder="숫자만 입력해주세요"
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && (
            <small role="alert">{errors.phoneNumber.message}</small>
          )}

          <RegisterBtn type="submit" disabled={isSubmitting}>
            가입하기
          </RegisterBtn>
        </InputForm>
        <LoginBtn>로그인하기</LoginBtn>
      </Modal>
    </>
  );
}

export default Register;
