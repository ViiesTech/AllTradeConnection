import React from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { images } from '../assets/images';
import { responsiveFontSize, responsiveHeight, responsiveWidth, ROUTES } from '../utils';
import { colors } from '../assets/colors';
import Button from './Button';

const CongratulationCard = ({ review, cancelJob, changePasswordScreen, reject }: any) => {
    const navigation = useNavigation();

    const getTitle = () => {
        if (review) return 'Review';
        if (cancelJob) return 'Cancel Job';
        if (reject) return 'Rejected';
        return 'Congratulation';
    };

    const getMessage = () => {
        if (changePasswordScreen) return 'You have earned 100 points';
        if (review) return 'Your Review Post Successfully';
        if (cancelJob) return 'Are you sure you want to cancel this job?';
        if (reject) return 'Are you sure you want to reject this professional';
        return 'Job has been posted successfully';
    };

    const getButtonText = () => {
        if (changePasswordScreen) return 'Go To Wallet';
        if (review) return 'Go Back';
        if (cancelJob) return 'Cancel';
        if (reject) return 'Reject';
        return 'Get Started';
    };

    const handleButtonPress = () => {
        if (changePasswordScreen) {
            navigation.navigate(ROUTES.WALLET);
        } else if (review || reject) {
            navigation.navigate(ROUTES.MY_JOBS);
        } else {
            navigation.navigate(ROUTES.LIST_OF_PRO);
        }
    };

    return (
        <View>
            <ImageBackground 
                source={images.cardBg} 
                imageStyle={{ borderRadius: 8 }} 
                style={{ width: responsiveWidth(90), paddingVertical: responsiveHeight(2) }}
            >
                <View style={{ alignItems: 'center', paddingBottom: responsiveHeight(2), borderBottomWidth: 1, borderBottomColor: colors.secondary }}>
                    <Text style={{ fontSize: responsiveFontSize(3), fontWeight: 'bold', color: colors.secondary }}>{getTitle()}</Text>
                </View>
                <View style={{ alignItems: 'center', gap: 15, marginTop: responsiveHeight(3) }}>
                    <Image source={images.correct} />
                    <Text style={{ color: colors.secondary, width: responsiveWidth(50), textAlign: 'center' }}>{getMessage()}</Text>
                    
                    <Button 
                        isWhiteBtnBG={true} 
                        textStyle={{ color: colors.black }}
                        style={{ marginTop: responsiveHeight(2), width: responsiveWidth(80), backgroundColor: colors.secondary }} 
                        buttonText={getButtonText()} 
                        onPress={handleButtonPress} 
                    />

                    {changePasswordScreen && (
                        <TouchableOpacity>
                            <Text style={{ color: colors.secondary, textAlign: 'center', fontWeight: 'bold' }}>Go Back</Text>
                        </TouchableOpacity>
                    )}
                    {cancelJob && (
                        <TouchableOpacity>
                            <Text style={{ color: colors.secondary, textAlign: 'center', fontWeight: 'bold' }}>No Thanks</Text>
                        </TouchableOpacity>
                    )}
                      {reject && (
                        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.CHAT_MESSAGES)}>
                            <Text style={{ color: colors.secondary, textAlign: 'center', fontWeight: 'bold' }}>Go To Chat</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ImageBackground>
        </View>
    );
};

export default CongratulationCard;
