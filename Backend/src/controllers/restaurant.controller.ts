import { Request, Response } from "express";
import axios from "axios";
import InfoSearch from "../models/infoSearch.model";
import mongoose from "mongoose";

export const getRestaurant = async (req: Request, res: Response) => {
  const { city } = req.query; // Obtener `city` desde los parámetros de consulta

  if (!city) {
    return res.status(400).json({
      error: "Debe proporcionar una ciudad o coordenadas (lat y lon).",
    });
  }

  try {
    let location;

    if (city) {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${city}&format=json&limit=1&countrycodes=CO`
      );
      if (response.data.length === 0) {
        return res
          .status(404)
          .json({ error: "No se encontraron resultados para esa ciudad." });
      }
      location = response.data[0];
      const { lat, lon } = location;

      // Obtener los restaurantes cercanos
      const viewbox = `${parseFloat(lon) - 0.05},${parseFloat(lat) + 0.05},${parseFloat(lon)+0.05},${parseFloat(lat)-0.05}`;
      const restaurantsUrl = `https://nominatim.openstreetmap.org/search?q=restaurant&format=json&limit=10&viewbox=${viewbox}&bounded=1`;
      const restaurantsResponse = await axios.get(restaurantsUrl);

      const restaurants = restaurantsResponse.data.map((restaurant: any) => ({
        id: restaurant.place_id,
        name: restaurant.display_name,
      }));

      res.json({ city, restaurants });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error al obtener los datos." });
  }
};
// export const getRestaurant = async (req: Request, res: Response) => {
//   const { city } = req.body;

//   if (!city) {
//     return res.status(400).json({
//       error: "Debe proporcionar una ciudad o coordenadas (lat y lon).",
//     });
//   }

//   try {
//     let location;

//     if (city) {
//       const response = await axios.get(
//         `https://nominatim.openstreetmap.org/search?q=${city}&format=json&limit=1&countrycodes=CO`
//       );
//       if (response.data.length === 0) {
//         return res
//           .status(404)
//           .json({ error: "No se encontraron resultados para esa ciudad." });
//       }
//       location = response.data[0];
//       const { lat, lon } = location;

//       // Obtener los restaurantes cercanos
//       const viewbox = `${parseFloat(lon) - 0.05},${parseFloat(lat) + 0.05},${parseFloat(lon)+0.05 },${parseFloat(lat)-0.05}`;
//       const restaurantsUrl = `https://nominatim.openstreetmap.org/search?q=restaurant&format=json&limit=10&viewbox=${viewbox}&bounded=1`;
//       const restaurantsResponse = await axios.get(restaurantsUrl);

//       const restaurants = restaurantsResponse.data.map((restaurant: any) => ({
//         id: restaurant.place_id,
//         name: restaurant.display_name,
//       }));

//       res.json({ city, restaurants });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Ocurrió un error al obtener los datos." });
//   }
// };

export const saveSearchRestaurant = async (req: Request, res: Response) => {
  const userValue = (req as Request & { user: any }).user;
  const { city } = req.body;
  try {
    const newSearch = new InfoSearch({
      location: city,
      user: userValue.id,
    });
    const searchSaved = await newSearch.save();

    res.json({
      id: searchSaved._id,
      location: searchSaved.location,
      createdAt: searchSaved.createdAt,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error });
    } else {
      console.error("Unexpected error:", error); // Handle non-Error types
    }
  }
};
export const showHistorical = async (req: Request, res: Response) => {
  const userReq = (req as Request & { user: any }).user;
  const userId = userReq.id;
  try {
    const historicalFound = await InfoSearch.find({
      user: new mongoose.Types.ObjectId(userId),
    });
    if (!historicalFound)
      return res
        .status(400)
        .json({ message: "User has not found historical search" });

    res.json(historicalFound);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error });
    }
  }
};
