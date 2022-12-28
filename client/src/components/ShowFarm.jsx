import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as API from '../lib/userApi';
import { HOST, gray, yellow } from './../global-variables';
import {
	StyledTitle,
	StyledSubTitle,
	ConfirmButton,
	DeleteButton,
} from '../styles/Styled';

const Wrapper = styled.div``;

const Title = styled(StyledTitle)`
	display: block;
	text-align: center;
	margin-bottom: 40px;
`;
const Line = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 10px;
	padding-bottom: 10px;
`;
const LableWrapper = styled.div`
	display: flex;
	height: 100%;
	align-items: flex-start;
`;
const Lable = styled(StyledSubTitle)`
	width: 130px;
	min-width: 130px;
	margin-right: 5px;
	margin-bottom: 0;
	display: flex;
`;
const Content = styled.div``;

const ImgWrapper = styled.div`
	width: 150px;
	height: 120px;
`;

const Img = styled.img`
	width: 150px;
	margin-top: 5px;
	height: + img {
		margin-left: 5px;
	}
`;

const BtnWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: end;
	align-items: end;
`;

const ShowFarm = ({ farmData }) => {
	const imgs = farmData.url.split(',');

	const onClickDel = async () => {
		await API.delete(`${HOST}/api/farms/${farmData.id}`);
		alert('농장이 삭제되었습니다.');
		window.location.reload();
	};

	return (
		<Wrapper>
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
				<LableWrapper>
					<Lable style={{ marginBottom: '80%' }}>이미지</Lable>
				</LableWrapper>
				<ImgWrapper>
					{imgs[0] && <Img src={imgs[0]} alt="이미지 불러오기 실패" />}
				</ImgWrapper>
				<ImgWrapper>
					{imgs[1] && <Img src={imgs[1]} alt="이미지 불러오기 실패" />}
				</ImgWrapper>
				<ImgWrapper>
					{imgs[2] && <Img src={imgs[2]} alt="이미지 불러오기 실패" />}
				</ImgWrapper>
			</Line>
			<Line>
				<BtnWrapper>
					<Link to="/farm/edit">
						<ConfirmButton style={{ marginRight: '5px' }}>수정</ConfirmButton>
					</Link>
					<DeleteButton onClick={onClickDel}>삭제</DeleteButton>
				</BtnWrapper>
			</Line>
		</Wrapper>
	);
};

export default ShowFarm;
