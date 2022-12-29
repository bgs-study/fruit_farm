import styled from 'styled-components';
import {AiOutlineCustomerService} from 'react-icons/ai';

const StyledContainer = styled.footer`
    position:fixed;
    bottom:0;
    font-size: 1rem;
    width: 100%;
    padding: 1.2rem 5.5rem;
    background-color:#fff;
    z-index: 80;
    border-top:1px solid #f4d815;
`;

const StyledFooter= styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
`

const StyledFooterMenu = styled.div`
 &:not(:last-of-type) {
    padding-right: 2%;
  }

  > p {
    margin-bottom: 0rem;
  }
 
 > span {
    color: gray;
    font-size: 0.8rem;
 }

`

const Footer = (() => {
    return (
        <StyledContainer>
            <StyledFooter>
                <StyledFooterMenu>
                <p>COPYRIGHT (C) NADODDAM ALL RIGHTS RESERVED.</p>
                </StyledFooterMenu>
                <StyledFooterMenu>
                <span>주식회사 나도땀 (NADODDAM Co., Ltd.) | </span> 
                <span>서울특별시 성동구 엘리스로 1길, 1층 (성수동, 낙낙) | </span> 
                <span>대표 : 넘버원</span>
                </StyledFooterMenu>
            </StyledFooter>
        </StyledContainer>
    )
});

export default Footer;
