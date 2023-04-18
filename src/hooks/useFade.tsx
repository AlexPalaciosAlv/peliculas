import React, {useRef} from 'react';
import {Animated} from 'react-native';

export const useFade = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  //la funcion callback de actibva tras el fade in, si y solo si existe, es lo que hara el cambio de color progresivo
  const fadeIn = (callback?: Function) => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => (callback ? callback() : null));
  };

  const fadeOut = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return {fadeIn, fadeOut, opacity};
};
