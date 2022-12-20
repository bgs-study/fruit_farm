import React, { useEffect } from 'react';
import styled from 'styled-components';
import ModalContainer from '../components/Modal';
import * as userApi from '../lib/userApi';
import { useSelector, useDispatch } from 'react-redux';
import { showLogin } from '../store/ModalSlice';
// 입력 폼, 유효성 검사 패키지
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {formSchema} from '../hooks/useForm';

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
	const registerModalState = useSelector((state) => state.modal.registerModal);
	const dispatch = useDispatch();

	// 입력값 유효성 검사할 형태
	
	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting, errors }, // 제출중이라면 가입하기 버튼 disabled됨
	} = useForm({ mode: 'onChange', resolver: yupResolver(formSchema) });

	const joinUser = async ({ email, name, password, phoneNum }) => {
		try {
			const joinData = { email, password, phoneNum, name };

			const join = await userApi
				.post('//localhost:3500/api/signup', joinData)
				.then((res) => {
					alert(`정상적으로 회원가입되었습니다.`);
					dispatch(showLogin());
				});
		} catch (err) {
			alert(err.response.data.message);
		}
	};

	useEffect(() => {
		reset({
			data: {},
		});
	}, [registerModalState]);

	if (registerModalState) {
		return (
			<>
				<ModalContainer>
					<ModalTitle>회원가입</ModalTitle>
					<InputForm onSubmit={handleSubmit((data) => joinUser(data))}>
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

						<Input
							placeholder="비밀번호를 다시 입력해주세요"
							type="password"
							{...register('passwordConfirm')}
						/>
						{errors.passwordConfirm && (
							<small role="alert">{errors.passwordConfirm.message}</small>
						)}

						<Label htmlFor="name">이름</Label>
						<Input id="name" {...register('name')} />
						{errors.name && <small role="alert">{errors.name.message}</small>}

						<Label htmlFor="phoneNum">전화번호</Label>
						<Input
							id="phoneNum"
							placeholder="숫자만 입력해주세요"
							{...register('phoneNum')}
						/>
						{errors.phoneNum && (
							<small role="alert">{errors.phoneNum.message}</small>
						)}

						<RegisterBtn type="submit" disabled={isSubmitting}>
							가입하기
						</RegisterBtn>
					</InputForm>
					<LoginBtn onClick={() => dispatch(showLogin())}>로그인하기</LoginBtn>
				</ModalContainer>
			</>
		);
	}
}

export default Register;
