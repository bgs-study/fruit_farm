import React, { useState, useEffect,createContext } from "react";
import axios from "axios";
import Detail from "../components/Detail";
import { useParams } from 'react-router-dom';

export const DetailContext = createContext();

const DetailPage =  () => {
    const [detailData, setDetailData] = useState(null);
    const [reviewData, setreviewData] = useState(null);
    const {id} = useParams();
    const fetchData = async () => {
        try {
            await axios.get(`http://localhost:3500/api/farms/${id}`).then((res) => {
                console.log(res.data);
                setDetailData(res.data.data);
                setreviewData(res.data.review);
            });
        }
        catch(e){
            console.log(e);
        }
    }

    useEffect (() => {
        fetchData();
    }, []);
    
    return (
        <div>
            <DetailContext.Provider value={ {detailData,reviewData}}>
                <Detail />
            </DetailContext.Provider>
        </div>
    );
}

export default DetailPage;

