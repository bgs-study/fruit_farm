import axios from 'axios';

// api 로 POST 요청 (/endpoint 로, JSON 데이터 형태로 요청함)
// endpoint : api/user/login
async function post(endpoint, data) {
	const apiUrl = endpoint;
	const bodyData = JSON.stringify(data);

	const res = await axios(apiUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		data: bodyData,
	});

	return res;
}

// api 로 user정보 GET 요청
async function get(endpoint) {
	const apiUrl = endpoint;

	const res = await axios(apiUrl, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	});

	return res;
}

async function patch(endpoint, data) {
	const apiUrl = endpoint;
	const bodyData = JSON.stringify(data);

	const res = await axios(apiUrl, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		data: bodyData,
	});

	//   응답 코드가 4XX 계열일 때 (400, 403 등)
	if (res.status !== 200) {
		console.log('에러 답변', res);
		throw new Error(res);
	}
	return res;
}

async function put(endpoint, data) {
	const apiUrl = endpoint;
	const bodyData = JSON.stringify(data);

	const res = await axios(apiUrl, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		data: bodyData,
	});

	//   응답 코드가 4XX 계열일 때 (400, 403 등)
	if (res.status !== 200) {
		console.log('에러 답변', res);
		throw new Error(res);
	}
	return res;
}

async function del(endpoint) {
	const apiUrl = endpoint;

	const res = await fetch(apiUrl, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	});

	// 응답 코드가 4XX 계열일 때 (400, 403 등)
	if (!res.ok) {
		const errorContent = await res.json();
		const { reason } = errorContent;

		throw new Error(reason);
	}

	return res;
}

export { post, get, patch, put, del as delete };
