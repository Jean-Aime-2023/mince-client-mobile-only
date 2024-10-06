import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const NextButton = ({
  scrollTo,
}: {
  scrollTo: () => void;
  percentage: number;
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={scrollTo} style={styles.button}>
        <Svg
          width="25"
          height="25"
          viewBox="0 0 31 25"
          fill="none"
        >
          <Path
            d="M17.6092 24.4848C17.5497 24.4254 17.5024 24.3547 17.4702 24.2769C17.4379 24.1992 17.4213 24.1158 17.4213 24.0316C17.4213 23.9474 17.4379 23.8641 17.4702 23.7863C17.5024 23.7085 17.5497 23.6379 17.6092 23.5784L28.0466 13.141H1.40621C1.23631 13.141 1.07336 13.0735 0.953222 12.9533C0.833082 12.8332 0.765589 12.6703 0.765589 12.5004C0.765589 12.3305 0.833082 12.1675 0.953222 12.0474C1.07336 11.9272 1.23631 11.8597 1.40621 11.8597H28.0466L17.6092 1.42235C17.5497 1.36283 17.5025 1.29217 17.4703 1.2144C17.4381 1.13663 17.4215 1.05328 17.4215 0.969106C17.4215 0.884931 17.4381 0.801581 17.4703 0.723813C17.5025 0.646046 17.5497 0.575384 17.6092 0.515864C17.6688 0.456343 17.7394 0.409129 17.8172 0.376916C17.8949 0.344704 17.9783 0.328125 18.0625 0.328125C18.1467 0.328125 18.23 0.344704 18.3078 0.376916C18.3855 0.409129 18.4562 0.456343 18.5157 0.515864L30.047 12.0471C30.1065 12.1066 30.1538 12.1773 30.186 12.255C30.2183 12.3328 30.2349 12.4162 30.2349 12.5004C30.2349 12.5845 30.2183 12.6679 30.186 12.7457C30.1538 12.8235 30.1065 12.8941 30.047 12.9536L18.5157 24.4848C18.4562 24.5444 18.3856 24.5917 18.3078 24.6239C18.23 24.6561 18.1467 24.6727 18.0625 24.6727C17.9783 24.6727 17.8949 24.6561 17.8172 24.6239C17.7394 24.5917 17.6687 24.5444 17.6092 24.4848Z"
            fill="#232262"
          />
        </Svg>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 80,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default NextButton;
