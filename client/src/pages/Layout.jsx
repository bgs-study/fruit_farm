import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setFavorite } from '../store/FavoriteSlice';
import { Provider } from 'react-redux';
import store from '../store/Store';

const Container = styled.main`
	min-height: 100%;
	padding: 3% 5% 7% 5%;
	box-sizing: border-box;
	position: relative;
`;

const getFavoriteFarmId = async () => {
	const token = localStorage.getItem('token');
	const header = {
		headers: {
			authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	};
	// 찜 목록 조회
	const result = await axios
		.get(`/api/like`, header)
		.then((res) => res.data)
		.then((data) => {
			// console.log(data);
			return data.map((x) => x.id);
		});
	// console.log(result);
	return result;
};

const Layout = () => {
	const favorite = useSelector((state) => state.favorite.favorites);
	const dispatch = useDispatch();

	const setFavoriteFarmIds = async () => {
		const farmIds = await getFavoriteFarmId(); // 찜 목록 아이디
    dispatch(setFavorite(farmIds));
	};

	// console.log('layout에서의 찜 목록', favorite);

	// useEffect(() => {
	// 	if (localStorage.getItem('token')) setFavoriteFarmIds();
  //   // console.log('useEffect', favorite);
	// }, []);

	return (
		<>
			<Provider store={store}>
				<Header />
				<Container>
					<Outlet />
				</Container>
			</Provider>
			<Footer />
		</>
	);
};

export default Layout;
