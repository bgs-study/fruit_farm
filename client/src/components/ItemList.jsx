import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import heartLogo from '../assets/favorite.png';
import apple from '../assets/apple.png';
import { HOST, yellow } from './../global-variables';

const FarmList = React.memo(({ contents, favorite, setFavorite}) => {

	const handleButton = async (e) => {
		// 로그인 유무 확인
		if (!localStorage.getItem('token')){
			alert('찜 기능은 로그인이 필요합니다.');
			return;
		}

		const farmId = Number(e.target.id);
		const element =	e.target;

		if (element.getAttribute('color') === 'true') element.setAttribute('color', 'false');
		else if (element.getAttribute('color') === 'false') element.setAttribute('color', 'true');

		// console.log('입력된 농장 아이디', farmId);

		if (favorite.includes(farmId)){
			await axios(`/api/like/${farmId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
			setFavorite(favorite.filter(x=>x!==farmId));
		} else {
			await axios(`/api/like/${farmId}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
			setFavorite([...favorite, farmId]);
		}
	};

	if (contents.length === 0) {
		return <Container><Empty><img src={apple}/>농장 없음</Empty></Container>;
	} else {
		return (
			<Container>
				<ItemList className="itemList">
					{contents && contents.map((content) => {
						return (
							<Item key={content.id}>
								<Button type="button" id={content.id} onClick={(e) => handleButton(e)} color={favorite.includes(content.id).toString()} />
								<Link to={`/detail/${content.id}`}>
									<img src={content.url.split(',')[0]} alt={content.name} />
									<TextContainer>
										<div><Bold>{content.name}</Bold></div>
										<div><Address>{content.address}</Address></div>
									</TextContainer>
								</Link>
							</Item>
						);
					})}
				</ItemList>
			</Container>
		);
	}
});

const FavoriteList = React.memo(({ contents, setContents}) => {

	const handleButton = async (e) => {
		// 로그인 유무 확인
		if (!localStorage.getItem('token')){
			alert('찜 기능은 로그인이 필요합니다.');
			return;
		}
	
		const farmId = Number(e.target.id);
		// console.log('입력된 농장 아이디', farmId);
		const element = e.target;
		element.setAttribute('color', 'false');

		await axios(`/api/like/${farmId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
		setContents(contents.filter(x=>x.id!==farmId));
	};

	if (contents.length === 0) {
		return <Container><Empty><img src={apple}/>찜 없음</Empty></Container>;
	} else {
		return (
			<Container>
				<ItemList className="itemList">
					{contents && contents.map((content) => {
						return (
							<Item key={content.id}>
								<Button
									type="button"
									id={content.id}
									onClick={handleButton}
									color="true"
								/>
								<Link to={`/detail/${content.id}`}>
									<img src={content.url.split(',')[0]} alt={content.name} />
									<TextContainer>
									<div><Bold>{content.name}</Bold></div>
										<div><Address>{content.address}</Address></div>
									</TextContainer>
								</Link>
							</Item>
						);
					})}
				</ItemList>
			</Container>
		);
	}
});
// #FFCC00 #FF0000 #65F7CE #f4d815 #83d644
const Container = styled.div`
	box-sizing: border-box;
	display: flex;
	overflow: hidden;
	justify-content: center;
	width: 100%;
	margin: 0;
	background-color: white;
`;

const ItemList = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, auto));
	grid-gap: 25px;
	width: auto;
	padding: 0 100px 100px 100px;
	max-width: 1800px;
	width: 100%;
	height: auto;
	position:absolute;
`;

const Item = styled.div`
	display: flex;
	flex-direction: column;
	flex-basis: auto;
	height: 350px;
	width: auto;
	box-shadow: -1px -1px 10px rgba(0, 0, 0, 0.18);
	border: 1px solid rgba(0, 0, 0, 0.18);
	position: relative;
	border-radius: 10px;
	overflow:hidden;
	background-color: white;

	img {
		width: 100%;
		height: 250px;
		border-radius: 10px 10px 0 0;
	}

	&:hover {
		transition: 0.5s;
		transform: scale(1.1);
		border: solid 2px ${yellow};
		img {
			transition: 0.5s;
			height: 400px;
			width: 100%;
		}
		z-index:1;
	}
`;

const Button = styled.button`
	width: 20px;
	height: 20px;
	background-color: ${(props) => (props.color === 'true' ? 'red' : 'white')};
	position: absolute;
	transition: all 0.5s;
	transform: rotateY(540deg);
	filter: ${(props)=> (props.color === 'false' ? 'grayscale(100)' : 'grayscale(0)')};
	top: 5%;
	right: 5%;
	border: none;
	width: 50px;
	height: 50px;

	background: url(${heartLogo}) no-repeat;

	&:hover {
		transition: 1s;
		transform:scale(2);
	}
`

const TextContainer = styled.div`
	display: grid;
	height: 20px;
	padding: 10px;
	object-fit: cover;
	grid-template-rows: 1fr 1fr;
	border-radius: 0 0 10px 10px;

	&hover: {
		transition: 0.5s;
		display:hidden;
	}
`;

const Bold = styled.b`
	font-size:16px;
`

const Address = styled.span`
	color: gray;
`
const Empty = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 20px;
	margin-top: 50px;

	img {
		height: 50px;
		margin-bottom: 20px;
	}
`

export { FarmList, FavoriteList };
