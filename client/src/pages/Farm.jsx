import React, { useEffect, useState } from 'react';
import FarmFormat from '../components/FarmFormat';
import CreateFarm from '../components/CreateFarm';
import ShowFarm from '../components/ShowFarm';
import * as API from '../lib/userApi';

function MyFarm() {
	const [farmData, setFarmData] = useState(null);

	const fetchData = async () => {
		try {
			await API.get('/api/farmers/farmInfo').then((res) => {
				if (res.data) {
					setFarmData(res.data);
				}
			});
		} catch (e) {
			console.error(e.response.data.message);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	// memo 지우: 농장정보 있으면 정보페이지, 없으면 등록요청페이지 출력
	return (
		<FarmFormat>
			{farmData && <ShowFarm farmData={farmData} />}
			{!farmData && <CreateFarm />}
		</FarmFormat>
	);
}

export default MyFarm;
