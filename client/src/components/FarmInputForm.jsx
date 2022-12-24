import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Postcode from './AddressApi';
// import Img from './ImgUpload';

// todo 혜실 : 수정중으로 주석이 많으나 추후 삭제 예정
const Tittle = styled.h1``;

const Form = styled.div`
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
	const [url, setUrl] = useState(farmData.farmInfo.url);
	const [description, setDescription] = useState(farmData.farmInfo.description);
	const [owner, setOwner] = useState(farmData.farmInfo.owner);

	// useEffect(() => {
	// 	setdata(farmData);
	// }, []);
	// const farmData = null;
	return (
		<>
			{farmData ? (
				<div>
					<Tittle>농장 정보</Tittle>
					<Form>
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
						<div>
							<Input
								type="text"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							></Input>
							<Postcode />
						</div>
						{/* <Input
							type="text"
							value={type}
							onChange={(e) => setType(e.target.value)}
						></Input> */}
						<Label>이미지</Label>
						{/* <Img></Img> */}
						{/* <div>
							<Input
								type="text"
								value={type}
								onChange={(e) => setUrl(e.target.value)}
							></Input>
							<Button>대표 업로드</Button>
						</div> */}
						<div>
							{/* <Input
								type="text"
								value={type}
								onChange={(e) => setType(e.target.value)}
							></Input>
							<Button>업로드</Button>
						</div>
						<div>
							<Input
								type="text"
								value={type}
								onChange={(e) => setType(e.target.value)}
							></Input>
							<Button>업로드</Button> */}
						</div>
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
						<Button>완료</Button>
					</Form>
				</div>
			) : (
				<div>
					<Tittle>농장 정보 조회</Tittle>
					<Form>
						<Label>과일종류</Label>
						<Input
							type="text"
							value={null}
							onChange={(e) => setType(e.target.value)}
						></Input>
						<Label>농장명</Label>
						<Input
							type="text"
							value={null}
							onChange={(e) => setName(e.target.value)}
						></Input>
						<Label>농장주소</Label>
						<div>
							<Input
								type="text"
								value={null}
								onChange={(e) => setAddress(e.target.value)}
							></Input>
							<Button>검색</Button>
						</div>
						{/* <Input
							type="text"
							value={type}
							onChange={(e) => setType(e.target.value)}
						></Input> */}
						<Label>이미지</Label>
						{/* <Img></Img> */}
						{/* <div>
							<Input
								type="text"
								value={null}
								onChange={(e) => setUrl(e.target.value)}
							></Input>
							<Button>대표 업로드</Button>
						</div> */}
						<div>
							{/* <Input
								type="text"
								value={type}
								onChange={(e) => setType(e.target.value)}
							></Input>
							<Button>업로드</Button>
						</div>
						<div>
							<Input
								type="text"
								value={type}
								onChange={(e) => setType(e.target.value)}
							></Input>
							<Button>업로드</Button> */}
						</div>
						<Label>체험설명</Label>
						<Textarea
							type="text"
							value={null}
							onChange={(e) => setDescription(e.target.value)}
						></Textarea>
						<Label>농장주명</Label>
						<Input
							type="text"
							value={null}
							onChange={(e) => setOwner(e.target.value)}
						></Input>
						<Button>완료</Button>
					</Form>
				</div>
			)}
		</>
	);
}

export default FarmInputForm;
