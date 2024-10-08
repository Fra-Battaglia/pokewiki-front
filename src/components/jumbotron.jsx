import { useEffect, useState } from 'react'
import './styles/generals.scss'
import './styles/jumbotron.scss'
import axios from 'axios'
import store from '../store'
import Header from './header'

function Jumbotron(props) {

	return (
		<>
			<section className="jumbotron h-screen bg-fixed">
				<Header />
				<div className="container my-0 mx-auto h-full">
					<div className="h-full flex items-center">
						<h1 className='text-4xl font-black'>Pokemon Sinnoh Region</h1>
					</div>
				</div>
			</section>
		</>
	)
}

export default Jumbotron