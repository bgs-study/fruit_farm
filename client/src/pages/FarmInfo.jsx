import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FarmFormat from '../components/FarmFormat';
import CreateFarm from '../components/CreateFarm';
import EditFarm from '../components/EditFarm';

function FarmInfo() {
	// todo 혜실: 로그인에서 farmid 받아오기 구현 예정
	const farmid = null;
	const [farmData, setFarmData] = useState({});

	const GetFarmData = async () => {
		try {
			const res = await axios.get(`http://localhost:3500/api/farms/${farmid}`);
			const data = await res.data;
			console.log(data);
			setFarmData(data);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		GetFarmData();
	}, []);

	return (
		<>
			<FarmFormat>
				{farmid ? (
					<EditFarm data={farmData}></EditFarm>
				) : (
					<CreateFarm></CreateFarm>
				)}
			</FarmFormat>
		</>
	);
}

export default FarmInfo;
