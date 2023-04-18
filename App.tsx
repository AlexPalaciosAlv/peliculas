import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import React from 'react';
import {Navigation} from './src/navigation/navigation';
import {FadeScreen} from './src/screens/FadeScreen';
import {GradientProvider} from './src/context/GradientContext';

//en appstate metemos todo el context. Todos los hijos de GradientProvider van a ser los hijos de AppState (es decir, los elementos de Navigation)
const AppState = ({children}: any) => {
  return (<GradientProvider>{children}</GradientProvider>)
};

export const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigation />
      </AppState>

      {/* <FadeScreen /> */}
    </NavigationContainer>
  );
};
