import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FarmForm from './FarmForm';
import FarmInputForm from './FarmInputForm';

const Button = styled.button``;

function EditFarm({ farmData }) {
	const [onChange, setOnChange] = useState(false);

	useEffect(() => {
		console.log(farmData);
	}, []);

	const ChangeHandler = () => {
		setOnChange(!onChange);
	};

	return (
		<>
			{onChange ? (
				<div>
					<FarmInputForm farmData={farmData}></FarmInputForm>
				</div>
			) : (
				<div>
					<FarmForm farmData={farmData}></FarmForm>
					<Button onClick={() => ChangeHandler()}>수정</Button>
				</div>
			)}
		</>
	);
}

export default EditFarm;
