import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import DetailPage from './pages/DetailPage';
import Payment from './pages/Payment';

import MyPage  from './pages/MyPage';
import MyReview from './pages/MyReview';
import MyReservation from './pages/MyReservation';
import CreateReviewPage from './pages/CreateReviewPage';
import UpdateReviewPage from './pages/UpdateReviewPage';
import Farm from './pages/Farm';
import EditFarm from './pages/EditFarm';
import FarmReservation from './pages/FarmReservation';
import FarmTimeTable from './pages/FarmTimeTable';
import Favorite from './pages/Favorite';
import FarmReview from './pages/FarmReview';
import NotFound from './pages/NotFound';

// memo 지우: NonMemberRoute -> 비회원일 때만 페이지 전환
// MemberRoute -> 일반 회원일 때만 페이지 전화
// FarmerRoute -> 농장주일 때만 페이지 전환
import {
	NonMemberRoute,
	MemberRoute,
	FarmerRoute,
} from './components/RestrictionRoute';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<Home />} />
					<Route
						path="/login"
						element={
							<NonMemberRoute>
								<Login />
							</NonMemberRoute>
						}
					/>
					<Route
						path="/register"
						element={
							<NonMemberRoute>
								<Register />
							</NonMemberRoute>
						}
					/>
					<Route path="/detail/:id" element={<DetailPage />} />
					<Route
						path="/pay"
						element={
							<MemberRoute>
								<Payment />
							</MemberRoute>
						}
					/>
					<Route
						path="/mypage"
						element={
							<MemberRoute>
								<MyPage />
							</MemberRoute>
						}
					/>
					<Route
						path="/mypage/reservation"
						element={
							<MemberRoute>
								<MyReservation />
							</MemberRoute>
						}
					/>
					<Route
						path="/mypage/review"
						element={
							<MemberRoute>
								<MyReview />
							</MemberRoute>
						}
					/>
					\
					<Route
						path="/mypage/writereview/:id"
						element={
							<MemberRoute>
								<CreateReviewPage />
							</MemberRoute>
						}
					/>
					<Route
						path="/mypage/updatereview/:id"
						element={
							<MemberRoute>
								<UpdateReviewPage />
							</MemberRoute>
						}
					/>
					<Route
						path="/favorite"
						element={
							<MemberRoute>
								<Favorite />
							</MemberRoute>
						}
					/>
					<Route
						path="/farm"
						element={
							<FarmerRoute>
								<Farm />
							</FarmerRoute>
						}
					/>
					<Route
						path="/farm/edit"
						element={
							<FarmerRoute>
								<EditFarm />
							</FarmerRoute>
						}
					/>
					<Route
						path="/farm/reservation"
						element={
							<FarmerRoute>
								<FarmReservation />
							</FarmerRoute>
						}
					/>
					<Route
						path="/farm/timetable"
						element={
							<FarmerRoute>
								<FarmTimeTable />
							</FarmerRoute>
						}
					/>
					<Route
						path="/farm/review"
						element={
							<FarmerRoute>
								<FarmReview />
							</FarmerRoute>
						}
					/>
					<Route path="/notfound" element={<NotFound />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
