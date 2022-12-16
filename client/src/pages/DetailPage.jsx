import React, { useState, useEffect } from "react";
import axios from 'axios';
import Detail from "../components/Detail";

const DetailPage =  () => {
    const [detailData, setDetailData] = useState(null);

    const fetchData = async () => {
        try {
            await axios.get('/detailData.json').then((res) => {
                console.log(res.data);
                setDetailData(res.data);
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
            <Detail data={detailData}/>
        </div>
    );
}


export default DetailPage;