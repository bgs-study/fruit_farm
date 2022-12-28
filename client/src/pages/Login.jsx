import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as userApi from '../lib/userApi';
// 입력 폼, 유효성 검사 패키지
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginformSchema } from '../hooks/useForm';
import { SubmitButton, Input } from '../styles/Styled';
import { HOST } from './../global-variables';

const LoginWrapper = styled.div`
	padding: 10%;
`;

const Title = styled.h1`
	text-align: center;
	font-size: 2rem;
	font-weight: bold;
	position: relative;
	margin-bottom: 2%;
`;

const InputForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 40px auto;
	width: 320px;
`;

const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: end;
`;

const InputFormLine = styled.div`
	margin-bottom: 10px;
`;

const Label = styled.label``;

const LoginInput = styled(Input)`
	margin-left: 5px;
	width: 250px;
`;

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const SubmitBtn = styled(SubmitButton)`
	width: 150px;
	height: 40px;
	padding: 1rem 1rem;
`;

const Line = styled.div`
	display: block;
	width: 100%;
	height: 0.5px;
	background-color: #b1b0ac;
	margin: 5% 0;
`;

function Login() {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors }, // isSubmitting: 제출중인지 여부
	} = useForm({ mode: 'onChange', resolver: yupResolver(loginformSchema) });

	const loginUser = async (data) => {
		try {
			const res = await userApi.post(`${HOST}/api/login`, data);
			const token = res.data.token;

			localStorage.setItem('token', token);
			localStorage.setItem('userType', 'member');

			alert(`회원님 환영합니다!`);
			navigate('/');
		} catch (err) {
			alert(err.response.data.message);
		}
	};

	const loginFarmer = async (data) => {
		try {
			const res = await userApi.post(`${HOST}/api/farmers/login`, data);
			const token = res.data.token;

			localStorage.setItem('token', token);
			localStorage.setItem('userType', 'farmer');

			alert(`농장주님 환영합니다!`);
			navigate('/');
		} catch (err) {
			alert(err.response.data.message);
			console.log(err);
		}
	};

	return (
		<LoginWrapper>
			<Title>로그인</Title>
			<InputForm>
				<InputWrapper>
					<InputFormLine>
						<Label htmlFor="email">이메일</Label>
						<LoginInput id="email" type="email" {...register('email')} />
					</InputFormLine>
					{errors.email && <small role="alert">{errors.email.message}</small>}
					<InputFormLine>
						<Label htmlFor="password">비밀번호</Label>
						<LoginInput
							id="password"
							type="password"
							placeholder="영문, 숫자, 특수문자 조합 최소 8자"
							{...register('password')}
						/>
					</InputFormLine>
					{errors.password && (
						<small role="alert">{errors.password.message}</small>
					)}
				</InputWrapper>
				<ButtonWrapper>
					<SubmitBtn
						type="submit"
						disabled={isSubmitting}
						onClick={handleSubmit((data) => loginUser(data))}
					>
						일반 회원 로그인
					</SubmitBtn>
					<SubmitBtn
						type="submit"
						disabled={isSubmitting}
						onClick={handleSubmit((data) => loginFarmer(data))}
					>
						농장주 로그인
					</SubmitBtn>
				</ButtonWrapper>
			</InputForm>
			<Line />
			<Link to="/register">회원가입하기</Link>
		</LoginWrapper>
	);
}

export default Login;
