import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {
  CodeField,
  useBlurOnFulfill,
} from 'react-native-confirmation-code-field';
import {colors} from '../assets/colors';
import {responsiveHeight, responsiveWidth} from '../utils';

interface inputProps {
  value: string;
  setValue: () => void;
}

const CodeInput = ({value, setValue}: inputProps) => {
  const ref = useBlurOnFulfill({value, cellCount: 4});

  return (
    <CodeField
      ref={ref}
      // {...otherProps}
      caretHidden={false}
      value={value}
      onChangeText={setValue}
      cellCount={6}
      rootStyle={styles.root}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      clearTextOnFocus
      renderCell={({index, symbol, isFocused}) => (
        <Text
          key={index}
          style={[styles.cell, isFocused && styles.focusCell]}
          // onLayout={getCellOnLayoutHandler(index)}
        >
          {isFocused || !symbol ? symbol : '*'}
        </Text>
      )}
    />
  );
};

export default CodeInput;

const styles = StyleSheet.create({
  cell: {
    width: responsiveHeight(6.5),
    height: responsiveHeight(6.5),
    textAlign: 'center',
    padding: responsiveHeight(0.5),
    fontSize: responsiveHeight(4),
    borderRadius: responsiveHeight(1),
    color: colors.dark_purple,
  },
  focusCell: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  root: {
    marginVertical: responsiveHeight(3),
    alignSelf: 'center',
    width: responsiveWidth(90),
  },
});
