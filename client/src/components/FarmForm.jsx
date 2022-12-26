import React from 'react';
import styled from 'styled-components';

const Tittle = styled.h1``;

const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

const Label = styled.label``;

const Context = styled.p``;

function FarmForm({ farmData }) {
	console.log(farmData);

	return (
		<>
			{farmData && (
				<div>
					<Tittle></Tittle>
					<Form>
						<Label>과일종류</Label>
						<Context>{farmData.farmInfo.type}</Context>
						<Label>농장명</Label>
						<Context>{farmData.farmInfo.name}</Context>
						<Label>농장주소</Label>
						<Context>{farmData.farmInfo.address}</Context>
						<Label>이미지</Label>
						<Context>{farmData.farmInfo.url}</Context>
						<Context>{farmData.farmInfo.url}</Context>
						<Context>{farmData.farmInfo.url}</Context>
						<Label>체험설명</Label>
						<Context>{farmData.farmInfo.description}</Context>
						<Label>농장주명</Label>
						<Context>{farmData.farmInfo.owner}</Context>
					</Form>
				</div>
			)}
		</>
	);
}

export default FarmForm;
