import {useState,useContext} from 'react';
import { DetailContext } from "../pages/DetailPage"
import styled from 'styled-components';

const TimeBtns = () =>{
    const {detailData : data} = useContext(DetailContext);
    const times = data.times;

    const [timeBtnActive, setTimeBtnActive] = useState("");
    const handleTimeSelect = (e) => {
        setTimeBtnActive(e.target.value);
    };

    return data && times.map( (time,idx)=>{
        return <div key= {`TimeButtonContainer-${idx}`}>
                <TimeButton 
                    key= {`TimeButton-${idx}`}
                    className={"btn" + (idx == timeBtnActive ? " active" : "")} 
                    value ={idx} onClick={handleTimeSelect}>{`${idx+1}타임  ${time}`}
                </TimeButton>
            </div>
    });
};

const TimeButton = styled.button`
    display:block;
    width : 100%;
    height : 90px;
    font-size : 1rem;
    background-color : white;
    border : 1px orange solid;
    &.active {
        background-color : orange;
        opacity: 0.5;
        color : white;
    }
`;

export default TimeBtns;