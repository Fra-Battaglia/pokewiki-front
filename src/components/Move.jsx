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
			<div className="w-full p-4 bg-black/[.4] flex flex-col items-start">
				<div className='flex items-center gap-2 mb-4'>
					<div className='font-bold text-2xl capitalize'>{props?.name}</div>
					<div className={'type inline-block rounded-sm uppercase px-2 font-bold ' + (move?.type ? `${move?.type?.name}` : "")}>{move?.type?.name}</div>
				</div>
				<p className='grow'>{move?.effect_entries[0]?.short_effect}</p>
			</div>
		</>
	)
}

export default Move