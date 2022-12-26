import React, { useEffect, useState } from 'react';
import CreateFarm from '../components/CreateFarm';
import EditFarm from '../components/EditFarm';
import * as userApi from '../lib/userApi';

function MyFarm() {
	const [farmid, setFarmid] = useState(null);
	const [farmData, setFarmData] = useState({});

	const GetFarmData = async () => {
		try {
			const res = await userApi.get(
				'http://localhost:3500/api/farms/farminformation',
			);
			const data = await res.data;
			console.log(data);
			console.log(data.farmInfo.id);
			setFarmid(data.farmInfo.id);
			setFarmData(data);
		} catch (e) {
			console.log(e);
		}
	};
	useEffect(() => {
		GetFarmData();
	}, []);

	// memo 혜실: 농장정보를 받아와서 farmid가 없으면 농장등록을 보여주고, 있으면 농장정보를 보여줌
	return (
		<>
			{farmid === null ? (
				<CreateFarm farmData={farmData}></CreateFarm>
			) : (
				<EditFarm farmData={farmData}></EditFarm>
			)}
		</>
	);
}

export default MyFarm;
