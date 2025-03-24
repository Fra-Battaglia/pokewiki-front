import { useEffect, useState } from 'react'
import './styles/generals.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRulerVertical, faWeightHanging } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function Card(props) {
	return (
		<>
			<div className={"pokemon-card p-0.5 bg-linear-to-r " + (props.types[0] ? `from-(--type-${props.types[0].type.name})` : "") + " " + (props.types[1] ? `to-(--type-${props.types[1].type.name})` : props.types[0] ? `to-(--type-${props.types[0].type.name})` : "")}>
				<div className='w-1/1 flex flex-col bg-black/[.8] relative h-full'>

					{/* Pokemon sprite */}
						<div className='hover:bg-black/[.4] border hover:border-white border-transparent m-5 max-h-full'>
							<Link to={"/pokemons/" + props.name}><img src={props.image} alt={props.name} className='p-5' /></Link>
						</div>
					
					{/* Pokemon Data */}
					<div className="pokemon-data h-full flex flex-col gap-4 py-4">	
						<h4>{props.id}</h4>
						<h1 className='uppercase font-bold text-center text-3xl leading-none grow'>{props.name}</h1>
						<div className="types flex gap-4 justify-center">
							{props.types.map((item) => (
								<div className={"type uppercase rounded-sm px-2 font-bold " + item.type.name} key={item.type.name}>{item.type.name}</div>
							))}
						</div>
						<div className="flex gap-4 justify-center">
							<div>
								<div><FontAwesomeIcon icon={faRulerVertical} /> {props.height}</div>
								<div>Height</div>
							</div>

							<div>
								<div><FontAwesomeIcon icon={faWeightHanging} /> {props.weight}</div>
								<div>Weight</div>
							</div>
						</div>
						<Link to={"/pokemons/" + props.name}><button className="border border-white bg-black/[.4] px-4 py-1 self-center cursor-pointer">See more</button></Link>
					</div>
				</div>
			</div>
		</>
	)
}

export default Card