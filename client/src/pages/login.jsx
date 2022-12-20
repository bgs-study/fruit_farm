import React, { useEffect } from 'react';
import styled from 'styled-components';
import ModalContainer from '../components/Modal';
import * as userApi from '../lib/userApi';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal, showRegister } from '../store/ModalSlice';
// 입력 폼, 유효성 검사 패키지
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginformSchema } from '../hooks/useForm';

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
	const loginModalState = useSelector((state) => state.modal.loginModal);
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting, errors }, // isSubmitting: 제출중인지 여부
	} = useForm({ mode: 'onChange', resolver: yupResolver(loginformSchema) });

	const loginUser = async (data) => {
		try {
			const res = await userApi.post('//localhost:3500/api/login', data);
			const token = res.data.token;

			localStorage.setItem('token', token);
			localStorage.setItem('loggedIn', 'true');

			alert(`로그인 되었습니다.`);
			dispatch(closeModal());
		} catch (err) {
			alert(err.response.data.message);
		}
	};

	useEffect(() => {
		reset({
			data: {},
		});
	}, [loginModalState]);

	if (loginModalState) {
		return (
			<>
				<ModalContainer>
					<ModalTitle>로그인</ModalTitle>
					<InputForm onSubmit={handleSubmit((data) => loginUser(data))}>
						<Label htmlFor="email">이메일</Label>
						<Input id="email" type="email" {...register('email')} />
						{errors.email && <small role="alert">{errors.email.message}</small>}

						<Label htmlFor="password">비밀번호</Label>
						<Input
							id="password"
							type="password"
							placeholder="영문, 숫자, 특수문자 조합 최소 8자"
							{...register('password')}
						/>
						{errors.password && (
							<small role="alert">{errors.password.message}</small>
						)}
						<Button type="submit" disabled={isSubmitting}>
							로그인
						</Button>
					</InputForm>
					<Button onClick={() => dispatch(showRegister())}>회원가입</Button>
					<Line />
					<SocialLogin>
						<SocialButton>카카오</SocialButton>
						<SocialButton>구글</SocialButton>
					</SocialLogin>
				</ModalContainer>
			</>
		);
	}
}

export default Login;
