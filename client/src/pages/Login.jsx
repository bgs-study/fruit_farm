import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as userApi from '../lib/userApi';
// 입력 폼, 유효성 검사 패키지
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginformSchema } from '../hooks/useForm';

const LoginWrapper = styled.div`
	padding: 10%;
`;

const Title = styled.h1`
	text-align: center;
	font-size: 2rem;
	font-weight: bold;
`;

const InputForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 10% 0;
`;

const InputFormLine = styled.div`
	margin-bottom: 10px;
`;

const Label = styled.label``;

const Input = styled.input``;

const Button = styled.button`
	width: 10rem;
`;

const Line = styled.div`
	content: '  ';
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
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors }, // isSubmitting: 제출중인지 여부
	} = useForm({ mode: 'onChange', resolver: yupResolver(loginformSchema) });

	const loginUser = async (data) => {
		try {
			const res = await userApi.post('//localhost:3500/api/login', data);
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
			const res = await userApi.post(
				'//localhost:3500/api/farmers/login',
				data,
			);
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
				<InputFormLine>
					<Label htmlFor="email">이메일</Label>
					<Input id="email" type="email" {...register('email')} />
				</InputFormLine>
				{errors.email && <small role="alert">{errors.email.message}</small>}
				<InputFormLine>
					<Label htmlFor="password">비밀번호</Label>
					<Input
						id="password"
						type="password"
						placeholder="영문, 숫자, 특수문자 조합 최소 8자"
						{...register('password')}
					/>
				</InputFormLine>
				{errors.password && (
					<small role="alert">{errors.password.message}</small>
				)}
				<Button
					type="submit"
					disabled={isSubmitting}
					onClick={handleSubmit((data) => loginUser(data))}
				>
					일반 회원 로그인
				</Button>
				<Button
					type="submit"
					disabled={isSubmitting}
					onClick={handleSubmit((data) => loginFarmer(data))}
				>
					농장주 로그인
				</Button>
			</InputForm>
			<Link to="/register">회원가입하기</Link>
			<Line />
			<SocialLogin>
				<SocialButton>카카오</SocialButton>
				<SocialButton>구글</SocialButton>
			</SocialLogin>
		</LoginWrapper>
	);
}

export default Login;
