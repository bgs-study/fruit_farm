import React, { useState } from 'react';
import FarmInputForm from './FarmInputForm';
import FarmForm from './FarmForm';
import styled from 'styled-components';

const Button = styled.button``;

function CreateFarm({ farmData }) {
	const [farmInfo, setFarmInfo] = useState(false);
	const [onInput, setOnInput] = useState();
	const [saveInfo, setSaveInfo] = useState(false);

	const onEdit = () => {
		setFarmInfo(true);
	};

	const NullFarm = () => {
		return (
			<>
				<p>
					농장이 없습니다.
					<br />
					새로 등록해주세요.
				</p>
				<button onClick={() => onEdit()}>등록하기</button>
			</>
		);
	};
	const onSave = () => {
		setSaveInfo(true);
	};

	return (
		<>
			{farmInfo ? (
				<div>
					{saveInfo ? (
						<div>
							<FarmForm farmData={farmData}></FarmForm>
							<Button>수정</Button>
						</div>
					) : (
						<div>
							<FarmInputForm></FarmInputForm>
							<Button onClick={() => onSave()}>완료</Button>
						</div>
					)}
				</div>
			) : (
				<NullFarm></NullFarm>
			)}
		</>
	);
}

export default CreateFarm;
