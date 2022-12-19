import React, { useContext } from 'react';
import styled from 'styled-components';
import Calender from './ReactCalender';
import Location from './Location';
import Review from './Review';
import TimeBtns from './TimeBtns';
import { DetailContext } from '../pages/DetailPage';
import FloatingForm from './FloatingForm';


const DetailHeader = ({ title, location }) => {
    return (
        <Header>
            <Title>{title}</Title>
            <p>{location}</p>
            <img src='' alt={`${title}이미지`} />
        </Header>
    );
};

const DetailGrade = ({ grade }) => {
    return <p>{grade}점 </p>
};

const DetailDescription = ({ description }) => {
    return <p>{description}</p>
};


const DetailCompany = ({ company }) => {
    return (
        <DetailCompanyContainer>
            <p>업체정보</p>
            {
                Object.entries(company).map((values, idx) => {
                    return <p key={`idx${idx}-${values[0]}`}>{`${values[0]}`} : {`${values[1]}`}</p>
                })
            }
        </DetailCompanyContainer>
    );
};



const Detail = () => {
    const { detailData: data } = useContext(DetailContext);

    const getDataFuntion = (value) => {
        console.log(value);
    };


    return (
        <>
            {
                data &&
                <DetailContainer key={`${data.title}-${new Date()}`}>
                    <DetailHeader title={data.title} location={data.location} />

                    <DetailContent>
                        <DetailInform>
                            <DetailGrade grade={data.grade} />
                            <DetailDescription description={data.description} />
                            <DetailPeriod>
                                <Calender propFunction={getDataFuntion} />
                                <TimButtonContainer>
                                    <TimeBtns />
                                </TimButtonContainer>
                            </DetailPeriod>
                            <Review />
                            <Location />
                            <DetailCompany company={data.company} />
                        </DetailInform>
                        <FloatingFormDiv><FloatingForm /></FloatingFormDiv>
                    </DetailContent>

                </DetailContainer>
            }
        </>
    );
};

const DisplayFlex = styled.div`
    display:flex;
    flex-direction:column;
`;

const DetailContainer = styled(DisplayFlex)`
    width:100%;
    text-align: left;
`;

const Header = styled(DisplayFlex)`
    width:100%;
`;

const Title = styled.h1`
    display: block;
    width : 100%;
`;

const DetailContent = styled.div`
    display: flex;
`;

const DetailPeriod = styled(DetailContent)`
    justify-content: flex-start;
`;
const DetailInform = styled.div`
    display: block;
    width: 100%;
    flex: 3.5;
`;
const FloatingFormDiv = styled.div`
    display : felx;
    justify-content : flex-end;
    flex: 1;
`;
const DetailCompanyContainer = styled.div`
    border : 1px solid black;
`;
const TimButtonContainer = styled(DisplayFlex)`
    justify-content:center;
    margin-left : 3%;
`;

export default Detail;