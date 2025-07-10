import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import CustomInputForm from '../../../components/InputField';
import {
  createProfileYourSelfProfileFields,
  responsiveHeight,
  responsiveWidth,
  ROUTES,
} from '../../../utils';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import ShowServicesModal from '../../../components/ShowServicesModal';
import {getAllServices} from '../../../GlobalFunctions/auth';
import Toast from 'react-native-toast-message';
import {launchImageLibrary} from 'react-native-image-picker';

export const validationSchema = Yup.object().shape({
  bio: Yup.string(),
});

const CreateProfileYourSelf = ({route}) => {
  const nav = useNavigation();
  const [allServices, setAllServices] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const profileData = route?.params?.profileData;
  const professionalProfileImage = route?.params?.image;
  const professionalId = route?.params?.professionalId;
  const type = route?.params?.type;

  const handleProfessionalProfile = values => {
    if (!selectedIds?.length || !values.bio) {
      return Toast.show({
        type: 'error',
        text1: 'Profile not submitted.',
        text2: 'All Fields are required',
      });
    }
    const data = {
      profileData,
      professionalId,
      type,
      services: selectedIds,
      dataTwo: values,
      professionalProfileImage,
    };
    nav.navigate(ROUTES.CREATE_PROFESSIONAL_PROFILE, {data});
  };

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

  const toggleSelection = (id: number) => {
    console.log('idddddddddd =>>>>>>>>', id);
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id],
    );
  };

  useEffect(() => {
    getServices();
  }, [nav]);

  return (
    <MainContainer>
      <Header2
        headerText3=""
        hideCancel
        text={'Create Profile'}
        subHeading={'Enter your details to register yourself'}
      />

      <ShowServicesModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        data={allServices}
        toggleSelection={id => toggleSelection(id)}
        selectedIds={selectedIds}
      />

      <View>
        <CustomInputForm
          inputContainer={{width: responsiveWidth(90)}}
          buttonStyle={{width: responsiveWidth(90)}}
          inputStyle={{color: 'black'}}
          inputContainerStyle={{marginTop: responsiveHeight(0)}}
          onSubmit={values => handleProfessionalProfile(values)}
          initialValues={{
            postalcode: '',
            selectservice: '',
            bio: '',
          }}
          validationSchema={validationSchema}
          buttonText="Next"
          services={allServices}
          dropdownOnPress={() => setModalVisible(true)}
          fields={createProfileYourSelfProfileFields}
        />
      </View>
    </MainContainer>
  );
};

export default CreateProfileYourSelf;
