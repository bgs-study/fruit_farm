import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FarmFormat from '../components/FarmFormat';
import * as API from '../lib/userApi';
import axios from 'axios';
import { useNavigate } from 'react-router';
import FindAddress from '../components/FindAddress';
import { Input, SubmitButton } from '../styles/Styled';

const Tittle = styled.h2`
	text-align: center;
	margin-bottom: 2%;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

const Wrapper = styled.div`
	margin-bottom: 5px;
	display: flex;
	align-items: center;
`;

const Label = styled.label`
	min-width: 80px;
`;

const FarmInput = styled(Input)`
	width: 300px;
	margin-left: 10px;
`;

const FarmTextarea = styled.textarea`
	border-radius: 10px;
	border: 1px solid lightgray;
	margin-top: 2%;
	width: 100%;
	height: 6rem;
	resize: none;
	padding: 0.5rem;
`;

const Button = styled(SubmitButton)`
	width: 100%;
`;

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

	// memo 지우: 초기 렌더링시 데이터 받아와서 상태값 설정 -> input value에 넣기
	async function fetchData() {
		try {
			await API.get(`/api/farms/farminformation`).then((res) => {
				if (res.data.farmInfo !== null) {
					setFarmData(res.data.farmInfo);
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

		console.log('전달데이터', { type, name, address });

		try {
			await axios(`/api/farms/${farmData.id}`, {
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
				await axios(`/api/farms`, {
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
				<Container>
					<Tittle>농장 정보 수정</Tittle>
					<Form>
						<Wrapper>
							<Label>과일종류</Label>
							<FarmInput
								type="text"
								name="type"
								defaultValue={farmData.type}
								onChange={(e) => setType(e.target.value)}
							></FarmInput>
						</Wrapper>
						<Wrapper>
							<Label>농장명</Label>
							<FarmInput
								type="text"
								name="name"
								defaultValue={farmData.name}
								onChange={(e) => setName(e.target.value)}
							></FarmInput>
						</Wrapper>
						<Wrapper>
							<Label>농장주 이름</Label>
							<FarmInput
								type="text"
								name="owner"
								defaultValue={farmData.owner}
								onChange={(e) => setOwner(e.target.value)}
							></FarmInput>
						</Wrapper>
						<Wrapper>
							<Label>주소</Label>
							<FindAddress
								name={farmData.address}
								setAddress={setAddress}
								setDetailAddress={setDetailAddress}
							/>
						</Wrapper>
						<Wrapper>
							<Label htmlFor="profile-upload">이미지</Label>
							<FarmInput
								type="file"
								id="profile-upload"
								accept=".jpg, .jpeg, .png"
								multiple="multiple"
								onChange={onChangeImg}
							/>
						</Wrapper>
						<Label>체험설명</Label>
						<FarmTextarea
							type="text"
							name="description"
							defaultValue={farmData.description}
							onChange={(e) => setDescription(e.target.value)}
						/>
						<Button type="button" onClick={onClickModify}>
							완료
						</Button>
					</Form>
				</Container>
			</FarmFormat>
		);
	} else {
		return (
			<FarmFormat>
				<Container>
					<Tittle>농장 정보 등록</Tittle>
					<Form>
						<Wrapper>
							<Label>과일종류</Label>
							<FarmInput
								type="text"
								name="type"
								onChange={(e) => setType(e.target.value)}
							></FarmInput>
						</Wrapper>
						<Wrapper>
							<Label>농장명</Label>
							<FarmInput
								type="text"
								name="name"
								onChange={(e) => setName(e.target.value)}
							></FarmInput>
						</Wrapper>
						<Wrapper>
							<Label>농장주 이름</Label>
							<FarmInput
								type="text"
								name="owner"
								onChange={(e) => setOwner(e.target.value)}
							></FarmInput>
						</Wrapper>
						<Wrapper>
							<Label>주소</Label>
							<FindAddress
								name={address}
								setAddress={setAddress}
								setDetailAddress={setDetailAddress}
							/>
						</Wrapper>
						<Wrapper>
							<Label htmlFor="profile-upload">이미지</Label>
							<FarmInput
								type="file"
								id="profile-upload"
								accept="image/*"
								multiple="multiple"
								onChange={onChangeImg}
							/>
						</Wrapper>
						<Label>체험설명</Label>
						<FarmTextarea
							type="text"
							name="description"
							onChange={(e) => setDescription(e.target.value)}
						/>
						<Button onClick={onClickRegistration} type="button">
							완료
						</Button>
					</Form>
				</Container>
			</FarmFormat>
		);
	}
};

export default EditFarm;
