import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { cacheImages } from '../utils/HelperFunctions';
import Video from '../assets/video/dogvideo.mp4';
import img01 from '../assets/images/02backgroundImg.jpg';
import img02 from '../assets/images/02backgroundImg.jpg';
import img03 from '../assets/images/03backgroundImg.jpg';
import img04 from '../assets/images/04backgroundImg.jpg';
import img05 from '../assets/images/05backgroundImg.jpg';
import img06 from '../assets/images/06backgroundImg.jpg';
import img07 from '../assets/images/07backgroundImg.jpg';
import AppRoutesWithToken from './AppRoutesWithToken';
import AppRoutesWithoutToken from './AppRoutesWithoutToken';

function AppRoutes() {
	const { token } = useContext(AuthContext);

	const images = [Video, img01, img02, img03, img04, img05, img06, img07];

	let transparent = true;

	useEffect(() => {
		cacheImages(images);
	});

	if (!token) {
		return <AppRoutesWithToken transparent={transparent} />;
	}

	return <AppRoutesWithoutToken transparent={transparent} />;
}

export default AppRoutes;
