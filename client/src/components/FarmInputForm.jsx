import React, { useState } from 'react';
import styled from 'styled-components';
import Post from './daumApi';
import * as userApi from '../lib/userApi';
import axios from 'axios';

const Tittle = styled.h1``;

const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

const Label = styled.label``;

const Input = styled.input``;

const Textarea = styled.textarea``;

const Button = styled.button``;

function FarmInputForm({ farmData }) {
	console.log(farmData);
	const [type, setType] = useState(farmData.farmInfo.type);
	const [name, setName] = useState(farmData.farmInfo.name);
	const [address, setAddress] = useState(farmData.farmInfo.address);
	const [description, setDescription] = useState(farmData.farmInfo.description);
	const [owner, setOwner] = useState(farmData.farmInfo.owner);
	const [disabled, setDisabled] = useState(false);
	const farmId = farmData.farmInfo.id;

	const handleSubmit = async (e) => {
		setDisabled(true);
		e.preventDefault();
		await new Promise((r) => setTimeout(r, 1000));
		putData();
		setDisabled(false);
	};
	const putData = async (e) => {
		try {
			const changeData = await userApi.put(
				`http://localhost:3500/api/farms/${farmId}`,
				{
					type: type,
					name: name,
					address: address,
					description: description,
					url: ``,
					owner: owner,
				},
			);
			console.log(changeData);
		} catch (e) {
			console.log(e);
		}
	};

	const onChangeImg = async (e) => {
		e.preventDefault();

		if (e.target.files) {
			const uploadFile = e.target.files;
			console.log(e.target.files);
			const formData = new FormData();
			// formData.append('files', uploadFile);
			console.log(Array.from(uploadFile));
			Array.from(uploadFile).forEach((el, index) => {
				formData.append(index, el);
			});
			console.log(Array.isArray(uploadFile));
			console.log(formData);
			const res = await axios(`http://localhost:3500/api/farms/${farmId}`, {
				method: 'PUT',
				data: formData,
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
			console.log(res);
		}
	};
	return (
		<>
			<Tittle>농장 정보</Tittle>
			<Form onSubmit={handleSubmit}>
				<Label>과일종류</Label>
				<Input
					type="text"
					name="type"
					value={type}
					onChange={(e) => setType(e.target.value)}
				></Input>
				<Label>농장명</Label>
				<Input
					type="text"
					name="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				></Input>
				<Label>농장주소</Label>
				<Post></Post>
				<Input
					type="text"
					name="address"
					value={address}
					placeholder="상세주소"
					onChange={(e) => setAddress(e.target.value)}
				></Input>
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
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				></Textarea>
				<Label>농장주명</Label>
				<Input
					type="text"
					name="owner"
					value={owner}
					onChange={(e) => setOwner(e.target.value)}
				></Input>
				<Button type="button" disabled={disabled}>
					완료
				</Button>
			</Form>
		</>
	);
}

export default FarmInputForm;
