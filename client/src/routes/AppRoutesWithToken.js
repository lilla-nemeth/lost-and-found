import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from '../utils/ScrollToTop';
import SignUp from '../components/login-signup/SignUp';
import Login from '../components/login-signup/Login';
import PetHome from '../components/lost_and_found/PetHome';
import PetLandingPage from '../components/landing_page/PetLandingPage';
import PetProfile from '../components/lost_and_found/PetProfile';
import Navbar from '../components/navbar-footer/Navbar';
import Footer from '../components/navbar-footer/Footer';

function AppRoutesWithToken(props) {
	let { transparent } = props;

	let DEBUG = false;

	return (
		<>
			<BrowserRouter>
				<ScrollToTop>
					<Routes>
						<Route path='/login' element={<Login />}></Route>
						<Route path='/signup' element={<SignUp />}></Route>
						<Route
							path='/'
							element={
								<>
									<Navbar />
									<PetHome />
									<Footer />
								</>
							}
						></Route>
						<Route
							path={'/petprofile/:id'}
							element={
								<>
									<Navbar />
									<PetProfile />
									<Footer />
								</>
							}
						></Route>
						<Route
							exact
							path='/'
							element={
								<>
									<Navbar transparent={transparent} />
									<PetLandingPage />
								</>
							}
						></Route>
						<Route
							path='*'
							element={
								<>
									<Navbar transparent={transparent} />
									<PetLandingPage />
								</>
							}
						></Route>
					</Routes>
				</ScrollToTop>
			</BrowserRouter>
		</>
	);
}

export default AppRoutesWithToken;
