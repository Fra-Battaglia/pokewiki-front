import { useEffect, useState } from 'react'
import './styles/generals.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Move from './Move';
import Header from './header';

function PokemonDetail(props) {
	const [pokemon, set_pokemon] = useState(null);
	const [loading, set_loading] = useState(true);
	const { pokemonID } = useParams();


	function get_pokemon() {		
		axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemonID).then((response) => {
			set_pokemon(response.data)
			set_loading(false)
		})
	}

	function toTitleCase(str) {
		return str.replace(
		  /\w\S*/g,
		  text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
		);
	  }

	useEffect(() => {get_pokemon();}, []);

	document.title = !loading ?  "PokeWiki - " + toTitleCase(pokemon.name) : "PokeWiki";
	
	return (
		<>
			{loading ? (<div>loading...</div>) : (
				<section className={"p-0.5 h-screen bg-gradient-to-r flex flex-col " + (pokemon.types[0] ? `from-[--type-${pokemon.types[0].type.name}]` : "") + " " + (pokemon.types[1] ? `to-[--type-${pokemon.types[1].type.name}]` : pokemon.types[0] ? `to-[--type-${pokemon.types[0].type.name}]` : "")}>
					<div className="h-full bg-black/[.8] flex-grow overflow-auto">
					<Header />
						<div className="container my-8 mx-auto">
							<div>
								<Link to={-1}><button className="border border-white bg-black/[.4] flex gap-2 items-center justify-center self-center px-4 py-2 hover:underline" id='io'><FontAwesomeIcon icon={faArrowLeft} /> Back</button></Link>
								<div className="flex items-start">
									<div className="bg-black/[.4]"><img src={pokemon.sprites.other.home.front_default} alt={pokemon.name} /></div>
									<div className="pokemon-info grow overflow-auto flex flex-col">
										<h3 className='uppercase font-bold mb-4 text-6xl'>{pokemon.name}</h3>
										<div className="types flex gap-4 mb-4">
										{pokemon.types.map((item) => (
											<div className={"type uppercase rounded px-2 font-bold " + item.type.name} key={item.type.name}>{item.type.name}</div>
										))}
										</div>
										<div className="stats">
											{pokemon.stats.map((item) => (
												<p key={item.stat.name}>{item.stat.name}: {item.base_stat}</p>
											))}
										</div>
									</div>
								</div>
								<h4 className='uppercase font-bold mb-4 text-4xl text-center'>MOVESET</h4>
								<div className="moves overflow-y-auto grid grid-cols-2 lg:grid-cols-3 gap-4 grow">
									{pokemon.moves.map((item) => (
										<Move key={item.move.url} name={item.move.name} url={item.move.url} />
									))}
								</div>
							</div>
						</div>
					</div>
				</section>
			)}
		</>
	)
}

export default PokemonDetail