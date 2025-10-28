import React, { useState } from 'react'

function Rastreo() {
  const [guia, setGuia] = useState('')

  const handleBuscar = () => {
    if (!guia) alert('Por favor ingresa un número de guía')
    else alert(`Buscando paquete con guía: ${guia}`)
  }

  return (
    <div>
      <h1 className="text-5xl font-bold mb-6">Rastreo de Paquetes</h1>
      <p className="text-xl mb-4">Rastrea tu paquete</p>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Número de guía"
          className="px-3 py-2 text-black rounded"
          value={guia}
          onChange={(e) => setGuia(e.target.value)}
        />
        <button
          onClick={handleBuscar}
          className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600"
        >
          Buscar
        </button>
      </div>
    </div>
  )
}

export default Rastreo
