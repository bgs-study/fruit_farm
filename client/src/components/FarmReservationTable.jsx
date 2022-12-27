import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Pagination from './Pagination';
import * as API from '../lib/userApi';

const FilterWrapper = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
`;

const FilterBtn = styled.button`
	width: 5rem;
	margin-right: 0.5rem;
	font-size: 0.8rem;
`;

const FilterSelect = styled.select`
	margin-left: auto;
`;

const Table = styled.table`
	width: 100%;
	border: 1px solid black;
	border-collapse: collapse;
`;

const Thead = styled.thead``;

const Tr = styled.tr`
	border: 1px solid black;
	padding: 10px;
`;
const Td = styled.td`
	border: 1px solid black;
	padding: 10px;
`;

const BtnTd = styled.td`
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
`;

const Button = styled.button``;

const FailAnnouncement = styled.p`
	text-align: center;
	margin-top: 5rem;
`;

const FarmReservationTable = ({}) => {
	// memo 지우: 데이터 보관
	const [originalData, setOriginalData] = useState(null);
	const [filteredData, setFilteredData] = useState(null);
	// memo 지우: 예약상태 관리
	const statusList = ['전체', '예약대기', '예약완료', '예약취소', '체험완료'];
	const [statusOption, setStatusOption] = useState('전체');
	const [dateOption, setDateOption] = useState('최근순');
	// memo 지우: 페이지네이션 (offset: 데이터 시작 번호)
	const [page, setPage] = useState(1);
	const offset = (page - 1) * 10;

	// memo 지우: 모든 예약목록 받아오기
	const fetchData = async () => {
		try {
			await API.get('//localhost:3500/api/reserve/farmer').then((res) => {
				setOriginalData(res.data);
				setFilteredData(res.data);
			});
		} catch (e) {
			console.log(e.response.data.message);
		}
	};

	// memo 지우: 예약상태, 시간순 정렬로 데이터 거르기
	const filterData = () => {
		let filteredData = [...originalData];

		// memo 지우: 예약 상태에 따라 거르기
		if (statusOption !== '전체') {
			filteredData = filteredData.filter(
				(obj) => obj.reserve.status === statusOption,
			);
		}
		// memo 지우: 최근순 or 오래된순으로 정렬
		if (dateOption === '최근순') {
			filteredData.sort((a, b) => {
				let aTime = a.reserve.createdAt;
				let bTime = b.reserve.createdAt;
				if (aTime > bTime) return -1;
				if (aTime == bTime) return 0;
				if (aTime < bTime) return 1;
			});
		} else if (dateOption === '오래된순') {
			filteredData.sort((a, b) => {
				let aTime = a.reserve.createdAt;
				let bTime = b.reserve.createdAt;
				if (aTime > bTime) return 1;
				if (aTime == bTime) return 0;
				if (aTime < bTime) return -1;
			});
		}
		setFilteredData(filteredData);
		setPage(1);
	};

	// memo 지우: 예약 완료 버튼 클릭
	const onClickRezConfirm = async (e) => {
		const id = e.target.name;

		try {
			await API.patch(`//localhost:3500/api/reserve/farmer/${id}`, {
				status: '예약완료',
			});
			alert('예약이 확정되었습니다.');
			fetchData();
		} catch (err) {
			console.log(e.res.data.message);
		}
	};

	// memo 지우: 예약 취소 버튼 클릭
	const onClickRezCancel = async (e) => {
		const id = e.target.name;

		try {
			await API.patch(`//localhost:3500/api/reserve/farmer/${id}`, {
				status: '예약취소',
			});
			alert('예약이 취소되었습니다.');
			fetchData();
		} catch (err) {
			console.log(e.res.data.message);
		}
	};

	// memo 지우: originalData에 데이터 받기
	useEffect(() => {
		fetchData();
	}, []);

	// memo 지우: 원본 데이터 or 필터 업그레이드 -> filterData 통해 필터링, filteredData에 결과 저장 -> 화면 재렌더링
	useEffect(() => {
		if (originalData) filterData();
	}, [statusOption, dateOption]);

	if (filteredData) {
		return (
			<>
				<FilterWrapper>
					{statusList.map((status) => (
						<FilterBtn key={status} onClick={() => setStatusOption(status)}>
							{status}
						</FilterBtn>
					))}
					<FilterSelect onChange={(e) => setDateOption(e.target.value)}>
						<option value="최근순">최근순</option>
						<option value="오래된순">오래된순</option>
					</FilterSelect>
				</FilterWrapper>
				<Table>
					<Thead>
						<Tr>
							<Td scope="col">예약날짜</Td>
							<Td scope="col">예약번호</Td>
							<Td scope="col">예약자</Td>
							<Td scope="col">예약정보</Td>
							<Td scope="col">결제</Td>
							<Td scope="col">예약상태</Td>
						</Tr>
					</Thead>
					<tbody>
						{filteredData.slice(offset, offset + 10).map((oneReservation) => {
							const { time, reserve } = oneReservation;
							return (
								<Tr key={reserve.id}>
									<Td>{reserve.createdAt.slice(0, 10)}</Td>
									<Td>{reserve.id}</Td>
									<Td>
										{reserve.name}
										<br />
										{reserve.email}
										<br />
										{reserve.phoneNum}
									</Td>
									<Td>
										{time.date}
										<br />
										{`${time.start_time} - ${time.end_time}`}
										<br />
										인원: {time.people}명
									</Td>
									<Td>
										{reserve.total_price.toLocaleString('ko-KR')}원<br />
										{reserve.payment === 'card' && '카드결제'}
										{reserve.payment === 'transfer' && '계좌이체'}
									</Td>
									<BtnTd>
										{reserve.status}
										{reserve.status === '예약대기' && (
											<Button
												name={reserve.id}
												onClick={(e) => onClickRezConfirm(e)}
											>
												예약확정
											</Button>
										)}
										{(reserve.status === '예약대기' ||
											reserve.status === '예약완료') && (
											<Button
												name={reserve.id}
												onClick={(e) => onClickRezCancel(e)}
											>
												예약취소
											</Button>
										)}
									</BtnTd>
								</Tr>
							);
						})}
					</tbody>
				</Table>
				<Pagination
					total={filteredData.length}
					limit={10}
					page={page}
					setPage={setPage}
				/>
			</>
		);
	} else {
		return <FailAnnouncement>예약 정보가 없습니다.</FailAnnouncement>;
	}
};

export default FarmReservationTable;
