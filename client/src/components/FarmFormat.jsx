import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StyledTitle, StyledSubTitle } from '../styles/Styled';
import { yellow } from '../global-variables';

const Container = styled.div`
	display: flex;
`;
const Content = styled.div`
	width: 100%;
`;
const FarmNav = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	height: 100%;
	width: 30%;
	max-width: 150px;
	min-width: 150px;
	border-right: 1px solid ${yellow};
	margin-right: 40px;
`;
const NavTitle = styled(StyledTitle)`
	margin-bottom: 35%;
`;

const NavCategory = styled(StyledSubTitle)`
	margin-bottom: 30px;
`;
const FarmFormat = ({ children }) => {
	return (
		<Container>
			<FarmNav>
				<NavTitle>농장관리</NavTitle>
				<nav>
					<NavCategory>
						<Link to="/farm">농장정보 관리</Link>
					</NavCategory>
					<NavCategory>
						<Link to="/farm/timetable">체험시간표 관리</Link>
					</NavCategory>
					<NavCategory>
						<Link to="/farm/reservation">예약관리</Link>
					</NavCategory>
					<NavCategory>
						<Link to="/farm/review">후기관리</Link>
					</NavCategory>
				</nav>
			</FarmNav>
			<Content>{children}</Content>
		</Container>
	);
};

export default FarmFormat;
