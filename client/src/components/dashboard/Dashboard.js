import React, { useContext, useState } from 'react';
import { createBrowserHistory } from 'history';
import { AppStateContext } from '../../contexts/AppStateContext';
import { AuthContext } from '../../contexts/AuthContext';
import Loader from '../generic/Loader';
import { handleError, clearError } from '../../utils/HelperFunctions.js';
import UserPetCard from '../generic/UserPetCard';
import Sidebar from '../generic/Sidebar';
import SelectAll from '../generic/SelectAll';

let history = createBrowserHistory();

const Dashboard = () => {
	const { token } = useContext(AuthContext);
	const {
		getUserPets,
		deleteOnePet,
		deleteAllPets,
		userPets,
		setUserPets,
		fetchPets,
		limit,
		offset,
		setPets,
		setTotal,
		loader,
		setLoader,
	} = useContext(AppStateContext);
	const [allChecked, setAllChecked] = useState(false);
	const [petCardChecked, setPetCardChecked] = useState('');
	const [loading, setLoading] = useState(false);
	const [active, setActive] = useState(true);
	// errorMsg is not used
	// eslint-disable-next-line
	const [errorMsg, setErrorMsg] = useState('');
	// successMsg is not used
	// eslint-disable-next-line
	const [successMsg, setSuccessMsg] = useState('');

	const disable = !allChecked || loading;

	history.replace('/dashboard');

	function deletePet(id) {
		setLoading(true);

		deleteOnePet({
			id,
			token,
			successCallback: (res) => {
				setLoading(false);
				getUserPets({
					token,
					successCallback: (res) => {
						setUserPets(res.data);
					},
				});
				setSuccessMsg(res);
				fetchPets({
					limit,
					offset,
					successCallback: (res) => {
						setPets(res.data.rows);
						setTotal(Number(res.data.count));
						setLoader(false);
					},
					errorCallback: (err) => {
						setLoading(false);
						clearError();
						handleError(err, setErrorMsg);
					},
				});
			},
			successTimeout: () =>
				setTimeout(() => {
					setSuccessMsg('');
				}, 5000),
			errorCallback: (err) => {
				setLoading(false);
				clearError();
				handleError(err, setErrorMsg);
			},
		});
	}

	function deleteUserAllPets() {
		setLoading(true);

		if (!disable) {
			deleteAllPets({
				token,
				successCallback: (res) => {
					setLoading(false);
					setUserPets([]);
					setAllChecked('');
					fetchPets({
						limit,
						offset,
						successCallback: (res) => {
							setPets(res.data.rows);
							setTotal(Number(res.data.count));
							setLoader(false);
						},
						errorCallback: (err) => {
							setLoading(false);
							clearError();
							handleError(err, setErrorMsg);
						},
					});
				},
				successTimeout: () =>
					setTimeout(() => {
						setSuccessMsg('');
					}, 5000),
				errorCallback: (err) => {
					setLoading(false);
					clearError();
					handleError(err, setErrorMsg);
				},
			});
		}
	}

	function handleCallback(status) {
		if (status) {
			setPetCardChecked(status);
		}
	}

	function uploadedPets() {
		return userPets.map((pet) => {
			return <UserPetCard key={pet.id} pet={pet} deletePet={deletePet} allChecked={allChecked} parentCallback={handleCallback} />;
		});
	}

	if (loader) {
		return <Loader />;
	}

	return (
		<main className='petMain'>
			<section>
				<h1 className='lostAndFoundHeadline'>My Posts</h1>
				<div className='dashboardContainer'>
					<div className='dashboardSidebar'>
						<Sidebar active={active} setActive={setActive} />
					</div>
					<div className='dashboardBox'>
						<SelectAll
							deleteUserAllPets={deleteUserAllPets}
							allChecked={allChecked}
							setAllChecked={setAllChecked}
							petCardChecked={petCardChecked}
							setPetCardChecked={setPetCardChecked}
							disable={disable}
						/>
						{uploadedPets()}
					</div>
				</div>
			</section>
		</main>
	);
};

export default Dashboard;
