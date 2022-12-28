import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SubmitButton } from '../styles/Styled';

const Wrapper = styled.div`
	margin-top: 10%;
	width: 100%;
`;

const Div = styled.div`
	font-size: 1.5rem;
	text-align: center;
	margin-bottom: 5%;
`;

const CreateFarm = ({ farmData }) => {
	return (
		<Wrapper>
			<Div>
				농장이 없습니다.
				<br />
				새로 등록해주세요.
			</Div>
			<Div>
				<Link to="/farm/edit">
					<SubmitButton>등록하기</SubmitButton>
				</Link>
			</Div>
		</Wrapper>
	);
};

export default CreateFarm;
