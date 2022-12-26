import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import ModalContainer from './../components/Modal';
import { showModal, closeModal } from '../store/ModalSlice';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const Input = styled.input`
	width: 500px;
`;

const Post = (props) => {
	const [totalAddress, setTotalAddress] = useState('');
	const modalOpen = useSelector((state) => state.modal.modal);
	const dispatch = useDispatch();

	const complete = (data) => {
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
		// console.log('data', data);
		console.log('fullAddress', fullAddress);
		console.log('data.zonecode', data.zonecode);
		setTotalAddress(fullAddress);
		dispatch(closeModal());

		// props.setcompany({
		// 	...props.company,
		// 	address: fullAddress,
		// });
	};

	return (
		<>
			{modalOpen && (
				<div>
					<ModalContainer>
						<DaumPostcode
							className="postmodal"
							autoClose
							onComplete={complete}
						/>
					</ModalContainer>
				</div>
			)}
			<Input type="text" value={totalAddress} readOnly />
			<button onClick={() => dispatch(showModal())}>주소검색</button>
		</>
	);
};

export default Post;
