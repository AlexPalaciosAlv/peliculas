import {useEffect, useState} from 'react';
import movieDB from '../api/moviedb';
import {MovieFull} from '../interfaces/movieInterfaces';
import {CreditsResponse, Cast} from '../interfaces/creditsInterfaces';

interface MovieDetails {
  cast: Cast[];
  isLoading: boolean;
  movieFull?: MovieFull; //moviefull es la interfaz hecha con datos del json de postman
}
export const useMovieDetails = (movieId: number) => {
  const [state, setState] = useState<MovieDetails>({
    isLoading:true,
    movieFull:undefined,
    cast:[]
  });

  //MovieFull viene de interfaces, son los datos copiados de postman. movieDB viene de API (es la llamada general)
  //se hace mediante promesas
  //esta funcion se usa en detailscreen.tsx
  const getMovieDetauils = async () => {
    const movieDetailsPromise = await movieDB.get<MovieFull>(`/${movieId}`);
    const castPromise = await movieDB.get<CreditsResponse>(
      `/${movieId}/credits`,
    );

    //desestructuramos las promsesas y instanciamos en el arreglo los resultados de cada promesa
    const [movieDetailsResponse, castPromiseResponse] = await Promise.all([
      movieDetailsPromise,
      castPromise,
    ]);

    setState({
      isLoading: false,
      movieFull: movieDetailsResponse.data,
      cast: castPromiseResponse.data.cast,
    });
  };

  //useEffect para activar esta función con este hook cuandio sea llamado
  useEffect(() => {
    getMovieDetauils();
  }, []);

  //desestructuramos el state y asi tenemos isloading, moviefull y cast de una vez
  return {...state};
};
