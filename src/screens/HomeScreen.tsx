import React, {useContext} from 'react';
import {ActivityIndicator, Dimensions, View, ScrollView} from 'react-native';
import {useMovies} from '../hooks/useMovies';
import {MoviePoster} from '../components/MoviePoster';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import {HorizontalSlider} from '../components/HorizontalSlider';
import {GradientBackground} from '../components/GradientBackground';
import ImageColors from 'react-native-image-colors';
import {getImageColors} from '../hekpers/getColor';
import {GradientContext} from '../context/GradientContext';
import {useEffect} from 'react';

//para sacar las dimensiones de ancho de pantalla por defecto, importamos Dimensions desde React
const windowWidth = Dimensions.get('window').width;

export const HomeScreen = () => {
  //traemos los resultados de useMovies
  const {nowPlaying, isLoading, popular, upComing, topRated} = useMovies(); //se activa el hook de useMovies.tsx, que coge las peliculas que vienen de movieinterfaces

  //estilo de area importado de libreria de react safe area context. Cogemos el margen top por defecto
  const {top} = useSafeAreaInsets();

  //llamamos al context de gradiente
  const {setMainColors} = useContext(GradientContext);

  //ImageColors se coge la la librería ImageColors que hay que instalar
  const getPosterColors = async (index: number) => {
    const movie = nowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;


    const [primary = 'green', secondary = 'orange'] = await getImageColors(uri);
    setMainColors({primary, secondary});
  };

  //useEffect (se activa constantemente) )para capturar los colores, cuando las peliculas de now playing cambien
  useEffect(() => {
    if (nowPlaying.length > 0) {
      getPosterColors(0);
    }
  }, [nowPlaying]);

  if (isLoading) {
    //indicador de cargando, se para cuando se carga y su valor pasa a false...
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator color="red" size={100}></ActivityIndicator>
      </View>
    );
  }
  return (
    <GradientBackground>
      <ScrollView>
        <View style={{marginTop: top + 20}}>
          {/* <MoviePoster movie={peliculasEnCine[0]} /> */}
          {/* //carousel Pricipal head */}
          <View style={{height: 440}}>
            <Carousel
              data={nowPlaying}
              renderItem={({item}: any) => <MoviePoster movie={item} />}
              sliderWidth={windowWidth}
              itemWidth={300}
              inactiveSlideOpacity={0.9}
              onSnapToItem={index => getPosterColors(index)}
            />
          </View>
          {/* //carousel peliculas populares */}
          <HorizontalSlider title="En cines" movies={nowPlaying} />
          <HorizontalSlider title="Populares" movies={popular} />
          <HorizontalSlider title="Top" movies={topRated} />
          <HorizontalSlider title="Próximamente" movies={upComing} />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};
