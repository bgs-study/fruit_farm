import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Post from './daumApi';

const Tittle = styled.h1``;

const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

const Label = styled.label``;

const Input = styled.input``;

const Textarea = styled.textarea``;

const Button = styled.button``;

function FarmNullInputForm() {
	const [type, setType] = useState('');
	const [name, setName] = useState('');
	const [address, setAddress] = useState('');
	const [description, setDescription] = useState('');
	const [owner, setOwner] = useState('');
	const [disabled, setDisabled] = useState(false);

	const handleSubmit = async (e) => {
		setDisabled(true);
		e.preventDefault();
		await new Promise((r) => setTimeout(r, 1000));
		postData();
		setDisabled(false);
	};
	const postData = async (e) => {
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
		}
		try {
			const res = await axios.post(`http://localhost:3500/api/farms/`, {
				// data: formData,
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				body: {
					type: type,
					name: name,
					address: address,
					description: description,
					owner: owner,
				},
			});
			console.log(res);
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
				// formData.append(index, el);
				formData.append('file', el);
				console.log(index);
				console.log(el);
			});
			console.log(Array.isArray(uploadFile));
			for (const key of formData.keys()) {
				console.log(key);
			}
			for (const value of formData.values()) {
				console.log(value);
			}
			const res = await axios(`http://localhost:3500/api/farms`, {
				method: 'POST',
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
			<div>
				<Tittle>농장 정보</Tittle>
				<Form onSubmit={handleSubmit}>
					<Label>과일종류</Label>
					<Input
						type="text"
						value={type}
						onChange={(e) => setType(e.target.value)}
					></Input>
					<Label>농장명</Label>
					<Input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					></Input>
					<Label>농장주소</Label>
					<Post></Post>
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
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					></Textarea>
					<Label>농장주명</Label>
					<Input
						type="text"
						value={owner}
						onChange={(e) => setOwner(e.target.value)}
					></Input>
					<Button type="button" disabled={disabled}>
						완료
					</Button>
				</Form>
			</div>
		</>
	);
}

export default FarmNullInputForm;
