import React, { createContext, useContext, useState, ReactNode } from "react";
import { getRestaurantsRequest, saveRestaurantsRequest, showHistoricalRequest } from '../api/restaurant';
import { useAuth } from './AuthContex';

interface IRestaurant {
  city: string;
  id?: string; // Puede ser opcional dependiendo de cómo manejas la creación de restaurantes
  // Define aquí otras propiedades de un restaurante
}

interface RestaurantContextType {
  restaurant: IRestaurant[];
  setRestaurant: React.Dispatch<React.SetStateAction<IRestaurant[]>>;
  createRestaurant: (restaurant: IRestaurant) => Promise<void>;
  saveRestaurant: (restaurant: IRestaurant) => Promise<void>;
  showHistorical: () => Promise<any[]>; // Definir el tipo de retorno como Promise<any[]>
}

const initialContext: RestaurantContextType = {
  restaurant: [],
  setRestaurant: () => {},
  createRestaurant: async () => {},
  saveRestaurant: async () => {},
  showHistorical: async () => [], // Inicializar correctamente el retorno vacío
};

const RestaurantContext = createContext<RestaurantContextType>(initialContext);

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error("useRestaurant must be used within a Provider");
  }
  return context;
};

interface RestaurantProviderProps {
  children: ReactNode;
}

export function RestaurantProvider({ children }: RestaurantProviderProps) {
  const [restaurant, setRestaurant] = useState<IRestaurant[]>([]);
  const { user } = useAuth();

  const createRestaurant = async (newRestaurant: IRestaurant) => {
    try {
      const res = await getRestaurantsRequest(newRestaurant.city);
      setRestaurant(res.data); // Asumiendo que res.data contiene la lista de restaurantes
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  const saveRestaurant = async (newRestaurant: IRestaurant) => {
    newRestaurant.id = user?.id; // Asigna el id del usuario al restaurante si está disponible
    try {
      const res = await saveRestaurantsRequest(newRestaurant);
      setRestaurant(res.data); // Asumiendo que res.data contiene la lista de restaurantes
    } catch (error) {
      console.error("Error saving restaurant:", error);
    }
  };

  const showHistorical = async () => {
    try {
      const res = await showHistoricalRequest(); // Asegúrate de que esta función esté implementada correctamente
      return res.data as any[]; // Devuelve los datos históricos obtenidos, ajustado según la estructura real de tu API
    } catch (error) {
      console.error("Error fetching historical data:", error);
      throw error; // Lanza el error para manejarlo en el componente
    }
  };

  return (
    <RestaurantContext.Provider value={{ restaurant, setRestaurant, createRestaurant, saveRestaurant, showHistorical }}>
      {children}
    </RestaurantContext.Provider>
  );
}
