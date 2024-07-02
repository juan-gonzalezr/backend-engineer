import { useForm, SubmitHandler } from 'react-hook-form';
import { useRestaurant } from '../context/RestaurantContext';

interface IRestaurant {
  city: string;
  id: string;
  // Define aquí otras propiedades de un restaurante
}

const Restaurants = () => {
  const { register, handleSubmit } = useForm<IRestaurant>(); // Define el tipo de los datos del formulario
  const { restaurant, createRestaurant ,saveRestaurant} = useRestaurant();
  console.log(restaurant);

  const onSubmit: SubmitHandler<IRestaurant> = (data) => {
    createRestaurant(data); // Los datos ya tienen el tipo correcto
    saveRestaurant(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register('city')} />
        <button>Buscar</button>
      </form>
    </div>
  );
};

export default Restaurants;
