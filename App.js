import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const App = () => {
  //linhas 8 e 9 alternam valor do toggle através do userState

  const [toggle, setToggle] = useState(false);
  const handleChangeToggle = () => setToggle(oldtoggle => !oldtoggle);

  useEffect(() => {
    //Liga flash do celular
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    //Ao chacoalhar o celular, muda o toogle
    const subscription = RNShake.addListener(() => {
      setToggle(oldtoggle => !oldtoggle);
    });
    //Essa função será chamada quando esse componente for desmontado
    return () => subscription.remove();
  }, []);

  return (
    <View style={toggle ? style.containerLight : style.containerDark}>
      <TouchableOpacity
        //aqui é chamada a função que troca o valor do toogle
        onPress={handleChangeToggle}>
        <Image
          style={toggle ? style.lightingOn : style.lightingOff}
          source={
            toggle
              ? require('./assets/icons/eco-light.png')
              : require('./assets/icons/eco-light-off.png')
          }
        />
        <Image
          style={style.dioLogo}
          source={
            toggle
              ? require('./assets/icons/logo-dio.png')
              : require('./assets/icons/logo-dio-white.png')
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  containerDark: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },
  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 200,
    height: 200,
  },
});
