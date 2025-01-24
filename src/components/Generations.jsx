import { useEffect, useState } from 'react'
import './styles/generals.scss'
import axios from 'axios'
import store from '../store'
import Header from './header'
import { Link } from 'react-router-dom'
import Loading from './Loading'

function Generaitons(props) {
	const [generations, set_generations] = useState([]);
	const [loading, set_loading] = useState(true);

	async function get_generations() {
		try {
			
			const response = await axios.get('https://pokeapi.co/api/v2/generation/');
			const generations_response = response.data.results;

			set_generations(generations_response);
			set_loading(false)
		} catch(error) {
			console.error("Errore nel recupero dei dati del Pokémon:", error);
		};
	}

	useEffect(() => {get_generations();}, []);

	return (
		<>
			{loading ? (<Loading />) : (
			<>
			<Header />
			<main className='py-8 text-center'>
				<h1 className="text-4xl font-bold mb-8">GENERATIONS</h1>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 container my-0 mx-auto gap-4">
						{generations.map((generation) =>
							!generation ? (<div>loading...</div>) : (
							<Link to={"/generations/" + generation.name + "/"}><div className='hover:underline'>{generation.name}</div></Link>)
						)}		
					</div>
			</main>
			<footer></footer>
			</>
			)}
		</>
	)
}

export default Generaitons