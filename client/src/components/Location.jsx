import React, { useEffect , useContext } from 'react';
import styled from 'styled-components';
import { DetailContext } from '../pages/DetailPage';
import {StyledSubTitle, ContentContainer} from '../styles/Styled'

const { kakao } = window;
const MapDiv = styled.div`
    width:100%;
    height:400px;
    z-index: -1;
`;

const IsDetail = () =>{
    const {farmData : data} = useContext(DetailContext);
    return data.address;
}

const Location = ({location}) =>{
    let address = '';

    if (location){
        address = location;
    }else{
        address = IsDetail();
    }

    useEffect(() => {
        const mapContainer = document.getElementById('map'),
        mapOption = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3 // 지도의 확대 레벨
        };   
        const map = new kakao.maps.Map(mapContainer, mapOption); 

        kakao.maps.load(() => {

            const geocoder = new kakao.maps.services.Geocoder();
            geocoder.addressSearch(address, function(result, status) {

                if (status === kakao.maps.services.Status.OK) {
                    const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                    const marker = new kakao.maps.Marker({
                        map: map,
                        position: coords
                    });
                    const infowindow = new kakao.maps.InfoWindow({
                        content: "<div style='width:150px;text-align:center;padding:6px 0;'>우리농장</div>"
                    });
                    infowindow.open(map, marker);
                    map.setCenter(coords);
                } 
            })
        })    
    }, []);

    return (
        <ContentContainer>
            <StyledSubTitle>찾아오는길</StyledSubTitle>
            <hr />
            <MapDiv id='map'></MapDiv>
        </ContentContainer>
    );
};

export default Location;