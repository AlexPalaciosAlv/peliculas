import React, {useEffect, useState} from 'react';
import movieDB from '../api/moviedb';
import {MoviesResponse, Movie} from '../interfaces/movieInterfaces';

interface MoviesState {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upComing: Movie[];
}

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true); //para el indicador de cargando
  const [moviesState, setMoviesState] = useState<MoviesState>({
    nowPlaying: [],
    popular: [],
    topRated: [],
    upComing: [],
  }); //es tipo movie por la interfaz de movieinterfaces.tsx

  const [peliculasComing, setPeliculasComing] = useState<Movie[]>([]); //es tipo movie por la interfaz de movieinterfaces.tsx

  const getMovies = async () => {
    const nowPlayingPromise = movieDB.get<MoviesResponse>('/now_playing');
    const popularPromise = movieDB.get<MoviesResponse>('/popular');
    const topRatedPromise = movieDB.get<MoviesResponse>('/top_rated');
    const upcomingPromise = movieDB.get<MoviesResponse>('/upcoming');

    const response = await Promise.all([
      nowPlayingPromise,
      popularPromise,
      topRatedPromise,
      upcomingPromise,
    ]);

    setMoviesState({
      nowPlaying: response[0].data.results,
      popular: response[1].data.results,
      topRated: response[2].data.results,
      upComing: response[3].data.results,
    });

    setIsLoading(false);
  };

  //con useEffect activamos este efecto al arrancar la app
  useEffect(() => {
    //now playing
    getMovies();
  }, []);

  //pasamos los resultados para que vayan a HomeScreen, moviesState es el resultado final tras pasar por setMobviesState
  return {
    ...moviesState,
    isLoading,
  };
};
