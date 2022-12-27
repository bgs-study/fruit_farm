import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FarmFormat from '../components/FarmFormat';
import * as API from '../lib/userApi';
import axios from 'axios';
import { useNavigate } from 'react-router';
import FindAddress from '../components/FindAddress';

const Tittle = styled.h1``;

const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

const Label = styled.label``;

const Input = styled.input``;

const Textarea = styled.textarea``;

const Button = styled.button``;

const EditFarm = () => {
	const navigate = useNavigate();
	const [farmData, setFarmData] = useState(null);
	const [type, setType] = useState('');
	const [name, setName] = useState('');
	const [address, setAddress] = useState('');
	const [detailaddress, setDetailAddress] = useState('');
	const [description, setDescription] = useState('');
	const [owner, setOwner] = useState('');
	const [imgs, setImgs] = useState(null);
	const [farmId, setFarmId] = useState(null);

	// memo 지우: 초기 렌더링시 데이터 받아와서 상태값 설정 -> input value에 넣기
	const fetchData = async () => {
		try {
			await API.get('http://localhost:3500/api/farmers/farmInfo').then(
				(res) => {
					if (res.data.farmInfo !== null) {
						setFarmData(res.data);
						setType(res.data.type);
						setName(res.data.name);
						setAddress(res.data.address);
						setDescription(res.data.description);
						setOwner(res.data.owner);
						setFarmId(res.data.id);
					}
				},
			);
		} catch (e) {
			console.error(e.response.data.message);
		}
	};

	const onChangeImg = (e) => {
		e.preventDefault();

		if (e.target.files) {
			const imgArr = e.target.files;
			const formData = new FormData();
			Array.from(imgArr).forEach((img) => {
				formData.append('file', img);
			});
			setImgs(formData);
			// setImgs(imgArr);
		}
	};

	// memo 지우: 수정 버튼
	const onClickModify = async () => {
		// const formData = new FormData();
		// formData.append('type', type);
		// formData.append('name', name);
		// formData.append('address', `${address} ${detailaddress}`);
		// formData.append('description', description);
		// formData.append('owner', owner);
		// Array.from(imgArr).forEach((img) => {
		// 	formData.append('file', img);
		// });

		const inputData = {
			type,
			name,
			address: `${address} ${detailaddress}`,
			description,
			owner,
			formData: imgs,
		};
		console.log('들어가는 데이터', inputData);
		try {
			let res = await axios(`//localhost:3500/api/farms/${farmId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				data: inputData,
			});
			alert('수정되었습니다.');
			console.log('요청 결과', res);
			navigate('/farm');
		} catch (e) {
			console.log(e.response.data.message);
		}
	};

	// memo 지우: 등록 완료 버튼
	const onClickRegistration = async () => {
		const inputData = {
			type,
			name,
			address: `${address} ${detailaddress}`,
			description,
			owner,
			formData: imgs,
		};

		console.log('들어가는 데이터', inputData);
		try {
			let res = await axios(`//localhost:3500/api/farms`, {
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				data: inputData,
			});
			alert('등록되었습니다.');
			console.log('요청 결과', res);
			navigate('/farm');
		} catch (e) {
			console.log(e.response.data.message);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	if (farmData) {
		return (
			<FarmFormat>
				<Tittle>농장 정보 수정</Tittle>
				<Form>
					<Label>과일종류</Label>
					<Input
						type="text"
						name="type"
						defaultValue={type}
						onChange={(e) => setType(e.target.value)}
					></Input>
					<Label>농장명</Label>
					<Input
						type="text"
						name="name"
						defaultValue={name}
						onChange={(e) => setName(e.target.value)}
					></Input>
					<Label>농장주 이름</Label>
					<Input
						type="text"
						name="owner"
						defaultValue={owner}
						onChange={(e) => setOwner(e.target.value)}
					></Input>
					<Label>농장주소</Label>
					<FindAddress
						name={address}
						setAddress={setAddress}
						setDetailAddress={setDetailAddress}
					/>
					<Label htmlFor="profile-upload">이미지</Label>
					<Input
						type="file"
						id="profile-upload"
						accept="image/*"
						multiple="multiple"
						onChange={onChangeImg}
					/>
					<Label>체험설명</Label>
					<Textarea
						type="text"
						name="description"
						defaultValue={description}
						onChange={(e) => setDescription(e.target.value)}
					></Textarea>
					<Button type="button" onClick={onClickModify}>
						완료
					</Button>
				</Form>
			</FarmFormat>
		);
	} else {
		return (
			<FarmFormat>
				<Tittle>농장 정보 등록</Tittle>
				<Form>
					<Label>과일종류</Label>
					<Input
						type="text"
						name="type"
						onChange={(e) => setType(e.target.value)}
					></Input>
					<Label>농장명</Label>
					<Input
						type="text"
						name="name"
						onChange={(e) => setName(e.target.value)}
					></Input>
					<Label>농장주 이름</Label>
					<Input
						type="text"
						name="owner"
						onChange={(e) => setOwner(e.target.value)}
					></Input>
					<Label>농장주소</Label>
					<FindAddress
						name={address}
						setAddress={setAddress}
						setDetailAddress={setDetailAddress}
					/>
					<Label htmlFor="profile-upload">이미지</Label>
					<Input
						type="file"
						id="profile-upload"
						accept="image/*"
						multiple="multiple"
						onChange={onChangeImg}
					/>
					<Label>체험설명</Label>
					<Textarea
						type="text"
						name="description"
						onChange={(e) => setDescription(e.target.value)}
					></Textarea>
					<Button onClick={onClickRegistration} type="button">
						완료
					</Button>
				</Form>
			</FarmFormat>
		);
	}
};

export default EditFarm;
