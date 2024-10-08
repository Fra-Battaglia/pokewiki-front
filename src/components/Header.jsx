import { useEffect, useState } from 'react'
import './styles/generals.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRulerVertical, faWeightHanging } from '@fortawesome/free-solid-svg-icons'

function Header(props) {
	return (
		<>
			<header>
				<div className="container flex justify-between items-center mx-auto my-0">
					<img src="src/assets/img/pokeball.svg" alt="Logo" className='w-16' />
					<nav>
						<ul className='flex gap-4'>
							<li>About us</li>
							<li>Regions</li>
							<li>Contacts</li>
						</ul>
					</nav>
				</div>
			</header>
			
		</>
	)
}

export default Header