import React, { useEffect } from 'react'
import styled from 'styled-components';

const { kakao } = window;

const Location = ({latitude,longitude}) =>{

    useEffect(()=>{

        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = { 
            center: new kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };
        
        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
        
        // 마커가 표시될 위치입니다 
        var markerPosition  = new kakao.maps.LatLng(latitude, longitude); 
        
        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });
        
        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
    }, []);

    return (
        <div>
            <p>찾아오는길</p>
            <MapDiv id="map"></MapDiv>
        </div>
    );
}

const MapDiv = styled.div`
    width:100%;
    height:400px;
`;
export default Location;