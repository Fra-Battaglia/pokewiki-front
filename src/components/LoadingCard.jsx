import { useEffect, useState } from 'react'
import './styles/generals.scss'
import axios from 'axios'
import store from '../store'

function LoadingCard() {

	
	return (
		<>	
			<div className={"pokemon-card p-0.5 bg-(--type-normal)"}>
				<div className='w-1/1 flex flex-col bg-black/[.8] relative h-full'>

					{/* Pokemon sprite */}
						<div className='bg-black/[.4] border border-transparent m-5 max-h-full aspect-square animate-pulse'></div>
					
					{/* Pokemon Data */}
					<div className="pokemon-data h-full flex flex-col gap-4 py-4 items-center">	
						<div className='animate-pulse p-3 bg-black/[0.4]'></div>
						<div className='uppercase font-bold text-center text-3xl leading-none grow animate-pulse p-3 bg-black/[0.4] w-2/3'></div>
						<div className="types flex gap-4 justify-center">
							<div className={"type uppercase bg-black/[0.4] py-2 px-8 font-bold animate-pulse"}></div>
						</div>

						{/* <div className="flex gap-4 justify-center">
							<div className='animate-pulse p-2 bg-black/[0.4] w-2/3'></div>
							<div className='animate-pulse p-2 bg-black/[0.4] w-2/3'></div>
						</div> */}

						<button className="bg-black/[.4] px-4 py-3 w-1/2 self-center cursor-pointer animate-pulse"></button>
					</div>
				</div>
			</div>
			{
				/* <div className="mx-auto w-full max-w-sm rounded-mdxs p-4">
					<div className="flex animate-pulse space-x-4">
						<div className="size-10 rounded-full bg-gray-200"></div>
						<div className="flex-1 space-y-6 py-1">
						<div className="h-2 rounded bg-gray-200"></div>
						<div className="space-y-3">
							<div className="grid grid-cols-3 gap-4">
							<div className="col-span-2 h-2 rounded bg-gray-200"></div>
							<div className="col-span-1 h-2 rounded bg-gray-200"></div>
							</div>
							<div className="h-2 rounded bg-gray-200"></div>
						</div>
						</div>
					</div>
				</div> */
			}
		</>
	)
}

export default LoadingCard