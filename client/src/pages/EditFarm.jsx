import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FarmFormat from '../components/FarmFormat';
import * as API from '../lib/userApi';
import axios from 'axios';
import { useNavigate } from 'react-router';
import FindAddress from '../components/FindAddress';
import { HOST } from './../global-variables';

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
	const [imgs, setImgs] = useState('');
	const [farmId, setFarmId] = useState(null);

	// memo 지우: 초기 렌더링시 데이터 받아와서 상태값 설정 -> input value에 넣기
	async function fetchData() {
		let farmId;
		try {
			await API.get(`${HOST}/api/farms/farminformation`).then((res) => {
				if (res.data.farmInfo !== null) {
					const farmInfo = res.data.farmInfo;
					setFarmData(farmInfo);
					setType(farmInfo.type);
					setName(farmInfo.name);
					setAddress(farmInfo.address);
					setDescription(farmInfo.description);
					setOwner(farmInfo.owner);
					setFarmId(farmInfo.id);
				}
			});
		} catch (e) {
			alert('농장 정보를 불러올 수 없습니다.');
			console.error(e.response.data.message);
		}
	}

	// memo 지우: 이미지 파일 선택 -> 이미지 정보가 담긴 배열이 상태에 저장됨
	const onChangeImg = (e) => {
		e.preventDefault();

		if (e.target.files) {
			const imgArr = e.target.files;
			if (imgArr.length > 3) {
				alert('이미지는 3개까지 등록 가능합니다.');
				e.target.value = '';
			} else setImgs(imgArr);
		}
	};

	// memo 지우: 수정 버튼
	const onClickModify = async () => {
		// memo 지우: 이미지파일을 formData로 전달하기 위해 모든 input값도 넣어줌
		const formData = new FormData();
		formData.append('type', type);
		formData.append('name', name);
		formData.append('address', `${address}${detailaddress}`);
		formData.append('description', description);
		formData.append('owner', owner);
		if (imgs) {
			Array.from(imgs).forEach((img) => {
				formData.append('file', img);
			});
		}

		try {
			await axios(`${HOST}/api/farms/${farmId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				data: formData,
			});
			alert('수정되었습니다.');
			navigate('/farm');
		} catch (e) {
			alert('수정에 실패했습니다.');
			console.log(e.response.data.message);
		}
	};

	// memo 지우: 등록 완료 버튼
	const onClickRegistration = async () => {
		const formData = new FormData();

		// memo 지우: 데이터를 모두 넣어야지 완료될 수 있음
		if (type && name && address && description && owner && imgs) {
			formData.append('type', type);
			formData.append('name', name);
			formData.append('address', `${address}${detailaddress}`);
			formData.append('description', description);
			formData.append('owner', owner);
			Array.from(imgs).forEach((img) => {
				formData.append('file', img);
			});

			try {
				await axios(`${HOST}/api/farms`, {
					method: 'POST',
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
					data: formData,
				});
				alert('등록되었습니다.');
				navigate('/farm');
			} catch (e) {
				alert('등록에 실패했습니다.');
				console.log(e);
			}
		} else {
			alert('정보를 모두 입력해주세요.');
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
