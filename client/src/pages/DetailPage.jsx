import React, { useState, useEffect,createContext } from "react";
import axios from 'axios';
import Detail from "../components/Detail";
import { Provider } from "react-redux";
import  FormStore  from "../store/FormStore";

export const DetailContext = createContext();

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
            <Provider store={FormStore}>
                <DetailContext.Provider value={ { detailData }}>
                    <Detail />
                </DetailContext.Provider>
            </Provider>
        </div>
    );
}

export default DetailPage;

