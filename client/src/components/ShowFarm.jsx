import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as API from '../lib/userApi';
import { StyledSubTitle, ConfirmButton, DeleteButton } from '../styles/Styled';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

const Subject = styled.h2`
	text-align: center;
	margin: 0 0 4% 0;
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
	font-size: 1.1rem;
`;
const Content = styled.div``;

const ImgWrapper = styled.div``;

const Img = styled.img`
	width: 200px;
	height: 120px;
	object-fit: cover;
	margin: 5px 0 0 5px;
`;

const BtnWrapper = styled.div`
	display: flex;
	width: 100%;
	justify-content: flex-end;
`;

const ShowFarm = ({ farmData }) => {
	const imgs = farmData.url.split(',');

	const onClickDel = async () => {
		await API.delete(`/api/farms/${farmData.id}`);
		alert('농장이 삭제되었습니다.');
		window.location.reload();
	};

	return (
		<Container>
			<Subject>농장 정보</Subject>
			<Wrapper>
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
						{imgs[0] && <Img src={imgs[0]} alt="농장 이미지1" />}
					</ImgWrapper>
					<ImgWrapper>
						{imgs[1] && <Img src={imgs[1]} alt="농장 이미지2" />}
					</ImgWrapper>
					<ImgWrapper>
						{imgs[2] && <Img src={imgs[2]} alt="농장 이미지3" />}
					</ImgWrapper>
				</Line>
				<BtnWrapper>
					<Link to="/farm/edit">
						<ConfirmButton style={{ marginRight: '5px' }}>수정</ConfirmButton>
					</Link>
					<DeleteButton onClick={onClickDel}>삭제</DeleteButton>
				</BtnWrapper>
			</Wrapper>
		</Container>
	);
};

export default ShowFarm;
