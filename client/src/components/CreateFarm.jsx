import React, { useState } from 'react';
import FarmNullInputForm from './FarmNullInputForm';
import FarmForm from './FarmForm';
import styled from 'styled-components';

const Button = styled.button``;

function CreateFarm({ farmData }) {
	const [isAddFarm, setIsAddFarm] = useState(false);
	const [saveInfo, setSaveInfo] = useState(false);

	const NullFarm = () => {
		return (
			<>
				<p>
					농장이 없습니다.
					<br />
					새로 등록해주세요.
				</p>
				<button onClick={() => onAddFarm()}>등록하기</button>
			</>
		);
	};
	const onAddFarm = () => {
		setIsAddFarm(true);
	};
	//memo 혜실 : 등록하기 버튼을 누르면 빈 농장등록 폼이 나오고, 등록하면 농장 내용을 볼 수 있음
	return (
		<>
			{isAddFarm ? (
				<div>
					{saveInfo ? (
						<div>
							<FarmForm farmData={farmData}></FarmForm>
							<Button>수정</Button>
						</div>
					) : (
						<FarmNullInputForm />
					)}
				</div>
			) : (
				<NullFarm></NullFarm>
			)}
		</>
	);
}

export default CreateFarm;
