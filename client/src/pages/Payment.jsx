import React, { useEffect, useState } from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';
import styled from 'styled-components';
import StickyBox from 'react-sticky-box';
import { useLocation, useNavigate } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as userApi from '../lib/userApi';
import ModalContainer from './../components/Modal';
import { showModal, closeModal } from '../store/ModalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { HOST, yellow, green } from '../global-variables';
import {
	SubmitButton,
	ConfirmButton,
	DeleteButton,
	Input,
	NormalButton,
	StyledTitle,
} from '../styles/Styled';

const MomDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: start;
	min-width: 800px;
	width: 100%;
`;

const ContextDiv = styled.div`
	flex-direction: column;
	justify-content: center;
	width: 50%;
`;

const H1 = styled(StyledTitle)`
	margin-bottom: 30px;
`;

const H2 = styled.p`
	font-size: 150%;
	font-weight: 600;
`;

const SmallH2 = styled.p`
	font-size: 25px;
	font-weight: 700;
	margin-bottom: 20px;
`;

const ConfirmBtn = styled(ConfirmButton)`
	padding: 10px;
`;

const Line = styled.div`
	content: '  ';
	display: block;
	width: 100%;
	height: 0.5px;
	background-color: #808080;
	margin: 5% 0;
`;

const P = styled.p`
	font-size: 20px;
	margin: 0;
	font-size: 30px;
`;
const Inp = styled(Input)`
	margin: 0;
`;

const SideBarDiv = styled.div`
	background: ${yellow};
	width: 300px;
	border-radius: 10%;
	padding: 20px;
	margin-left: 50px;
`;

const ButtonDiv = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const TextDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-start;
	margin: 20px, 0;
`;
const RowDiv = styled.div`
	display: flex;
	flex-direction: row;
	div {
		margin-top: 5px;
	}
`;

const Box = styled.div`
	width: 100%;
	border-radius: 10px;
	overflow: hidden;
	margin: 20px;
	padding: 10px;
	justify-content: center;
	transition: all 0.3s cubic-bezier(0.42, 0, 0.58, 1);

	&:hover {
		box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
		transform: translateY(-10px);
	}
`;
const ImportInfo = styled.p`
	font-size: 130%;
	font-weight: 600;
`;
const Span = styled.span`
	font-size: 20px;
`;
const SubmitBtn = styled(DeleteButton)`
	padding: 10px;
`;
const ModalDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
const NormalBtn = styled(NormalButton)`
	width: 110px;
	height: 40px;
	margin: 0;
`;
const ModalBtnDiv = styled.div`
	display: flex;
	flex-direction: row;
	padding: 30px 20px 20px;
`;
const ModalH1 = styled(StyledTitle)`
	margin-top: 50px;
`;
// 예약정보
const ReservationInfo = ({ payData }) => {
	const navigate = useNavigate();

	return (
		<>
			{payData && (
				<>
					<H1>예약 정보</H1>
					<TextDiv>
						<H2>날짜</H2>
						<ImportInfo>{payData.date}</ImportInfo>
					</TextDiv>
					<TextDiv>
						<H2>시간</H2>
						<ImportInfo>
							{payData.startTime} ~ {payData.endTime}
						</ImportInfo>
					</TextDiv>
					<TextDiv>
						<H2>인원</H2>
						<ImportInfo>{payData.headCount}명</ImportInfo>
					</TextDiv>
					<ButtonDiv>
						<SubmitButton onClick={() => navigate(-1)}>
							예약정보수정
						</SubmitButton>
					</ButtonDiv>
				</>
			)}
		</>
	);
};

//SideBar
const SideBar = ({ payData }) => {
	const { farm, price, headCount, totalPrice } = payData;
	return (
		<>
			{payData && (
				<div>
					<H1>{farm}</H1>
					<SmallH2>요금 세부정보</SmallH2>
					<ImportInfo>1인 체험권</ImportInfo>
					<TextDiv>
						<ImportInfo>
							{price ? price.toLocaleString('ko-KR') : 0}원 X{headCount}
						</ImportInfo>
						<ImportInfo>
							{totalPrice ? totalPrice.toLocaleString('ko-KR') : 0}원
						</ImportInfo>
					</TextDiv>
					<Line />
					<TextDiv>
						<ImportInfo>결제 예정 금액</ImportInfo>
						<ImportInfo>
							{totalPrice ? totalPrice.toLocaleString('ko-KR') : 0}원
						</ImportInfo>
					</TextDiv>
				</div>
			)}
		</>
	);
};

//결제 수단
const PaymentInfo = () => {
	return (
		<>
			<Accordion style={{ width: '100%', justifyContent: 'center' }}>
				<Accordion.Item eventKey="0">
					<Accordion.Header>
						<H2>정보제공 수집 및 제공 동의</H2>
					</Accordion.Header>
					<Accordion.Body>
						<Span>
							예약 서비스 이용을 위한 개인정보 수집 및 제3자 제공, 취소/환불
							규정에 동의합니다.
						</Span>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="1">
					<Accordion.Header>
						<H2>환불 정책 동의</H2>
					</Accordion.Header>
					<Accordion.Body>
						<Span>
							체험 특성상 7일 전부터 취소가 불가합니다.그 이후에는 취소 시점에
							따라 환불액이 결정됩니다.
							<br />
							<br /> *취소 및 환불 규정*
							<br />
							예약일로부터 7일 전 : 100% 환불
							<br />
							예약일로부터 3일 전 : 50% 환불
							<br />
							예약일로부터 1일 전 : 환불 불가
						</Span>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
			<Line />
			<RowDiv>
				<div>
					<RiErrorWarningLine size="25" />
				</div>
				<Span>주문 내용을 확인하였으며, 위 내용에 동의합니다.</Span>
			</RowDiv>
		</>
	);
};

const Payment = () => {
	const location = useLocation();
	const modalOpen = useSelector((state) => state.modal.modal);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [payData, setPayData] = useState({});
	const [userData, setUserData] = useState({});
	const [selected, setSelected] = useState('card');
	const [nameOpen, setNameOpen] = useState(false);
	const [name, setName] = useState(userData.name);
	const [phoneNumberOpen, setPhoneNumberOpen] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState(userData.phoneNum);
	const [emailOpen, setEmailOpen] = useState(false);
	const [email, setEmail] = useState(userData.email);
	const [resData, setResData] = useState([]);
	const [personnel, setPersonnel] = useState(0);
	const [pay, setPay] = useState(false);

	useEffect(() => {
		setPayData(location.state);
		getUserData();
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [payData]);

	const getUserData = async () => {
		try {
			const res = await userApi.get(`${HOST}/api/myInfo`);
			const userData = await res.data;
			setUserData({
				name: userData.name,
				phoneNum: userData.phoneNum,
				email: userData.email,
			});
		} catch (e) {
			console.log(e);
		}
	};

	const submitHandler = async () => {
		getReserveData();
	};

	const postData = async (e) => {
		try {
			const reserData = await userApi.post(`${HOST}/api/reserve`, {
				total_price: payData.totalPrice,
				payment: selected,
				name: name,
				phoneNum: phoneNumber,
				email: email,
				personnel: payData.headCount,
				time_id: payData.timeId,
			});
		} catch (e) {
			console.log(e);
		}
	};
	useEffect(() => {
		if (payData.headCount <= personnel) {
			postData();
			setPay(true);
			dispatch(showModal());
		} else if (payData.headCount > personnel) {
			dispatch(showModal());
		}
	}, [resData]);

	const getReserveData = async () => {
		try {
			const res = await userApi.get(`${HOST}/api/timetables/${payData.farmId}`);
			const resData = await res.data;
			setResData(resData);
			for (let i = 0; i < resData.length; i++) {
				if (resData[i].id === payData.timeId) {
					setPersonnel(resData[i].personnel);
				}
			}
		} catch (e) {
			console.log(e);
		}
	};

	const handleSelect = (e) => {
		setSelected(e.target.value);
	};

	useEffect(() => {
		setName(userData.name);
		setPhoneNumber(userData.phoneNum);
		setEmail(userData.email);
	}, [userData]);

	return (
		<>
			<MomDiv>
				<ContextDiv>
					<Box>
						<ReservationInfo payData={payData}></ReservationInfo>
					</Box>
					<Box>
						<H1>예약자 정보</H1>
						<H2>예약자</H2>
						<TextDiv>
							{nameOpen ? (
								<Inp
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							) : (
								<ImportInfo>{name}</ImportInfo>
							)}
							{nameOpen ? (
								<ConfirmBtn onClick={() => setNameOpen(!nameOpen)}>
									완료
								</ConfirmBtn>
							) : (
								<ConfirmBtn onClick={() => setNameOpen(!nameOpen)}>
									수정
								</ConfirmBtn>
							)}
						</TextDiv>
						<H2>연락처</H2>
						<TextDiv>
							{phoneNumberOpen ? (
								<Inp
									type="text"
									value={phoneNumber}
									onChange={(e) => setPhoneNumber(e.target.value)}
								/>
							) : (
								<ImportInfo>{phoneNumber}</ImportInfo>
							)}
							{phoneNumberOpen ? (
								<ConfirmBtn
									onClick={() => setPhoneNumberOpen(!phoneNumberOpen)}
								>
									완료
								</ConfirmBtn>
							) : (
								<ConfirmBtn
									onClick={() => setPhoneNumberOpen(!phoneNumberOpen)}
								>
									수정
								</ConfirmBtn>
							)}
						</TextDiv>
						<H2>이메일</H2>
						<TextDiv>
							{emailOpen ? (
								<Inp
									type="text"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							) : (
								<ImportInfo>{email}</ImportInfo>
							)}
							{emailOpen ? (
								<ConfirmBtn onClick={() => setEmailOpen(!emailOpen)}>
									완료
								</ConfirmBtn>
							) : (
								<ConfirmBtn onClick={() => setEmailOpen(!emailOpen)}>
									수정
								</ConfirmBtn>
							)}
						</TextDiv>
						<RowDiv>
							<div>
								<RiErrorWarningLine size="25" />
							</div>
							<Span>
								입력하신 예약자 정보로 결제 및 예약관련 정보가 발송됩니다.
							</Span>
						</RowDiv>
					</Box>
					<Box>
						<TextDiv>
							<H1>결제 수단</H1>
							<Form.Select
								size="lg"
								onChange={handleSelect}
								value={selected}
								style={{ width: '200px' }}
							>
								<option value="card" key="card">
									카드결제
								</option>
								<option value="transfer" key="transfer">
									계좌이체
								</option>
							</Form.Select>
						</TextDiv>
						<PaymentInfo></PaymentInfo>
					</Box>
					<ButtonDiv>
						<SubmitBtn onClick={submitHandler}>확인 및 결제</SubmitBtn>
					</ButtonDiv>
				</ContextDiv>
				<StickyBox offsetTop={20} offsetBottom={20}>
					<SideBarDiv>
						<SideBar payData={payData}></SideBar>
					</SideBarDiv>
				</StickyBox>
				{modalOpen && (
					<ModalContainer w="600px" h="330px">
						{pay ? (
							<ModalDiv>
								<ModalH1>결제완료</ModalH1>
								<ModalBtnDiv>
									<NormalBtn
										onClick={() => {
											dispatch(closeModal());
											navigate(`/`);
										}}
									>
										확인
									</NormalBtn>
									<NormalBtn
										onClick={() => {
											dispatch(closeModal());
											navigate(`/myreservation`);
										}}
									>
										구매내역보기
									</NormalBtn>
								</ModalBtnDiv>
							</ModalDiv>
						) : (
							<ModalDiv>
								<H1>결제실패</H1>
								<P>체험 인원 초과로 예약이 실패되었습니다</P>
								<P>다른 시간대로 예약해주세요</P>
								<ModalBtnDiv>
									<NormalBtn
										type="button"
										onClick={() => {
											dispatch(closeModal());
											navigate(-1);
										}}
									>
										확인
									</NormalBtn>
								</ModalBtnDiv>
							</ModalDiv>
						)}
					</ModalContainer>
				)}
			</MomDiv>
		</>
	);
};

export default Payment;
