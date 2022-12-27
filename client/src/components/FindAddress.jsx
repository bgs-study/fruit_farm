import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import ModalContainer from './../components/Modal';
import { showModal, closeModal } from '../store/ModalSlice';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const Input = styled.input`
	width: 500px;
`;

const FindAddress = ({ name, setAddress, setDetailAddress }) => {
	const modalOpen = useSelector((state) => state.modal.modal);
	const dispatch = useDispatch();
	const [openDetailAddress, setOpenDetailAddress] = useState(false);

	const onClickComplete = (data) => {
		let fullAddress = data.address;
		let extraAddress = '';

		if (data.addressType === 'R') {
			if (data.bname !== '') {
				extraAddress += data.bname;
			}
			if (data.buildingName !== '') {
				extraAddress +=
					extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
			}
			fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
		}

		setAddress(fullAddress);
		dispatch(closeModal());
	};

	return (
		<>
			{modalOpen && (
				<div>
					<ModalContainer>
						<DaumPostcode
							className="postmodal"
							autoClose
							onComplete={onClickComplete}
						/>
					</ModalContainer>
				</div>
			)}
			<Input value={name} type="text" readOnly />
			{openDetailAddress && (
				<Input
					type="text"
					name="detailAddress"
					placeholder="상세주소를 입력해주세요"
					onChange={(e) => {
						setDetailAddress(e.target.value);
					}}
				></Input>
			)}
			<button
				type="button"
				onClick={() => {
					dispatch(showModal());
					setOpenDetailAddress(true);
				}}
			>
				주소검색
			</button>
		</>
	);
};

export default FindAddress;
