import { useEffect, useState } from 'react'
import './styles/generals.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function PokemonDetail(props) {
	const [pokemon, set_pokemon] = useState(null);
	const { pokemonID } = useParams();


	function getPokemon() {		
		axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemonID).then((response) => {
			set_pokemon(response.data)
		})
	}

	useEffect(() => {getPokemon();}, [])
	
	return (
		<>
			<section>
				<div className="container my-0 mx-auto">
					<Link to={'/'}><button className="rounded border border-white bg-black/[.4] w-12 flex items-center justify-center self-center aspect-square" id='io'><FontAwesomeIcon icon={faArrowLeft} /></button></Link>
					<div className="flex gap-12 items-center">
						<img src={pokemon?.sprites?.other?.home?.front_default} alt={pokemon?.name} />
						<div className="pokemon-info">
							<h3 className='uppercase font-bold mb-4 text-3xl'>{pokemon?.name}</h3>
							<div className="stats">
								{pokemon?.stats.map((item) => (
									<p key={item?.stat?.name}>{item?.stat?.name}: {item?.base_stat}</p>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default PokemonDetail