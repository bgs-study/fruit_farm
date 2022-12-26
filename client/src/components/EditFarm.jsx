import React, { useState } from 'react';
import styled from 'styled-components';
import FarmForm from './FarmForm';
import FarmInputForm from './FarmInputForm';

const Button = styled.button``;

function EditFarm({ farmData }) {
	const [onChange, setOnChange] = useState(false);

	// memo 혜실: 농장 내용을 보여주고, 수정 버튼을 누르면 기존에 작성한 농장 내용이 담긴 농장등록 폼이 나옴
	return (
		<>
			{onChange ? (
				<div>
					<FarmInputForm farmData={farmData}></FarmInputForm>
				</div>
			) : (
				<div>
					<FarmForm farmData={farmData}></FarmForm>
					<Button onClick={setOnChange((props) => !props)}>수정</Button>
				</div>
			)}
		</>
	);
}

export default EditFarm;
