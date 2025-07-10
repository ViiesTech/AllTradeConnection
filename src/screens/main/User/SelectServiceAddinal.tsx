import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import * as Yup from 'yup';
import {
  responsiveHeight,
  responsiveWidth,
  ROUTES,
  // selectServiceAddionalFields,
} from '../../../utils';
import CustomInputForm from '../../../components/InputField';
import StartAndEndtimeInput from '../../../components/StartAndEndtimeInput';
import CheckBoxText from '../../../components/CheckBoxText';
import Button from '../../../components/Button';
import ShowServicesModal from '../../../components/ShowServicesModal';
import {getAllServices} from '../../../GlobalFunctions/auth';
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker/src/datetimepicker';
import moment from 'moment';
import {createProject} from '../../../GlobalFunctions/userMain';
import {useSelector} from 'react-redux';

const validationSchema = Yup.object().shape({
  price: Yup.string().required('price is required'),
});

const SelectServiceAddinal = ({route}) => {
  const nav = useNavigation();
  const [isProfessional, setIsProfessional] = useState<string>('');
  const [isPrevProfessional, setIsPrevProfessional] = useState<string>('');
  const [allServices, setAllServices] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openStartTimePicker, setOpenStartTimePicker] = useState(false);
  const [openEndTimePicker, setOpenEndTimePicker] = useState(false);
  const [additional, setAdditional] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [date, setDate] = useState<any>(new Date());
  const [startTime, setStartTime] = useState<any>(new Date());
  const [endTime, setEndTime] = useState<any>(new Date());
  const openModal = useCallback(() => setModalVisible(true), []);
  const openDate = useCallback(() => setOpenDatePicker(true), []);
  const data = route?.params?.details;
  const myLocationDetails = data.myLocationDetails;
  const postJobDetails = data.postJobDetails?.data;
  const [isLoading, setIsLoading] = useState(false);
  const userData = useSelector((state: RootState) => state.user.userData);

  const selectServiceAddionalFields = useMemo(
    () => [
      {
        name: 'category',
        placeholder: 'category',
        line: true,
        dropdownIcon: true,
        editable: false,
        tags: [
          {id: 1, title: 'Plumbing'},
          {id: 2, title: 'Flooring'},
        ],
        dropdownOnPress: openModal,
      },
      {
        name: 'price',
        placeholder: 'price',
        keyboardType: 'numeric',
        line: true,
      },
      {
        name: 'date',
        placeholder: 'date',
        line: true,
        keyboardType: 'time',
        dropdownIcon: true,
        dropdownOnPress: openDate,
      },
    ],
    [openModal, openDate],
  );

  const onSubmitHandler = async values => {
    if (isLoading) {
      return null;
    }

    if (selectedIds.length === 0) {
      return Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Select Category, Using dropdown',
      });
    }

    if (!additional) {
      return Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Additional is required',
      });
    }

    if (!isProfessional) {
      return Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Select Option please',
      });
    }

    setIsLoading(true);

    const res = await createProject({
      userProfileId: userData?._id,
      email: postJobDetails?.values?.email,
      phoneNumber: postJobDetails?.values?.number,
      fullName: postJobDetails?.values?.fullname,
      category: selectedIds,
      selectDate: moment(date).format('YYYY-MM-DD'),
      image: postJobDetails?.images,
      startTime: moment(startTime).format('hh:mm A'),
      endTime: moment(endTime).format('hh:mm A'),
      price: values?.price,
      address: myLocationDetails?.address,
      appartmentNo: myLocationDetails?.appartment,
      professionalType: isProfessional,
      locationName: 'Alaska, United States',
      longitude: -153.369141,
      latitude: 66.160507,
      // state:null,
      additionalNote: additional,
      city: myLocationDetails?.city,
      zipCode: myLocationDetails?.zipCode,
    });

    if (res?.success) {
      nav.navigate(ROUTES.CONGRATULATION, {additional: true});
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Project Created Successfully',
      });
      setIsLoading(false);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Create Project failed',
        text2: res?.message,
      });
      setIsLoading(false);
    }

    // console.log(
    //   userData._id,
    //   myLocationDetails,
    //   postJobDetails,
    //   values,
    //   selectedIds,
    //   moment(date).format('YYYY-MM-DD'),
    //   moment(startTime).format('hh:mm A'),
    //   additional,
    //   isProfessional,
    // );
  };

  const toggleSelection = useCallback((id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id],
    );
  }, []);

  const getServices = async () => {
    const res = await getAllServices();
    if (res?.success) {
      // console.log(typeof res)
      setAllServices(res.data);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Failed to fetch services',
        text2: res?.message,
      });
    }
  };

  const dateOnChange = (event: any, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      setDate(selectedDate);
      setOpenDatePicker(false);
    }
    setOpenDatePicker(false);
  };

  const startTimeOnChange = (event: any, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      setStartTime(selectedDate);
      setOpenStartTimePicker(false);
    }
    setOpenStartTimePicker(false);
  };

  const endTimeOnChange = (event: any, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      setEndTime(selectedDate);
      setOpenEndTimePicker(false);
    }
    setOpenEndTimePicker(false);
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <MainContainer>
      <Header2
        headerText3="Select A Service"
        hideCancel
        text="Post A Job"
        subHeading={'Enter your details'}
      />

      <ShowServicesModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        data={allServices}
        toggleSelection={id => toggleSelection(id)}
        selectedIds={selectedIds}
      />

      {openDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          is24Hour={false}
          onChange={dateOnChange}
        />
      )}

      <View style={{padding: responsiveHeight(2.5), paddingTop: 0}}>
        <CustomInputForm
          hideTags={isProfessional || isPrevProfessional}
          inputContainer={{width: responsiveWidth(90)}}
          buttonStyle={{width: responsiveWidth(90)}}
          inputStyle={{color: 'black'}}
          childrenStyle={{flex: 1}}
          inputContainerStyle={{
            marginTop: responsiveHeight(0),
            alignItems: 'flex-start',
          }}
          onSubmit={values => onSubmitHandler(values)}
          buttonText="Next"
          initialValues={{
            category: '',
            price: '',
            date: moment(date).format('YYYY-MM-DD') || '',
          }}
          isLoading={isLoading}
          // dropdownOnPress={() => setModalVisible(true)}
          validationSchema={validationSchema}
          fields={selectServiceAddionalFields}>
          <StartAndEndtimeInput
            isProfessional={isProfessional}
            setIsProfessional={setIsProfessional}
            startTime={startTime}
            endTime={endTime}
            openStartTimePicker={openStartTimePicker}
            setOpenStartTimePicker={setOpenStartTimePicker}
            openEndTimePicker={openEndTimePicker}
            setOpenEndTimePicker={setOpenEndTimePicker}
            startTimeOnChange={startTimeOnChange}
            endTimeOnChange={endTimeOnChange}
            additional={additional}
            setAdditional={setAdditional}
          />
        </CustomInputForm>
      </View>
    </MainContainer>
  );
};

export default SelectServiceAddinal;
