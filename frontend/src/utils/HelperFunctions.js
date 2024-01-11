import React from 'react';
import Sugar from 'sugar';

export function increaseNumber(total, limit) {
	let numberOfPages = total / limit;
	let numberArr = [];

	for (let i = 0; i < numberOfPages; i++) {
		numberArr.push(i);
	}
	return numberArr;
}

let timeOut;

export function handleError(err, setter) {
	setter(err && err.response && err.response.data && err.response.data.msg);

	timeOut = setTimeout(() => {
		setter('');
	}, 5000);
}

export function clearError() {
	clearTimeout(timeOut);
}

export function convertDate(timestamp) {
	let dateBySugar = Sugar.Date.create(timestamp);
	let formattedDateBySugar = Sugar.Date.format(dateBySugar, '{dd}/{MM}/{yyyy}');

	return formattedDateBySugar;
}

export function petDate(petstatus, since, until, className) {
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

export function isInputEmpty(nameOfAttribute, attribute, className) {
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

export function isFieldRequired(requiredField) {
	if (requiredField) {
		return '*';
	} else {
		return '(optional)';
	}
}

export function changeCheckboxValue(array, setArray, string) {
	if (array.includes(string)) {
		setArray(array.filter((el) => el != string));
	} else {
		setArray([...array, string]);
	}
}

export function removeOveflowText(text, char) {
	if (text.length > char) {
	  return text.split('').slice(0, char).concat(['...']).join('');
	} else {
	  return text;
	}
};

export async function cacheImages(srcArr) {
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

export function changeImagesIndex(arr, index, setIndex) {
	const numberOfImages = arr.length;

	if (index === numberOfImages - 1) {
	  return setIndex(0);
	} else {
	  return setIndex(index + 1);
	}
}

export function changeFadeIn(object, setter) {
	if (object.fade === 'fade-in') {
		setter({
			fade: 'fade-out'
		})
	} else {
		setter({
			fade: 'fade-in'
		})
	}
}

export function changeFadeOut(object, setter) {
	if (object.fade === 'fade-out') {
		setter({
			fade: 'fade-out'
		})
	} else {
		setter({
			fade: 'fade-out'
		})
	}
}
