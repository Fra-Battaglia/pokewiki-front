import { useEffect, useState } from 'react'
import './styles/generals.scss'
import './styles/jumbotron.scss'
import axios from 'axios'
import store from '../store'
import Header from './header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function Jumbotron(props) {

	return (
		<>
			<section className="jumbotron h-screen bg-fixed bg-center">
				<Header />
				<div className="container my-0 mx-auto h-full">
					<div className="h-full flex flex-col justify-center items-center">
						<h1 className='text-8xl font-black mb-4'>Pokemon WIKI</h1>
						<Link to={"/generations"}><button className='text-4xl font-black border-2 bg-black/[.8] p-2'>Start Here <FontAwesomeIcon icon={faArrowRight} /></button></Link>
					</div>
				</div>
			</section>
		</>
	)
}

export default Jumbotron