import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/card'
import Jumbotron from './components/jumbotron'
import axios from 'axios'
import store from './store'

function App() {
	const [pokemons, set_pokemons] = useState(null);

	function get_pokemons() {
		axios.get('https://pokeapi.co/api/v2/pokemon?limit=107&offset=386').then((response) => {
			set_pokemons(response.data)
			store.pokemon_info = response.data.results;
			let pokemons = store.pokemon_info
			
			// pokemons.forEach(pokemon => {
			// 	axios.get(pokemon.url).then((response) => {
			// 		let pokemon_info = response.data
			// 		pokemon.pokemon_info = pokemon_info
			// 	})
			// 	.catch((error) => {
			// 		console.error("Errore nel recupero dei dati del Pokémon:", error);
			// 	})
			// });
			
			// pokemons = response.data.results
			// console.log(pokemons);
		}).catch((error) => {
			console.error("Errore nel recupero dei dati del Pokémon:", error);
		});
	}

	useEffect(() => {get_pokemons();}, []);

	return (
		<>
			<header></header>
			<Jumbotron />
			<main className='py-8 text-center'>
				<h1 className="text-4xl font-bold">POKÉDEX</h1>
				<div className="grid grid-cols-1 md:grid-cols-4 container my-0 mx-auto gap-4">
					{store.pokemon_info.map((item) => (
						<Card 
							key={item?.url}
							url={item?.url}
							name={item?.name}
							image={item?.pokemon_info?.sprites?.other?.dream_world?.front_default}
						/>
					))}
					{/* <Card name={store.pokemon_info.name} image={store.pokemon_info?.sprites?.other.dream_world.front_default} />
					<Card name={store.pokemon_info.name} image={store.pokemon_info?.sprites?.other.dream_world.front_default} />
					<Card name={store.pokemon_info.name} image={store.pokemon_info?.sprites?.other.dream_world.front_default} /> */}
					{/* <h1>{store.pokemon_info.name}</h1> */}			
				</div>
			</main>
			<footer></footer>
		</>
	)
}

export default App
