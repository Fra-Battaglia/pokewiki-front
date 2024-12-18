import { useEffect, useState } from 'react'
import Card from './Card.jsx'
import Jumbotron from './Jumbotron.jsx'
import axios from 'axios'
import store from '../store.js'
import PokemonDetail from './PokemonDetail.jsx'
import { useParams } from 'react-router-dom'
import Header from './header.jsx'

function Generation() {
	const [pokemons, set_pokemons] = useState([]);
	const [loading, set_loading] = useState(true);
	const { generationID } = useParams()

	async function get_pokemons() {
		try {
			// const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=107&offset=386');
			// const pokemon_results = response.data.results;
			
			const response = await axios.get('https://pokeapi.co/api/v2/generation/' + generationID);
			
			// Pokemon spieces details
			const pokemon_results = response.data.pokemon_species;
			const pokemon_spieces_details_promises = pokemon_results.map(pokemon => 
				axios.get(pokemon.url).then(response => ({
					...response.data,
					url: pokemon.url
				}))
			);
			
			const pokemons_spieces_details = await Promise.all(pokemon_spieces_details_promises);
			
			// Pokemon details
			const pokemon_details_promises = pokemons_spieces_details.map(pokemon => 
				axios.get(pokemon.varieties[0].pokemon.url).then(response => ({
					...response.data,
					url: pokemon.url
				}))
			);
			
			const pokemons_details = await Promise.all(pokemon_details_promises);

			set_pokemons(pokemons_details);
			set_loading(false)
		} catch(error) {
			console.error("Errore nel recupero dei dati del Pokémon:", error);
		};
	}

	useEffect(() => {get_pokemons();}, []);

	return (
		<>
			<Header />
			<main className='py-8 text-center'>
				<h1 className="text-4xl font-bold mb-8">POKÉDEX</h1>
				{loading ? (<div>loading...</div>) : (
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 container my-0 mx-auto gap-4">
					{pokemons.sort((a, b) => a.id > b.id ? 1 : -1).map((item) => 
						!item ? (<div>loading...</div>) : (
						<Card 
							key={item.id}
							id={item.id}
							name={item.name}
							image={item.sprites.other.home.front_default}
							types={item.types}
							height={item.height}
							weight={item.weight}
						/>
						)
					)}
					{/* <Card name={store.pokemon_info.name} image={store.pokemon_info?.sprites?.other.dream_world.front_default} />
					<Card name={store.pokemon_info.name} image={store.pokemon_info?.sprites?.other.dream_world.front_default} />
					<Card name={store.pokemon_info.name} image={store.pokemon_info?.sprites?.other.dream_world.front_default} /> */}
					{/* <h1>{store.pokemon_info.name}</h1> */}			
				</div>
				)}
			</main>
			<footer></footer>
		</>
	)
}

export default Generation