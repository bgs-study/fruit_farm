import CreateReview from '../components/CreateReview';
import ReviewReservation from '../components/ReviewReservation';
import { getToken } from '../utils/utils';
import * as userApi from "../lib/userApi";
import { useParams } from 'react-router';
import { useState, useEffect } from "react";
import { StyledTitle } from '../styles/Styled';
import {SkeletonReviewReservation} from '../components/Skeleton';

const CreateReviewPage = () => {
    const [reservationData, setReservationData] = useState([]);
    const [farmId, setFarmId] = useState(null);
    const { id }= useParams();
    const [loading, setLoading] = useState(true);
    
    const getReservationData = async () => {
        const token = getToken();
        const res = await userApi.get(`/api/reserve`, {
          headers: {
            authorization: token,
          },
        });
        const dataSort = res.data.sort((a, b) => {
          let aTime = a.info.date;
          let bTime = b.info.date;
          if (aTime > bTime) return -1;
          if (aTime === bTime) return 0;
          if (aTime < bTime) return 1;
        })
        const result = dataSort.filter(item => item.reserve.id === Number(id));
        setReservationData([result[0]]);
        setFarmId(result[0].info.id);
        setLoading(false);
     };

    useEffect(() => {
      getReservationData();
     },[]);
    
    return (
    <>
      <StyledTitle>리뷰 작성</StyledTitle>
      {loading? <SkeletonReviewReservation /> :<ReviewReservation reservationData={reservationData}/>}
      <CreateReview id={id} farmId={farmId}/>
    </>
    )
}

export default CreateReviewPage;
