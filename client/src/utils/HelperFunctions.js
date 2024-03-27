import React from 'react';
import Sugar from 'sugar';

function increaseNumber(total, limit) {
	let numberOfPages = total / limit;
	let numberArr = [];

	for (let i = 0; i < numberOfPages; i++) {
		numberArr.push(i);
	}
	return numberArr;
}

let timeOut;

function handleError(err, setter) {
	if (!err) {
		return;
	}

	if (err?.response?.data?.msg) {
		setter(err.response.data.msg);
	}

	timeOut = setTimeout(() => {
		setter('');
	}, 5000);
}
function clearError() {
	clearTimeout(timeOut);
}

function convertDate(timestamp) {
	let dateBySugar = Sugar.Date.create(timestamp);
	let formattedDateBySugar = Sugar.Date.format(dateBySugar, '{dd}/{MM}/{yyyy}');

	return formattedDateBySugar;
}

function petDate(petstatus, since, until, className) {
	if (petstatus === 'lost' || petstatus === 'found') {
		return (
			<>
				<td className={className}>{petstatus}</td>
				<td className={className}>{convertDate(since)}</td>
			</>
		);
	} else {
		return (
			<>
				<td className={className}>{petstatus}</td>
				<td className={className}>{convertDate(until)}</td>
			</>
		);
	}
}

function showOptionalInputs(inputs, setInputs) {
	if (inputs.display === 'hideInputs') {
		setInputs({
			display: 'showInputs',
		});
	} else {
		setInputs({
			display: 'hideInputs',
		});
	}
}

function isInputEmpty(nameOfAttribute, attribute, className) {
	if (attribute === '') {
		return <td></td>;
	} else {
		return (
			<>
				<td className={className}>{nameOfAttribute}</td>
				<td className={className}>{attribute}</td>
			</>
		);
	}
}

function isFieldRequired(requiredField) {
	if (requiredField) {
		return '*';
	} else {
		return '(optional)';
	}
}

function changeCheckboxValue(array, setArray, string) {
	if (array.includes(string)) {
		setArray(array.filter((el) => el !== string));
	} else {
		setArray([...array, string]);
	}
}

function removeOverflowText(text, char) {
	if (text.length > char) {
		return text.split('').slice(0, char).concat(['...']).join('');
	} else {
		return text;
	}
}

async function cacheImages(srcArr) {
	const promises = await srcArr.map((src) => {
		return new Promise(function (resolve, reject) {
			const img = new Image();

			img.src = src;
			img.onload = resolve();
			img.onerror = reject();
		});
	});

	await Promise.all(promises);
}

function changeImagesIndex(arr, index, setIndex) {
	const numberOfImages = arr.length;

	if (index === numberOfImages - 1) {
		return setIndex(0);
	} else {
		return setIndex(index + 1);
	}
}

function changeFadeIn(object, setter) {
	if (object.fade === 'fade-in') {
		setter({
			fade: 'fade-out',
		});
	} else {
		setter({
			fade: 'fade-in',
		});
	}
}

function changeFadeOut(object, setter) {
	if (object.fade === 'fade-out') {
		setter({
			fade: 'fade-out',
		});
	} else {
		setter({
			fade: 'fade-out',
		});
	}
}

export {
	increaseNumber,
	handleError,
	clearError,
	convertDate,
	petDate,
	showOptionalInputs,
	isInputEmpty,
	isFieldRequired,
	changeCheckboxValue,
	removeOverflowText,
	cacheImages,
	changeImagesIndex,
	changeFadeIn,
	changeFadeOut,
};
