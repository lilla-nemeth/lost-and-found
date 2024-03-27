import React, { useEffect, useState } from 'react';
import '../../style/App.css';
import img01 from '../../assets/images/01backgroundImg.jpg';
import img02 from '../../assets/images/02backgroundImg.jpg';
import img03 from '../../assets/images/03backgroundImg.jpg';
import img04 from '../../assets/images/04backgroundImg.jpg';
import img05 from '../../assets/images/05backgroundImg.jpg';
import img06 from '../../assets/images/06backgroundImg.jpg';
import img07 from '../../assets/images/07backgroundImg.jpg';
import { changeImagesIndex, changeFadeOut, changeFadeIn } from '../../utils/HelperFunctions';

const BackgroundImage = () => {
	const [fadeIn, setFadeIn] = useState({
		fade: 'fade-in',
	});
	const [fadeOut, setFadeOut] = useState({
		fade: 'fade-out',
	});
	const [imageIndex, setImageIndex] = useState(0);

	const images1 = [img01, img02, img02, img03, img03, img04, img04, img05, img05, img06, img06, img07, img07, img01];
	const images2 = [img01, img01, img02, img02, img03, img03, img04, img04, img05, img05, img06, img06, img07, img07, img01];

	useEffect(() => {
		const imagesInterval = setInterval(() => {
			changeImagesIndex(images2, imageIndex, setImageIndex);
			changeImagesIndex(images1, imageIndex, setImageIndex);
			changeFadeOut(fadeOut, setFadeOut);
			changeFadeIn(fadeIn, setFadeIn);
		}, 7000);

		if (imagesInterval) {
			return () => clearInterval(imagesInterval);
		}
	}, [fadeIn, fadeOut, imageIndex, setImageIndex]);

	const urlImages1 = `url('${images1[imageIndex]}')`;
	const urlImages2 = `url('${images2[imageIndex]}')`;

	return (
		<>
			<div className='backgroundFilter'>
				<div className={fadeOut.fade} style={{ backgroundImage: urlImages2 }}>
					<div className={fadeIn.fade} style={{ backgroundImage: urlImages1 }}></div>
				</div>
			</div>
		</>
	);
};

export default BackgroundImage;
