import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as userApi from '../lib/userApi';
// 입력 폼, 유효성 검사 패키지
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema } from '../hooks/useForm';
import { SubmitButton, Input } from '../styles/Styled';

const Title = styled.h1`
	text-align: center;
	font-size: 2rem;
	font-weight: bold;
`;

const InputForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	margin-top: 3%;
`;

const InputFormLine = styled.div`
	margin-bottom: 10px;
`;

const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: end;
`;

const Label = styled.label``;

const RegisterInput = styled(Input)`
	margin-left: 5px;
	width: 300px;
`;

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const RegisterBtn = styled(SubmitButton)`
	width: 15rem;
`;

const Line = styled.div`
	content: '  ';
	display: block;
	width: 600px;
	height: 0.5px;
	background-color: #b1b0ac;
	margin: 3% 0 1% 0;
`;

const LinkDiv = styled.div`
	width: 600px;
	display: flex;
	justify-content: flex-end;
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

			await userApi.post(`/api/signup`, joinData).then((res) => {
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

			await userApi.post(`/api/farmers/signup`, joinData).then((res) => {
				alert(`정상적으로 농장주 가입되었습니다.`);
				navigate('/login');
			});
		} catch (err) {
			alert(err.response.data.message);
		}
	};

	return (
		<>
			<Title>회원가입</Title>
			<InputForm>
				<InputWrapper>
					<InputFormLine>
						<Label htmlFor="email">이메일</Label>
						<RegisterInput id="email" type="email" {...register('email')} />
					</InputFormLine>
					{errors.email && <small role="alert">{errors.email.message}</small>}
					<InputFormLine>
						<Label htmlFor="password">비밀번호</Label>
						<RegisterInput
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
						<RegisterInput
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
						<RegisterInput id="name" {...register('name')} />
					</InputFormLine>
					{errors.name && <small role="alert">{errors.name.message}</small>}
					<InputFormLine>
						<Label htmlFor="phoneNum">전화번호</Label>
						<RegisterInput
							id="phoneNum"
							placeholder="숫자만 입력해주세요"
							{...register('phoneNum')}
						/>
					</InputFormLine>
					{errors.phoneNum && (
						<small role="alert">{errors.phoneNum.message}</small>
					)}
				</InputWrapper>
				<ButtonWrapper>
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
				</ButtonWrapper>
				<Line />
				<LinkDiv>
					<Link to="/login">로그인하기</Link>
				</LinkDiv>
			</InputForm>
		</>
	);
}

export default Register;
