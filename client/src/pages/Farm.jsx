import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import FarmFormat from '../components/FarmFormat';
import MyFarm from './MyFarm';

const Subject = styled.h2`
	text-align: center;
	margin-top: 7%;
	margin-bottom: 3%;
`;

const FarmManagement = () => {
	const [reservation, setReservation] = useState(null);
	const fetchData = async () => {
		try {
			await axios.get('/reservation.json').then((res) => {
				console.log(res.data);
				setReservation(res.data);
			});
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<FarmFormat>
				{/* <Subject>농장 정보</Subject> */}
				<MyFarm></MyFarm>
			</FarmFormat>
		</>
	);
};

export default FarmManagement;
