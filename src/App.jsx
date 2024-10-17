import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card.jsx'
import Jumbotron from './components/Jumbotron.jsx'
import axios from 'axios'
import store from './store'
import PokemonDetail from './components/PokemonDetail.jsx'

function App() {
	const [pokemons, set_pokemons] = useState([]);
	const [loading, set_loading] = useState(true);

	async function get_pokemons() {
		try {
			const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=107&offset=386');
			const pokemon_results = response.data.results;

			const pokemon_details_promises = pokemon_results.map(pokemon => 
				axios.get(pokemon.url).then(response => ({
					...response.data,
					url: pokemon.url
				}))
			);
			
			const detailed_pokemons = await Promise.all(pokemon_details_promises);
			set_pokemons(detailed_pokemons);
			set_loading(false)
		} catch(error) {
			console.error("Errore nel recupero dei dati del Pokémon:", error);
		};
	}

	useEffect(() => {get_pokemons();}, []);

	return (
		<>
			<Jumbotron />
			<main className='py-8 text-center'>
				<h1 className="text-4xl font-bold">POKÉDEX</h1>
				{loading ? (<div>loading...</div>) : (
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 container my-0 mx-auto gap-4">
						{pokemons.map((item) => 
							!item ? (<div>loading...</div>) : (
						<Card 
									key={item.id}
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

export default App
