import { useEffect, useState } from 'react'
import './styles/generals.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRulerVertical, faWeightHanging } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function Header(props) {
	return (
		<>
			<header>
				<div className="container flex justify-between items-center mx-auto py-4">
					<Link to={"/"}>
						<div className='flex gap-4 font-bold text-3xl items-center'>
							<img src="/src/assets/img/pokeball.svg" alt="Logo" className='h-[1.5em]' /><h1>POKÉWIKI</h1>
						</div>
					</Link>
					
					<nav>
						<ul className='flex gap-4'>
							<li>About us</li>
							<li><Link to={"/generations/"}>Regions</Link></li>
							<li>Contacts</li>
						</ul>
					</nav>
				</div>
			</header>
			
		</>
	)
}

export default Header