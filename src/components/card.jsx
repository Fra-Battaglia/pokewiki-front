import { useEffect, useState } from 'react'
import './styles/generals.scss'
import axios from 'axios'
import store from '../store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRuler, faRulerVertical, faWeightHanging } from '@fortawesome/free-solid-svg-icons'

function Card(props) {
	const [pokemon, set_pokemon] = useState(null)

	function get_pokemon() {
		axios.get(props.url).then((response) => {
			set_pokemon(response.data)
		}).catch((error) => {
			console.error("Errore nel recupero dei dati del Pokémon:", error);
		});
	}

	useEffect(() => {get_pokemon();}, []);

	return (
		<>
			<div className={"p-0.5 rounded-lg bg-gradient-to-r " + (pokemon?.types[0] ? `from-[--type-${pokemon?.types[0].type.name}]` : "") + " " + (pokemon?.types[1] ? `to-[--type-${pokemon?.types[1].type.name}]` : pokemon?.types[0] ? `to-[--type-${pokemon?.types[0].type.name}]` : "")}>
				<div className='w-1/1 rounded-md flex aspect-square flex-col bg-black/[.7] relative'>
					{/* <div className="card-heder flex justify-between">
						<h1 className='uppercase font-bold'>N° {pokemon?.id}</h1>
					</div> */}
					<img src={pokemon?.sprites?.other?.home?.front_default} alt={pokemon?.name} className='w-full h-full max-h-full p-10' />
					<div className="pokemon-data flex flex-col gap-4 py-4">	
						<h1 className='uppercase font-bold text-center text-3xl leading-none'>{pokemon?.name}</h1>
						<div className="types flex gap-4 justify-center">
							{pokemon?.types.map((item) => (
								<div className={"type uppercase rounded py-0.5 px-4 font-bold " + item.type.name}>{item.type.name}</div>
							))}
						</div>
						<div className="flex gap-4 justify-center">
							<div>
								<div><FontAwesomeIcon icon={faRulerVertical} /> {pokemon?.height}</div>
								<div>Height</div>
							</div>

							<div>
								<div><FontAwesomeIcon icon={faWeightHanging} /> {pokemon?.weight}</div>
								<div>Weight</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Card