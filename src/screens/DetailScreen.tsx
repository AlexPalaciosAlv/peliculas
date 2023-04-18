import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Movie, MovieFull} from '../interfaces/movieInterfaces';
import {RootStackParams} from '../navigation/navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {useEffect} from 'react';
import {useMovieDetails} from '../hooks/useMovieDetails';
import {MovieDetails} from '../components/MovieDetails';

//dimensions coge ka dimension de window o screen
const altura = Dimensions.get('screen').height;

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> {}

export const DetailScreen = ({route, navigation}: Props) => {
  const movie = route.params;
  //poster peliculas
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  //detalles de peliculas, desestructuramos cada parametro
  //funcion que llama detalles de peliculas, es un hook
  const {isLoading, cast, movieFull} = useMovieDetails(movie.id);

  console.log(movie.original_title);

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <View style={styles.imageBorder}>
          <Image source={{uri}} style={styles.posterImage} />
        </View>
      </View>
      <View style={styles.marginContainer}>
        <Text style={styles.subTitle}>{movie.original_title}</Text>

        <Text style={styles.title}>{movie.title}</Text>
      </View>
      {/* indicador de cargando (se usa con loading true) */}
      {isLoading ? (
        <ActivityIndicator size={40} color="green" />
      ) : (
        <MovieDetails movieFull={movieFull!} cast={cast!} />
      )}

      {/* boton para cerrar */}
      <View style={styles.backBottom}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Icon color="white" name="arrow-back-outline" size={100} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  posterImage: {
    flex: 1,
  },

  imageContainer: {
    //overflow: 'hidden',
    width: '100%',
    height: altura * 0.7,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 10,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  imageBorder: {
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 18,
  },
  backBottom: {
    position: 'absolute',
    zIndex: 999,
    elevation: 9,
    top: 30,
    left: 20,
  },
});
