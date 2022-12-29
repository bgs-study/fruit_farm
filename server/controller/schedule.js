import db from '../models/index.js';
import { Op } from 'sequelize';
import schedule from 'node-schedule';

export const job = schedule.scheduleJob('* 5 0 * * *', async () => {
	const today = new Date();

	const year = today.getFullYear();
	const month = ('0' + (today.getMonth() + 1)).slice(-2);
	const day = ('0' + today.getDate()).slice(-2);

	const date = year + '-' + month + '-' + day; //2022-12-28

	const allReserve = await db.Reservations.findAll({
		where: {
			[Op.or]: [{ status: '예약대기' }, { status: '예약완료' }],
		},
	});

	for (let i = 0; i < allReserve.length; i++) {
		const timeInfo = await db.TimeTables.getById(allReserve[i].time_id); //예약의 timetable 정보 불러옴

		if (new Date(timeInfo.date) < new Date(date)) {
			// 체험날짜가 지났으면
			if (allReserve[i].status === '예약대기') {
				await db.Reservations.update(
					{ status: '예약취소' },
					{ where: { id: allReserve[i].id } },
				);
			} else {
				await db.Reservations.update(
					{ status: '체험완료' },
					{ where: { id: allReserve[i].id } },
				);
			}
		}
	}
});
