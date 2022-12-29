import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import FarmFormat from '../components/FarmFormat';
import FarmReservationTable from '../components/FarmReservationTable';
import { StyledTitle } from '../styles/Styled';

const Subject = styled(StyledTitle)`
	display: flex;
	justify-content: center;
	min-width: 760px;
`;

const FarmReservation = () => {
	return (
		<>
			<FarmFormat>
				<Subject>예약관리</Subject>
				<FarmReservationTable />
			</FarmFormat>
		</>
	);
};

export default FarmReservation;
