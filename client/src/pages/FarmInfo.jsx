import React, { useEffect, useState } from 'react';
import CreateFarm from '../components/CreateFarm';
import EditFarm from '../components/EditFarm';
import * as userApi from '../lib/userApi';
// import { createSlice, configureStore } from '@reduxjs/toolkit';
// import { configureStore } from '@reduxjs/toolkit';

// const initialState = {
// 	farmData: {},
// };
// const farmSlice = createSlice({
// 	name: 'farmSlice',
// 	initialState,
// 	reducers: {
// 		get(state) {
// 			state;
// 		},
// 		push(state) {},
// 	},
// });

function FarmInfo() {
	const [farmid, setFarmid] = useState(null);
	const [farmData, setFarmData] = useState({});

	useEffect(() => {
		GetFarmData();
	}, []);

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

	return (
		<>
			{farmid === null ? (
				<CreateFarm></CreateFarm>
			) : (
				<EditFarm farmData={farmData}></EditFarm>
			)}
		</>
	);
}

export default FarmInfo;
