import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PokemonDetail from './components/PokemonDetail.jsx'
import Generation from './components/Generation.jsx'
import Generations from './components/Generations.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/generations/",
    element: <Generations />
  },
  {
    path: "/generations/:generationID",
    element: <Generation />
  },
  {
    path: "/pokemons/:pokemonID",
    element: <PokemonDetail />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
