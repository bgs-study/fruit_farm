import React,{useState,useEffect,useContext} from 'react';
import { useDispatch, useSelector } from "react-redux";

import styled from 'styled-components';
import Calender from "./ReactCalender";
import Location from "./Location";
import Review from "./Review";
import TimeBtns from "./TimeBtns";
import { DetailContext } from "../pages/DetailPage"
import FloatingForm from './FloatingForm';


const DetailHeader = ({title,location}) =>{
    return <div className="header">
        <h1 className="title">{title}</h1>
        <p>{location}</p>
        <img src="" alt={`${title}이미지`}/>
    </div>
};

const DetailGrade = ({grade})=>{
    return <p>{grade}점 </p>
};

const DetailDescription = ({description})=>{
    return <p>{description}</p>
};


const DetailCompany = ({company}) => {
    return (
        <DetailCompanyContainer>
            <p>업체정보</p>    
            {
                Object.entries(company).map((values,idx) => {
                    return <p key={`idx${idx}-${values[0]}`}>{`${values[0]}`} : {`${values[1]}`}</p>
                })
            }
        </DetailCompanyContainer>
    );
};



const Detail = () => {
    const [formData,setFormData] = useState({})
    const {detailData : data} = useContext(DetailContext);

    const getDataFuntion = (value) => {
        console.log(value);
    };

    useEffect(() => {
        console.log(formData);
    },[formData]);

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
                                <div className="calender"><Calender propFunction={getDataFuntion}/></div>
                                <TimButtonContainer>
                                    <TimeBtns  />
                                </TimButtonContainer>
                            </DetailPeriod>
                            <Review />
                            <Location />
                            <DetailCompany company={data.company} />
                        </DetailInform>
                        <FloatingForm />
                    </DetailContent>

                </DetailContainer>
            } 
        </>
    );
};


const DetailContainer = styled.div`
    display:flex;
    flex-direction:column;
    text-align: left;
    .header .title{
        display:flex;
        width:100%;
    }
`;
const DetailContent = styled.div`
    display:flex;
`;

const DetailPeriod = styled(DetailContent)`
    justify-content: flex-start;
    .calender:first-child{
        margin-right:3%;
    }
`;
const DetailInform = styled.div`
    width: 100%;
    margin-right : 3%;
`;
const DetailCompanyContainer = styled.div`
    border : 1px solid black;
`;
const TimButtonContainer = styled.div`
    display:flex;
    flex-direction: column;
    justify-content:center;
`;

export default Detail;