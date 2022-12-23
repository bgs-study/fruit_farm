import { Route, Routes} from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/login';
import Register from './pages/register';
import DetailPage from './pages/DetailPage';
import Payment from './pages/Payment';
import { MyPage } from './pages/MyPage';
import Farm from './pages/Farm';
import FarmReservation from './pages/FarmReservation';
import FarmTimeTable from './pages/FarmTimeTable';
import MyReservation from './pages/MyReservation';
import Favorite from './pages/Favorite';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/detail/:id" element={<DetailPage />} />
					<Route path="/pay" element={<Payment />} />
					<Route path="/mypage" element={<MyPage />} />
					<Route path="/farm" element={<Farm />} />
					<Route path="/farm/reservation" element={<FarmReservation />} />
					<Route path="/farm/timetable" element={<FarmTimeTable />} />
					<Route path="/myreservation" element={<MyReservation />} />
					<Route path="/favorite" element={<Favorite/>}/>
					{/* 해당부분에 라우터 넣으면 됩니다. */}
				</Route>
			</Routes>
		</div>
	);
}

export default App;
