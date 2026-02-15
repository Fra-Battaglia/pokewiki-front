import { useEffect, useState } from 'react'
import './styles/generals.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Move from './Move';
import Header from './header';
import { width } from '@fortawesome/free-brands-svg-icons/fa42Group';
import Loading from './Loading';

function PokemonDetail(props) {
	const [pokemon, set_pokemon] = useState(null);
	const [pokemon_species, set_pokemon_species] = useState(null);
	const [loading, set_loading] = useState(true);
	const [shiny, set_shiny] = useState(false);
	const [evolution_chain, set_evolution_chain] = useState([]);
	const { pokemonID } = useParams();


	async function get_pokemon_info() {	
		try {
			const varieties_data = await axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemonID);
			const species_data = await axios.get(varieties_data.data.species.url);

			const evolution_chain_data = await axios.get(species_data.data.evolution_chain.url);
			const chain = evolution_chain_data.data.chain;
			// const evolutions = [];

			// (chain.evolves_to.length > 0) ? evolutions.push(chain.evolves_to) : '';
			// (chain.evolves_to.length > 0 && chain.evolves_to[0].evolves_to.length > 0) ? evolutions.push(chain.evolves_to.evolves_to) : '';

			// console.log(chain.evolves_to);
			
			// chain.evolves_to.map((evolution) => {
			// 	console.log(evolution)
			// 	evolution.species.url = 1;
			// });

			// console.log(chain);

			async function evolutions(chain) {
				let data = [];
				let base_species = await axios.get(chain.species.url);
				let base_variety = await axios.get(base_species.data.varieties.filter(variety => variety.is_default).map(variety => variety.pokemon.url));
				console.log(base_variety.data);
				
				let current_stage = [{species: base_species.data, variety: base_variety.data, evolution_details: null}];
				data.push(current_stage);

				// Evolution data
				while (chain.evolves_to.length > 0) {
					let next_stage = await Promise.all(
						chain.evolves_to.map(async evolution => { 

							// prendi con api i dati dell'evoluzione (species)
							const evolution_species = await axios.get(evolution.species.url);
	
							// prendi con api i dati dell'evoluzione (variety)
							const evolution_variety = await axios.get(evolution_species.data.varieties.filter(variety => variety.is_default).map(variety => variety.pokemon.url));
	
							// nel return ti ritorni i dati dell'evoluzione (presi prima con axios)
							return {species: evolution_species.data, variety: evolution_variety.data, evolution_details: evolution.evolution_details[0]}

						})
					);
					// console.log("NEXT STAGE", next_stage);
					
					data.push(next_stage);

					if(chain.evolves_to.length > 1) {
						chain = { evolves_to: chain.evolves_to.map((evolution) => evolution.evolves_to).flat() };
						// console.log("CHAIN", chain)
					} else {
						chain = chain.evolves_to[0];
					}
				}

				// for (let i = 0; i < chain.evolves_to.length; i++) {
				// 	// data.push(chain.evolves_to[i].species);
				// 	evolutions(chain.evolves_to[i]);
				// };
				return data;
			}
			
			let evolutions_data = await evolutions(chain);
			// console.log(evolutions_data);
			
			
			set_pokemon(varieties_data.data)
			set_pokemon_species(species_data.data)
			set_evolution_chain(evolutions_data);
			set_loading(false)

		} catch (error) {
			console.error(`Errore nel recupero del pokemon:`, error);
			return null;
		}
	}

	function toTitleCase(str) {
		return str.replace(
		  /\w\S*/g,
		  text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
		);
	  }

	function toggleShiny() {set_shiny(!shiny);}

	useEffect(() => {get_pokemon_info();}, [pokemonID]);
	useEffect(() => {console.log(evolution_chain)}, [evolution_chain]);

	document.title = !loading ?  "PokeWiki - " + toTitleCase(pokemon.name) : "PokeWiki";
	
	return (
		<>
			{loading ? (<Loading />) : (
				<section className={"p-0.5 h-screen bg-linear-to-r flex flex-col " + (pokemon.types[0] ? `from-(--type-${pokemon.types[0].type.name})` : "") + " " + (pokemon.types[1] ? `to-(--type-${pokemon.types[1].type.name})` : pokemon.types[0] ? `to-(--type-${pokemon.types[0].type.name})` : "")}>
					<div className="h-full bg-black/[.8] grow overflow-auto p-4 lg:p-0">
					<Header />
						<div className="container my-8 mx-auto">
							<div>
								<Link to={-1}><button className="border border-white bg-black/[.4] flex gap-2 items-center justify-center self-center px-4 py-2 mb-4 hover:underline" id='io'><FontAwesomeIcon icon={faArrowLeft} /> Back</button></Link>
								
								{/* Pokemon data section */}

								<div className="grid grid-cols-1 lg:grid-cols-3 gap-y-8 lg:gap-x-4">

									{/* Name and Number*/}
									<h3 className='uppercase font-bold text-4xl text-center block md:hidden w-full'><span className="opacity-50">N°{pokemon.id}</span> {pokemon.name}</h3> 

									{/* Sprite area */}

									<div className='my-0 mx-auto'>
										<div className="bg-black/[.4] shrink-0 p-4 relative">
											<img src="/src/assets/img/icons/sparks.svg" alt="shiny" id='shiny' className={'absolute top-4 right-4 w-12 m-2 ' + (!shiny ? 'opacity-50' : '')} onClick={toggleShiny} />
											<img src={!shiny ? pokemon.sprites.other.home.front_default : pokemon.sprites.other.home.front_shiny} alt={pokemon.name} />
										</div>
											{evolution_chain.length > 1 ? (
												<div className="evolutions flex items-center w-full mt-4">
													{/* Evolutions */}

													{evolution_chain.map((stage, index) => (
														<div key={index} className=" flex items-center grow last:grow-0 after:content-[''] after:grow after:border-y-2 after:border-black/[.4] last:after:hidden">
															{stage.map((evolution) => (
																<Link to={"/pokemons/" + evolution.variety.name} key={evolution.variety.id} className={'flex items-center evolution p-2 bg-black/[.4] border-2 border-transparent ' + (evolution.variety.id == pokemon.id ? 'border-white' : '')}>
																	<img src={!shiny ? evolution.variety.sprites.other.home.front_default : evolution.variety.sprites.other.home.front_shiny} alt={evolution.variety.name} className='w-[3em]' />
																</Link>
															))}
														</div>
													))}
												</div>
											) : ''}
									</div>
									
									{/* Pokemon Info */}

									<div className="pokemon-info grow overflow-auto flex flex-col gap-8 lg:col-span-2">
										<div>
											{/* Name and Number*/}
											<h3 className='uppercase font-bold text-6xl text-center hidden md:block'><span className="opacity-50">N°{pokemon.id}</span> {pokemon.name}</h3> 

											{/* Types */}
											<div className="types flex gap-4 text-2xl mt-4 justify-center items-center">
												{pokemon.types.map((item) => (
													<div className={"type uppercase rounded-sm px-2 font-bold " + item.type.name} key={item.type.name}>{item.type.name}</div>
												))}
											</div>
										</div>
										
										{/* Description */}
										<p className='text-xl'><strong className='text-xl'>Description:</strong> {pokemon_species.flavor_text_entries.filter((text) => text.language.name == "en")[0].flavor_text}</p>

										{/* Statistics */}
										<div className="flex flex-col gap-4">
											{/* <h4 className='uppercase font-bold text-4xl text-center'>STATISTICS</h4> */}
											<div className="stats grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
												{pokemon.stats.map((item) => (
													<div key={item.stat.name} className="stat text-xl">
														<strong className='capitalize'>{item.stat.name}: </strong><span>{item.base_stat}</span>
														<div className='bg-black/[.4] h-4'>
															<div style={{width: item.base_stat / 255 * 100 + "%"}} className={"h-full bg-linear-to-r " + (pokemon.types[0] ? `from-(--type-${pokemon.types[0].type.name})` : "") + " " + (pokemon.types[1] ? `to-(--type-${pokemon.types[1].type.name})` : pokemon.types[0] ? `to-(--type-${pokemon.types[0].type.name})` : "")}></div>
														</div>
													</div>
												))}
											</div>
										</div>
									</div>
								</div>

								{/* Moveset */}

								<h4 className='uppercase font-bold mb-8 text-4xl text-center mt-8'>MOVESET</h4>
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