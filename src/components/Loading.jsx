import { useEffect, useState } from 'react'
import './styles/generals.scss'
import axios from 'axios'
import store from '../store'

function Loading() {

	return (
		<>
			<div className='text-center h-screen flex justify-center items-center'><p className='text-2xl'>Loading...</p></div>
		</>
	)
}

export default Loading