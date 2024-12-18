import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Jumbotron from './components/Jumbotron.jsx'
import { useParams } from 'react-router-dom'

function App() {
	return (
		<>
			<Jumbotron />
			<main className='py-8 text-center'>
				<h1 className="text-4xl font-bold">POKÉWIKI</h1>
				
			</main>
			<footer></footer>
		</>
	)
}

export default App
