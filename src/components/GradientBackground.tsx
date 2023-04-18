import React, {useContext} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {GradientContext} from '../context/GradientContext';
import {useEffect} from 'react';
import {useFade} from '../hooks/useFade';
interface Props {
  children: JSX.Element | JSX.Element[];
}

//componente que englobará a HomeScreen, de cara al gradiente del fondo
//función muy parecida al CONTEXT
//los children es todo el codigo que englobará GradientBackground, en este caso HomeScreen
export const GradientBackground = ({children}: Props) => {
  //lineargradient forma pate del paquete npm de linear gradient

  //al ser GrtadientBackgorund hijo del contexto APPSTATE(en App.tsx), podemos llamar a las propiedades del Contexto GradientContext directamente
  //se usara prevColors de cara a que haya fadein/out de un color a otro cuando pasen las imagenes, luegi colors para el cartel actual
  //se usa Animated para el segundo color(el que hace refecrencia al actual del poster)
  const {colors, prevColors, setPrevMainColors} = useContext(GradientContext);

  //desestructuro useFADE
  const {fadeIn, opacity, fadeOut} = useFade();

  //uso un useeffect que se active cuando cambie los colores anteriores a los nuevos colores con un fadeIn y luego un fade out
  //ambos colores estan, pero uno esta con opacidad y el otro no, cuando se activa la opacidad del nuevo, se sobrepone el colos al antiguo
  useEffect(() => {
    fadeIn(() => {
      setPrevMainColors(colors);
    });
    fadeOut();
  }, [colors]);

  //se ven ambos colores a la vez, el previo y acual, pero uno tiene opacidad 0 y otro de 1, la transicion con los fades juega con eso
  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={[prevColors.primary, prevColors.secondary, 'white']}
        style={{...StyleSheet.absoluteFillObject}}
        start={{x: 0.1, y: 0.1}}
        end={{x: 0.5, y: 0.5}}
      />

      <Animated.View style={{...StyleSheet.absoluteFillObject, opacity}}>
        <LinearGradient
          colors={[colors.primary, colors.secondary, 'white']}
          style={{...StyleSheet.absoluteFillObject}}
          start={{x: 0.1, y: 0.1}}
          end={{x: 0.5, y: 0.5}}
        />
      </Animated.View>
      {children}
    </View>
  );
};
