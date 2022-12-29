// import {rest} from 'msw';

// const contents = [
//   {
//     "postNumber" : "1",
//     "imageURL" : "assets/potato.jpg",
//     "address": "강원 영월군",
//     "produce" : "감자",
//     "name": "나눔드리농장",
//     "price": "20000",
//     "capacity" : 5,
//     "period": ["2022/1/10","2022/2/28"]
//   },
//   {
//     "postNumber" : "2",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충남 논산시",
//     "produce" : "딸기",
//     "name": "아침애딸기농장",
//     "price": "30000",
//     "capacity" : 1,
//     "period": ["2022/3/1","2022/3/31"]
//   },
//   {
//     "postNumber" : "3",
//     "imageURL" : "assets/peach.jpg",
//     "address": "경북 청도군",
//     "produce": "복숭아",
//     "name": "SC복숭아체험농원",
//     "price": "40000",
//     "capacity" : 3,
//     "period": ["2022/5/10","2022/6/28"]
//   },
//   {
//     "postNumber" : "4",
//     "imageURL" : "assets/potato.jpg",
//     "address": "강원 영월군",
//     "produce": "감자",
//     "name": "나눔드리농장2",
//     "price": "20000",
//     "capacity" : 6,
//     "period": ["2022/12/15","2023/2/28"]
//   }
// ];

// const locationSearch = {
//   '서울시' : {
//     address: "서울시 용이동2",
//     description: "수박 농장입니다. 수박을 체험하세요",
//     id: 1,
//     name: "박수 농장",
//     owner: "김박수",
//     type: "watermelon"
//   }
// }

// export const handlers = [
//   // 전체 조회
//   // rest.get('/api/farms', (req, res, ctx) => {
//   //   return res(ctx.status(200), ctx.json(contents));
//   // }),

//   // 지역 검색
//   rest.get('/api/farms/location?', (req, res, ctx)=> {
//     const location = req.url.searchParams.get('location').split('/')[0];

//     console.log('location', location);

//     return res(ctx.status(200), ctx.json(locationSearch[location]))

//     // if (page === 0){
//     //   console.log('page 0 일 때 실행')
//     //   const data = testContents.filter(x=>x.location === location).slice(0, 100);
//     //   console.log('필터', data);
//     //   return res(ctx.status(200), ctx.json(data)); 
//     // }else{
//     //   console.log('page 0 아닐 때 실행', page);
//     //   const data = testContents.filter(x=>x.location === location)(100 + 10*(page-1), 100 + 10*(page));
//     //   return res(ctx.status(200), ctx.json(data));
//     // }
//   }),

//   // 쿼리 스트링 테스트
//   rest.get(`/api/farms/location?`, async (req, res, ctx)=>{
//     const data = req.url.searchParams.get('search');
//     console.log(data);
//     console.log('어디')
//     return res(ctx.status(200), ctx.json(data));
//   }),

//   // 무한 스크롤 테스트
//   rest.get(`/api/farms/:page`, (req, res, ctx)=>{
//     const page = Number(req.params.page);
  
//     if (page === 0){
//       const data = testContents.slice(0, 50);
//       return res(ctx.status(200), ctx.json(data)); 
//     }else{
//       console.log('page 0 아닐 때 실행', page);
//       // console.log(testContents.slice(100, ))
//       const data = testContents.slice(50 + 10*(page-1), 50 + 10*(page));
//       return res(ctx.status(200), ctx.json(data));
//     }
//   }),

//   rest.get('/api/farms', (req, res, ctx)=>{
//     const data = testContents;
//     return res(ctx.status(200), ctx.json(data));
//   })
// ]
// // page = 1 : 100 ~ 109
// // page = 2 : 110 ~ 119

// const testContents = [
//   {
//     "postNumber" : "1",
//     "imageURL" : "assets/potato.jpg",
//     'location' : "Gangwon",
//     "address": "강원도 영월군",
//     "name": "나눔드리농장",
//     "price": "20000"
//   },
//   {
//     "postNumber" : "2",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "3",
//     "imageURL" : "assets/peach.jpg",
//     "address": "경상북도 청도군",
//     "name": "SC복숭아체험농원",
//     "price": "40000"
//   },
//   {
//     "postNumber" : "4",
//     "imageURL" : "assets/potato.jpg",
//     "address": "강원도 영월군",
//     "name": "나눔드리농장",
//     "price": "20000"
//   },
//   {
//     "postNumber" : "5",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "6",
//     "imageURL" : "assets/peach.jpg",
//     "address": "경상북도 청도군",
//     "name": "SC복숭아체험농원",
//     "price": "40000"
//   },
//   {
//     "postNumber" : "7",
//     "imageURL" : "assets/potato.jpg",
//     "address": "강원도 영월군",
//     "name": "나눔드리농장",
//     "price": "20000"
//   },
//   {
//     "postNumber" : "8",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "9",
//     "imageURL" : "assets/peach.jpg",
//     "address": "경상북도 청도군",
//     "name": "SC복숭아체험농원",
//     "price": "40000"
//   },
//   {
//     "postNumber" : "10",
//     "imageURL" : "assets/potato.jpg",
//     "address": "강원도 영월군",
//     "name": "나눔드리농장",
//     "price": "20000"
//   },
//   {
//     "postNumber" : "11",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "12",
//     "imageURL" : "assets/peach.jpg",
//     "address": "경상북도 청도군",
//     "name": "SC복숭아체험농원",
//     "price": "40000"
//   },
//   {
//     "postNumber" : "13",
//     "imageURL" : "assets/potato.jpg",
//     "address": "강원도 영월군",
//     "name": "나눔드리농장",
//     "price": "20000"
//   },
//   {
//     "postNumber" : "14",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "15",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "16",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "17",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "18",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "19",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "20",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "21",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "22",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "23",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "24",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "25",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },  {
//     "postNumber" : "26",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "27",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },  {
//     "postNumber" : "28",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },  {
//     "postNumber" : "29",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },  {
//     "postNumber" : "30",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "31",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "32",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "33",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "34",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "35",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "36",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },  {
//     "postNumber" : "37",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "38",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },  {
//     "postNumber" : "39",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },  {
//     "postNumber" : "40",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },  {
//     "postNumber" : "41",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "42",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "43",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "44",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "45",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "46",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "47",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },  {
//     "postNumber" : "48",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "49",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },  {
//     "postNumber" : "50",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },  {
//     "postNumber" : "51",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },  {
//     "postNumber" : "52",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "53",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "54",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "55",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "56",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "57",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "58",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },  {
//     "postNumber" : "59",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "60",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },  {
//     "postNumber" : "61",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },  {
//     "postNumber" : "62",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },  {
//     "postNumber" : "63",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "64",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "65",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "66",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "67",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "68",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "69",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },  {
//     "postNumber" : "70",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "71",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },  {
//     "postNumber" : "72",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },  {
//     "postNumber" : "73",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },  {
//     "postNumber" : "74",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "75",
//     "imageURL" : "assets/potato.jpg",
//     "address": "강원도 영월군",
//     "name": "나눔드리농장",
//     "price": "20000"
//   },
//   {
//     "postNumber" : "76",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "77",
//     "imageURL" : "assets/peach.jpg",
//     "address": "경상북도 청도군",
//     "name": "SC복숭아체험농원",
//     "price": "40000"
//   },
//   {
//     "postNumber" : "78",
//     "imageURL" : "assets/potato.jpg",
//     "address": "강원도 영월군",
//     "name": "나눔드리농장",
//     "price": "20000"
//   },
//   {
//     "postNumber" : "79",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "80",
//     "imageURL" : "assets/peach.jpg",
//     "address": "경상북도 청도군",
//     "name": "SC복숭아체험농원",
//     "price": "40000"
//   },
//   {
//     "postNumber" : "81",
//     "imageURL" : "assets/potato.jpg",
//     "address": "강원도 영월군",
//     "name": "나눔드리농장",
//     "price": "20000"
//   },
//   {
//     "postNumber" : "82",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "83",
//     "imageURL" : "assets/peach.jpg",
//     "address": "경상북도 청도군",
//     "name": "SC복숭아체험농원",
//     "price": "40000"
//   },
//   {
//     "postNumber" : "84",
//     "imageURL" : "assets/potato.jpg",
//     "address": "강원도 영월군",
//     "name": "나눔드리농장",
//     "price": "20000"
//   },
//   {
//     "postNumber" : "85",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "86",
//     "imageURL" : "assets/peach.jpg",
//     "address": "경상북도 청도군",
//     "name": "SC복숭아체험농원",
//     "price": "40000"
//   },
//   {
//     "postNumber" : "87",
//     "imageURL" : "assets/potato.jpg",
//     "address": "강원도 영월군",
//     "name": "나눔드리농장",
//     "price": "20000"
//   },
//   {
//     "postNumber" : "88",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "89",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "90",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "91",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "92",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "93",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "94",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "95",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "96",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "97",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "98",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "99",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },  {
//     "postNumber" : "100",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "아침애딸기농장",
//     "price": "30000"
//   },
//   {
//     "postNumber" : "101",
//     "imageURL" : "assets/strawberry.jpg",
//     "address": "충청남도 논산시",
//     "name": "테스트중",
//     "price": "30000"
//   }
// ]