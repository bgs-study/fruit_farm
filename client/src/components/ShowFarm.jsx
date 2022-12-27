import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as API from '../lib/userApi';
import { useNavigate } from 'react-router';

const Title = styled.h1``;
const Line = styled.div`
	display: flex;
`;
const Lable = styled.span`
	width: 20%;
	margin-right: 5px;
`;
const Content = styled.div``;

const Button = styled.button``;

const ShowFarm = ({ farmData }) => {
	const navigate = useNavigate();

	const onClickDel = async () => {
		await API.delete(`//localhost:3500/api/farms/${farmData.id}`);
		alert('농장이 삭제되었습니다.');
		window.location.reload();
	};

	return (
		<>
			<Title>농장 정보</Title>
			<Line>
				<Lable>과일 종류</Lable>
				<Content>{farmData.type}</Content>
			</Line>
			<Line>
				<Lable>농장명</Lable>
				<Content>{farmData.name}</Content>
			</Line>
			<Line>
				<Lable>농장주 이름</Lable>
				<Content>{farmData.owner}</Content>
			</Line>
			<Line>
				<Lable>주소</Lable>
				<Content>{farmData.address}</Content>
			</Line>
			<Line>
				<Lable>체험 설명</Lable>
				<Content>{farmData.description}</Content>
			</Line>
			<Line>
				<Link to="/farm/edit">
					<Button>수정</Button>
				</Link>
				<Button onClick={onClickDel}>삭제</Button>
			</Line>
		</>
	);
};

export default ShowFarm;
