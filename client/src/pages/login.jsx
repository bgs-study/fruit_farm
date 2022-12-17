import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../components/Modal";
import axios from "axios";
import * as userApi from "../lib/userApi";
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

const Button = styled.button`
  width: 100%;
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
  const [modalOpen, setModalOpen] = useState(true);

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
    formState: { isSubmitting, errors }, // isSubmitting: 제출중인지 여부
  } = useForm({ mode: "onChange", resolver: yupResolver(formSchema) });

  const navigate = useNavigate();

  const loginUser = async (data) => {
    try {
      console.log("전달되는 데이터", data);
      const res = await userApi.post("//localhost:3500/api/login", data);

      if(res.status !== 200) {
        alert("로그인 실패");
        window.location.assign = "/login";
      }
      
      const token = res.data.token;
      // const refreshToken = res.data.refreshToken;

      localStorage.setItem("token", token);
      localStorage.setItem("loggedIn", "true");
      // // 기본 페이지로 이동
      alert(`로그인되었습니다.`);
      navigate("/");
    } catch (err) {
      console.error("로그인 실패", err);
    }
  };

  return (
    <>
      {modalOpen && (
        <Modal setModalOpen={setModalOpen}>
          <ModalTitle>로그인</ModalTitle>
          <InputForm onSubmit={handleSubmit((data) => loginUser(data))}>
            <Label htmlFor="email">이메일</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && <small role="alert">{errors.email.message}</small>}

            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="영문, 숫자, 특수문자 조합 최소 8자"
              {...register("password")}
            />
            {errors.password && (
              <small role="alert">{errors.password.message}</small>
            )}
            <Button type="submit" disabled={isSubmitting}>
              로그인
            </Button>
          </InputForm>

          <Link to="/register">
            <Button>회원가입</Button>
          </Link>
          <Line />
          <SocialLogin>
            <SocialButton>카카오</SocialButton>
            <SocialButton>구글</SocialButton>
          </SocialLogin>
        </Modal>
      )}
    </>
  );
}

export default Login;
