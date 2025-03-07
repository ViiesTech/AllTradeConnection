import React, { ReactNode } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TouchableOpacity,
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
  searchIcon?: boolean;
  dropdownIcon?: boolean;
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
  searchIcon,
  dropdownIcon,
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
      <View>
      <Text style={{marginTop: responsiveHeight(1), color: colors.gray, textTransform: 'capitalize'}}>{name === 'fullname' ? 'Full Name' : name}</Text>
        <TextInput
          style={[styles.input, inputStyle,{height: inputHeight}]}
          placeholder={placeholder}
          placeholderTextColor={colors.black}
          value={field.value}
          multiline={multiline}
          textAlignVertical={textAlign}
          onChangeText={field.onChange(name)}
          secureTextEntry={secureTextEntry}
          onBlur={field.onBlur(name)}
          {...props}
          />
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
        {secureTextEntry && (
          <SVGXml
          icon={svgIcons.eye}
          width={15}
          style={styles.eyeIcon}
          // onPress={() => setIsSecure(!isSecure)}
          />
        )}
        {searchIcon && <SVGXml
          icon={svgIcons.searchingIcon}
          width={25}
          style={styles.eyeIcon}
          // onPress={() => setIsSecure(!isSecure)}
          />}
          {dropdownIcon && <SVGXml
          icon={svgIcons.dropdown}
          width={17}
          style={styles.eyeIcon}
          // onPress={() => setIsSecure(!isSecure)}
          />}
        </View>
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
  hideButton: boolean;
  childrenStyle: ViewStyle;
  tags?:any;
  hideTags?: boolean;
  searchIcon?:boolean;
  dropdownIcon?:boolean;
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
  hideButton,
  hideTags,
  searchIcon,
  dropdownIcon,
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
            <>
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
              searchIcon={searchIcon}
              dropdownIcon={dropdownIcon}
              />
          {!hideTags && <View style={field.tags ? {flexDirection: 'row', gap: 20, paddingBottom: responsiveHeight(3)} : {}}>
              {field.tags && field.tags?.map((item, ) => {
                return (
                  <View>
                    <View style={{flexDirection: 'row', justifyContent: 'center',alignItems: 'center', borderRadius: 10, backgroundColor: colors.primary}}>
                    <Text style={{color: colors.secondary, padding: 15, marginHorizontal: 10, fontSize: responsiveFontSize(2)}}>{item.title}</Text>
                    <TouchableOpacity style={{backgroundColor: colors.secondary, width: 30, height: 30, borderRadius: 100, marginRight: 10}}>
                    <SVGXml width={'30'} height={'30'} icon={svgIcons.add} />
                    </TouchableOpacity>
                    </View>
              </View>
            )
          })}
              </View>}
              </>
          ))}
          {children && <View style={childrenStyle}>{children}</View>}
          {!hideButton &&
          <Button  style={buttonStyle} buttonText={buttonText} onPress={handleSubmit} />
        }
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
    color: colors.black,
    paddingTop: -10,
    paddingLeft: -5,
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
