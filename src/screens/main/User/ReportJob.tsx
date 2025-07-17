import React, {useEffect, useState} from 'react';
import Header2 from '../../../components/Header2';
import ModalComponent from '../../../components/Sheet';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import { reportByIdAndReason } from '../../../GlobalFunctions/userMain';
import Toast from 'react-native-toast-message';
import { ROUTES } from '../../../utils';
import { useSelector } from 'react-redux';

const ReportJob = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const nav = useNavigation();
  const [selectedReport, setSelectedReport] = useState({id: 0, report: ''});
  const [isLoading, setIsLoading] = useState(false);
  const userDetail = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (isFocused) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }, [isFocused]);

   const onSubmitHandler = async () => {
      if (isLoading) {
        return null;
      }

      if (!selectedReport.report) {
        return Toast.show({
          type: 'error',
          text1: 'Failed to Report',
          text2: "Tab to select the report",
        });
      }

      setIsLoading(true);
      const res = await reportByIdAndReason({
        id: userDetail?.userData?._id,
        reason: selectedReport.report,
      });
      console.log(res)
      if (res?.success) {
        nav.navigate(ROUTES.MAIN_STACK, {screen: 'BottomStack'});
        setIsLoading(false);
        Toast.show({
          type: 'success',
          text1: 'Report successfully',
          text2: `You have successfully Report`,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed to Report',
          text2: res?.error,
        });
        setIsLoading(false);
      }
    };

  return (
    <>
      <Header2 hideBack subHeading hideCancel text="Report this Job" />
      <ModalComponent
        isModalVisible={modalVisible}
        selectedReport={selectedReport}
        setSelectedReport={setSelectedReport}
        onSubmitHandler={onSubmitHandler}
        isLoading={isLoading}
      />
    </>
  );
};

export default ReportJob;
