import React, {useEffect, useState} from 'react';
import Routes from './routes';
import Container from './components/Container';
import {Image, StyleSheet, View} from 'react-native';
import {images} from './assets/images';
import {responsiveHeight, responsiveWidth} from './utils';

interface loadingType {
  loading: boolean;
}

const App = () => {
  const [loading, setLoading] = useState<loadingType>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, [loading]);

  if (loading) {
    return (
      <Container>
        <Image style={styles.imageStyle} source={images.splash_background} />
        <View style={styles.logoWrapper}>
          <Image source={images.logo} style={styles.logoStyle} />
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Image style={styles.endImage} source={images.splash_background2} />
        </View>
      </Container>
    );
  }
  return <Routes />;
};

export default App;

const styles = StyleSheet.create({
  imageStyle: {
    height: responsiveHeight(27),
    width: responsiveWidth(100),
  },
  logoWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoStyle: {
    height: responsiveHeight(25),
    width: responsiveWidth(62),
  },
  endImage: {
    height: responsiveHeight(31),
    width: responsiveWidth(100),
  },
});
