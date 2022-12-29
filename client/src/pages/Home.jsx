import { FarmList } from '../components/ItemList';
import React, { useState, useEffect, useCallback } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { IoConstructOutline } from 'react-icons/io5';

const getFavorite = async () => {
	const token = localStorage.getItem('token');
	const header = {
		headers: {
			authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	};

	const result = await axios
		.get(`/api/like`, header)
		.then((res) => res.data)
		.then((data) => {
			return data.map((x) => x.id);
		});

	return result;
};

let toggle = true;

const Home = React.memo(() => {
	const option = useSelector((state) => state.option.search);
	const [favorite, setFavorite] = useState([]); // 찜 목록 상태
	const setInitialFavorite = async () => {
		const data = await getFavorite(); // 찜 목록 가져오기

		setFavorite(data);
	};

	// DB에서 찜 목록 가져오기
	useEffect(() => {
		if (localStorage.getItem('token')) setInitialFavorite(); // 찜 목록 초기화
	}, []);

	useEffect(() => {
		// console.log('찜 목록 상태 변화', favorite); // 찜 목록 변화 시 출력
	}, [favorite]);

	const [contents, setContents] = useState([]);
	const [page, setPage] = useState(0);
  const length = 20;
  const last = length*(page+1);

	// 최초 렌더링 시 전체 데이터 조회
	useEffect(() => {
    toggle=true;
    setPage(0);
    // console.log('서치 옵션', option);
    setContents([]);
    getFarmData(option, 20);
	}, [option]);

	const getFarmData = useCallback(
		async ({ location, fruit }, last) => {

			const header = {
        headers: {
          'Content-Type':'application/json;charset=UTF-8',
        },
        params: {
          location:location, type:fruit
        }
			};

			let url = `/api/farms?limit=${last}`; // default 전체 조회

			if (location) {
				url = `/api/farms/location`; // 지역 조회
        await axios.get(url, header)
          .then((res) => {
            const data = res.data;
            setPage(0);
            setContents(data);
            toggle = false;
            return;
          });
			} else if (fruit) {
				url = `/api/farms`; // 과일 조회
        await axios.get(url, header)
          .then((res) => {
            const data = res.data;
            setContents(data);
            setPage(0);
            toggle = false;
            return;
          });
			} else{
        await axios.get(url, header)
          .then((res) => {
            const data = res.data;
            const d = data.slice(length*page, length*(page+1));
            // console.log('가져온 데이터', data.slice(length*page, length*(page+1)));
            if (d.length === 0) {
              // console.log('no data');
              toggle = false;
              setPage(0);
              return;
            }
            
            if (page === 0) setContents(d);
            else setContents(contents.concat(d));
            setPage(page + 1);
          });
      }
    }
	);

	return (
		<InfiniteScroll
			dataLength={contents.length}
			next={() => {
        if (toggle) {
          getFarmData(option, last);}
			}}
			hasMore={true}
			scrollThreshold="1000px"
		>
			<FarmList
				contents={contents}
				favorite={favorite}
				setFavorite={setFavorite}
			/>
		</InfiniteScroll>
	);
});

export default Home;
