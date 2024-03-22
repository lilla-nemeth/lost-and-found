import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from '../utils/ScrollToTop';
import PetHome from '../components/home/PetHome';
import PetReport from '../components/report_pet/PetReport';
import PetLandingPage from '../components/landing_page/PetLandingPage';
import PetProfile from '../components/home/PetProfile';
import Dashboard from '../components/dashboard/Dashboard';
import Navbar from '../components/navbar-footer/Navbar';
import Footer from '../components/navbar-footer/Footer';

function AppRoutesWithoutToken(props) {
	let { transparent } = props;

	return (
		<>
			<BrowserRouter>
				<ScrollToTop>
					<Routes>
						<Route
							path='/reportpet'
							element={
								<>
									<Navbar />
									<PetReport />
									<Footer />
								</>
							}
						></Route>
						<Route
							path='/dashboard'
							element={
								<>
									<Navbar />
									<Dashboard />
									<Footer />
								</>
							}
						></Route>
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
									<Navbar />
									<PetReport />
									<Footer />
								</>
							}
						></Route>
					</Routes>
				</ScrollToTop>
			</BrowserRouter>
		</>
	);
}

export default AppRoutesWithoutToken;
