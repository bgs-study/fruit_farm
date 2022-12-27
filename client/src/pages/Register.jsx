import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as userApi from '../lib/userApi';
// 입력 폼, 유효성 검사 패키지
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema } from '../hooks/useForm';

const RegisterWrapper = styled.div`
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

const RegisterBtn = styled.button`
	width: 30%;
`;

function Register() {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		// memo 지우: 제출중이라면 가입하기 버튼 disabled됨
		formState: { isSubmitting, errors },
	} = useForm({ mode: 'onChange', resolver: yupResolver(formSchema) });

	const joinUser = async ({ email, name, password, phoneNum }) => {
		try {
			const joinData = { email, password, phoneNum, name };

			await userApi
				.post('//localhost:3500/api/signup', joinData)
				.then((res) => {
					alert(`정상적으로 회원 가입되었습니다.`);
					navigate('/login');
				});
		} catch (err) {
			alert(err.response.data.message);
		}
	};

	const joinFarmer = async ({ email, name, password, phoneNum }) => {
		try {
			const joinData = { email, password, phoneNum, name };

			await userApi
				.post('//localhost:3500/api/farmers/signup', joinData)
				.then((res) => {
					alert(`정상적으로 농장주 가입되었습니다.`);
					navigate('/login');
				});
		} catch (err) {
			alert(err.response.data.message);
		}
	};

	return (
		<RegisterWrapper>
			<Title>회원가입</Title>
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
				<InputFormLine>
					<Label htmlFor="password">비밀번호 확인</Label>
					<Input
						placeholder="비밀번호를 다시 입력해주세요"
						type="password"
						{...register('passwordConfirm')}
					/>
				</InputFormLine>
				{errors.passwordConfirm && (
					<small role="alert">{errors.passwordConfirm.message}</small>
				)}
				<InputFormLine>
					<Label htmlFor="name">이름</Label>
					<Input id="name" {...register('name')} />
				</InputFormLine>
				{errors.name && <small role="alert">{errors.name.message}</small>}
				<InputFormLine>
					<Label htmlFor="phoneNum">전화번호</Label>
					<Input
						id="phoneNum"
						placeholder="숫자만 입력해주세요"
						{...register('phoneNum')}
					/>
				</InputFormLine>
				{errors.phoneNum && (
					<small role="alert">{errors.phoneNum.message}</small>
				)}

				<RegisterBtn
					type="submit"
					disabled={isSubmitting}
					onClick={handleSubmit((data) => joinUser(data))}
				>
					일반 회원 가입하기
				</RegisterBtn>
				<RegisterBtn
					type="submit"
					disabled={isSubmitting}
					onClick={handleSubmit((data) => joinFarmer(data))}
				>
					농장주 가입하기
				</RegisterBtn>
			</InputForm>
			<Link to="/login">로그인하기</Link>
		</RegisterWrapper>
	);
}

export default Register;
