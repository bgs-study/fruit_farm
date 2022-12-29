import { useState, useEffect,createContext } from "react";
import axios from "axios";
import Detail from "../components/Detail";
import { useParams } from 'react-router-dom';

export const DetailContext = createContext();

const DetailPage =  () => {
    const [farmData, setFarmData] = useState(null);
    const [reviewData, setreviewData] = useState(null);
    const [farmerData, setFarmerData] = useState(null);
    const [timeTable, setTimeTable] = useState(null);
    const {id} = useParams();
    
    const fetchData = async () => {
        try {
            await axios.get(`/api/farms/${id}`).then((res) => {
                setFarmData(res.data.data);
                setreviewData(res.data.reviewInfo);
                setFarmerData(res.data.farmer);                 
            });
        }
        catch(e){
            console.log(e);
        }
    }

    const fetchTimeTable = async () =>{
        if(farmerData){
            try {
                const {farmId} = farmerData;
                await axios.get(`/api/timetables/${farmId}`).then((res) => {
                    setTimeTable(res.data);
                })
            }
            catch (e){
                console.log(e);
            }
        }
    }

    useEffect (() => {
        fetchData();
    }, []);

    useEffect (() => {
        fetchTimeTable()
    },[farmerData]);

    return (
        <div>
            <DetailContext.Provider value={ {farmData,reviewData,farmerData,timeTable}}>
                <Detail />
            </DetailContext.Provider>
        </div>
    );
}

export default DetailPage;

