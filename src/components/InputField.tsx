import React, { ReactNode } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { Formik, useField } from 'formik';
import Button from './Button';
import { colors } from '../assets/colors';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils';
import SVGXml from './SVGXml';
import svgIcons from '../assets/icons';

interface InputFieldProps extends TextInputProps {
  name: string;
  placeholder?: string;
  icon: string;
  inputStyle?: object;
  secureTextEntry?: boolean;
  iconWidth?: number | string;
  textAlign: string;
  line: boolean;
  inputHeight: number;
  inputContainer: ViewStyle;
  multiline: boolean;
}

const InputField = ({
  inputStyle,
  name,
  placeholder,
  icon,
  iconWidth,
  textAlign,
  line,
  inputHeight,
  multiline,
  inputContainer,
  secureTextEntry = false,
  ...props
}: InputFieldProps) => {
  const [field, meta] = useField(name);
  const hasError = meta.touched && meta.error;


  return (
    <View style={[styles.inputContainerWrapper,inputContainer]}>
      <View style={[styles.inputContainer, hasError && styles.errorInput]}>
        <SVGXml icon={icon} width={iconWidth || 20} />
        {!line &&
        <View style={styles.verticalLine} />
      }
        <TextInput
          style={[styles.input, inputStyle,{height: inputHeight}]}
          placeholder={placeholder}
          placeholderTextColor={colors.dark_purple}
          value={field.value}
          multiline={multiline}
          textAlignVertical={textAlign}
          onChangeText={field.onChange(name)}
          secureTextEntry={secureTextEntry}
          onBlur={field.onBlur(name)}
          {...props}
        />
        {secureTextEntry && (
          <SVGXml
            icon={svgIcons.eye}
            width={15}
            style={styles.eyeIcon}
            // onPress={() => setIsSecure(!isSecure)}
          />
        )}
      </View>
      {hasError && <Text style={styles.errorText}>{meta.error}</Text>}
    </View>
  );
};

interface CustomInputFormProps {
  initialValues: { [key: string]: any };
  validationSchema: any;
  inputContainerStyle?: ViewStyle;
  onSubmit: (values: any) => void;
  fields: {
    name: string;
    placeholder?: string;
    icon: string;
    secureTextEntry?: boolean;
    keyboardType?: string;
  }[];
  buttonText: string;
  inputStyle?: object;
  buttonStyle: ViewStyle;
  children?: ReactNode;
  inputContainer: ViewStyle;
  childrenStyle: ViewStyle;
}

const CustomInputForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  fields,
  buttonText,
  inputStyle,
  children,
  buttonStyle,
  inputContainerStyle,
  childrenStyle,
  inputContainer,
}: CustomInputFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <View style={[styles.form, inputContainerStyle]}>
          {fields.map((field,i) => (
            <InputField
              key={field.name}
              name={field.name}
              // inputFieldStyle={{marginBottom: i == 1 ? responsiveHeight(2) : null}}
              placeholder={field.placeholder}
              icon={field.icon}
              inputStyle={inputStyle}
              secureTextEntry={field.secureTextEntry}
              keyboardType={field.keyboardType}
              line={field.line}
              inputContainer={inputContainer}
              multiline={field.multiline}
              inputHeight={field.height}
              textAlign={field.textAlign}
              autoCapitalize="none"
            />
          ))}
          {children && <View style={childrenStyle}>{children}</View>}
          <Button  style={buttonStyle} buttonText={buttonText} onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

export default CustomInputForm;

const styles = StyleSheet.create({
  form: {
    padding: responsiveHeight(1),
    alignItems: 'center',
  },
  inputContainerWrapper: {
    marginBottom: responsiveHeight(3.5),
    width: responsiveWidth(80),
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 0.1,
    borderRadius: 10,
    paddingHorizontal: responsiveHeight(2),
    backgroundColor: colors.secondary,
    borderColor: colors.black,
    alignItems: 'center',
    gap: 10,
  },
  input: {
    flex: 1,
    borderRadius: 8,
    padding: responsiveHeight(2),
    fontSize: responsiveFontSize(2),
    color: colors.dark_purple,
  },
  errorInput: {
    borderColor: colors.red,
    borderWidth: 1,
  },
  errorText: {
    color: colors.red,
    fontSize: responsiveFontSize(1.6),
    marginTop: responsiveHeight(0.5),
    textAlign: 'left',
  },
  verticalLine: {
    height: responsiveHeight(2.5),
    width: responsiveWidth(0.3),
    backgroundColor: colors.dark_purple,
  },
  eyeIcon: {
    marginLeft: 8,
  },
});
