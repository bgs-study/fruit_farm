import axios from 'axios';
import { FavoriteList } from '../components/ItemList';
import { useState } from 'react';
import React, { useEffect, useCallback } from 'react';

const Favorite = () => {

	const [contents, setContents] = useState([]);

	const getFavoriteFarms = useCallback(async () => {
		const token = localStorage.getItem('token');
		const header = {
			headers: {
				authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		};

		await axios
			.get(`/api/like`, header)
			.then((res) => res.data)
			.then((data) => {
				// console.log(data);
				setContents(data);
			});
	});

	useEffect(() => {
		getFavoriteFarms();
	}, []);

	return (
		<div>
			<h2>찜 목록</h2>
			<FavoriteList contents={contents} setContents={setContents} />
		</div>
	);
};

export default Favorite;
