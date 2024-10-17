import { useEffect, useState } from 'react'
import './styles/generals.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRulerVertical, faWeightHanging } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function Card(props) {
	return (
		<>
			<div className={"pokemon-card p-0.5 bg-gradient-to-r " + (props.types[0] ? `from-[--type-${props.types[0].type.name}]` : "") + " " + (props.types[1] ? `to-[--type-${props.types[1].type.name}]` : props.types[0] ? `to-[--type-${props.types[0].type.name}]` : "")}>
				<div className='w-1/1 flex aspect-square flex-col bg-black/[.8] relative'>
					{/* <div className="card-heder flex justify-between">
						<h1 className='uppercase font-bold'>N° {props.id}</h1>
					</div> */}
					<img src={props.image} alt={props.name} className='w-full h-full max-h-full p-10' />
					<div className="pokemon-data flex flex-col gap-4 py-4">	
						<h1 className='uppercase font-bold text-center text-3xl leading-none'>{props.name}</h1>
						<div className="types flex gap-4 justify-center">
							{props.types.map((item) => (
								<div className={"type uppercase rounded py-0.5 px-4 font-bold " + item.type.name} key={item.type.name}>{item.type.name}</div>
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
						<Link to={"/" + props.name}><button className="border border-white bg-black/[.4] px-4 py-1 self-center">See more</button></Link>
					</div>
				</div>
			</div>
		</>
	)
}

export default Card