import 'express-async-errors';
import db from '../models/index.js';
import Farms from '../models/farm.js';

// 서비스가 확장되어 타입이 늘어나면 ex (딸기, 수박, 파인애플 등등) 특정타입을 받아 특정타입의 농장을 조회
export async function getFarms(req, res, next) {
	const { type } = req.query;
	const data = await (type
		? db['Farms'].getByType(type)
		: db['Farms'].getAll());
	if (!data) {
		return res.status(404).json({ message: '해당 농장을 찾을 수 없습니다.' });
	}
	res.status(200).json(data);
}

export async function getByLocation(req, res, next) {
	const { address } = req.query;
	console.log(address);
	const data = await db.Farms.getByAddress(address);
	console.log('data = ', data.dataValues);
	if (!data) {
		return res.status(404).json({ message: '해당지역에는 농장이 없습니다.' });
	}
	res.status(200).json(data);
}

export async function createFarm(req, res, next) {
	const { type, name, address, description, owner } = req.body;
	const farm = await db.Farms.create({
		type,
		name,
		address,
		description,
		owner,
	});
	res.status(201).json(farm);
}

// 농장 소유자가 update를 해야함으로 농장소유자의 테이블을 만들고 농장소유자의 id 값을 확인 후
// 해당 농장 소유자가 맞으면 데이터 수정
// => 미구현
// export async function updateFarm(req, res, next) {
//   const { type, name, address, description, owner } = req.body;
//   const { id } = req.params;
//   const user = await db.Farms.findById(id);
//   //console.log(user);
//   if (!user) {
//     return res.status(404).json({ message: `User not found: ${id}` });
//   }
//   if (user.id !== req.userId) {
//     return res.sendStatus(403);
//   }
//   const updated = await db.Farms.update(
//     id,
//     type,
//     name,
//     address,
//     description,
//     owner
//   );
//   res.status(200).json(updated);
// }

// export async function updateTweet(req, res, next) {
//   const id = req.params.id;
//   const text = req.body.text;
//   const tweet = await tweetRepository.getById(id);
//   if (!tweet) {
//     return res.status(404).json({ message: `Tweet not found: ${id}` });
//   }
//   if (tweet.userId !== req.userId) {
//     return res.sendStatus(403);
//   }
//   const updated = await tweetRepository.update(id, text);
//   res.status(200).json(updated);
// }
