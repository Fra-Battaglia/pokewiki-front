import { useEffect, useState } from 'react'
import './styles/generals.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import store from '../store';

function Move(props) {

	const [move, set_move] = useState(null);

	// console.log(props.url);
	
	function get_move() {
		axios.get(props.url).then((response) => {
			set_move(response.data)
		})
	}

	useEffect(() => {get_move();}, [])

	return (
		<>
			<div className="w-full p-4 bg-black/[.4] border">
				<div className='font-bold'>{props?.name}</div>
				<p>{move?.effect_entries[0]?.short_effect}</p>
				<div className={'type inline-block rounded px-4 font-bold ' + (move?.type ? `${move?.type?.name}` : "")}>{move?.type?.name}</div>
			</div>
		</>
	)
}

export default Move