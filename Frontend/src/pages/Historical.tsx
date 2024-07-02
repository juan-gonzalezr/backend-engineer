import React, { useState, useEffect } from 'react';
import { useRestaurant } from '../context/RestaurantContext';

const Historical = () => {
  const { showHistorical } = useRestaurant();
  const [historicalData, setHistoricalData] = useState<any[]>([]); // Asegúrate de inicializar con any[]

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const data = await showHistorical(); // Llama a la función showHistorical del contexto
        
        setHistoricalData(data); // Actualiza el estado con los datos obtenidos
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };

    fetchHistoricalData();
  }, [showHistorical]); // Asegúrate de incluir showHistorical como dependencia para useEffect

  return (
    <div>
      <h2>Historial de Consultas</h2>
      <ul>
        {historicalData.map((item, index) => (
          <li key={index}>
            <p>Ciudad: {item.location}</p>
            <p>Fecha de consulta: {new Date(item.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default Historical;
