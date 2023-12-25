import React, { useContext, useState } from 'react';
import { AppStateContext } from '../../contexts/AppStateContext';
import PetListCard from '../generic/PetListCard';
import Search from '../generic/Search';

const PetListWithSearch = () => {
	const { pets, allPets } = useContext(AppStateContext);
	const [search, setSearch] = useState('');
	const [searchColumns, setSearchColumns] = useState([
		'id',
		'petstatus',
		'petlocation',
		'species',
		'petsize',
		'breed',
		'sex',
		'color',
		'age',
		'uniquefeature',
		'postdescription',
	]);

	let DEBUG = false;

	// Alternative:
	// pet.petstatus.toLowerCase().includes(search.toLowerCase())

	// const columns = allPets[0] && Object.keys(allPets[0]);

	return (
		<>
			<h1 className='lostAndFoundHeadline'>Lost and Found Pets</h1>
			<Search search={search} setSearch={setSearch} />
			<div className='petListContainer'>
				{search === ''
					? pets.map((pet) => {
							return <PetListCard key={pet.id} pet={pet} />;
					  })
					: allPets
							.filter((filteredPet) => {
								if (searchColumns.some((column) => filteredPet[column].toString().toLowerCase().indexOf(search.toLowerCase()) > -1)) {
									return filteredPet;
								}
							})
							.map((pet) => {
								return <PetListCard key={pet.id} pet={pet} />;
							})}
			</div>
		</>
	);
};

export default PetListWithSearch;
