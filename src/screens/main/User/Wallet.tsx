import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import MainContainer from '../../../components/MainContainer'
import Header2 from '../../../components/Header2'
import { responsiveFontSize, responsiveHeight } from '../../../utils'
import { colors } from '../../../assets/colors'
import SVGXml from '../../../components/SVGXml'
import svgIcons from '../../../assets/icons'

const walletData = [
    {id: 1, title: 'Transfer To James Wilson', time: '05-Sep-2024', numOfUsd: '+$5,000.00'},
    {id: 2, title: 'Transfer To James Wilson', time: '05-Sep-2024', numOfUsd: '+$5,000.00'},
    {id: 3, title: 'Transfer To James Wilson', time: '05-Sep-2024', numOfUsd: '+$5,000.00'},
    {id: 4, title: 'Transfer To James Wilson', time: '05-Sep-2024', numOfUsd: '+$5,000.00'},
    {id: 5, title: 'Transfer To James Wilson', time: '05-Sep-2024', numOfUsd: '+$5,000.00'},
    {id: 6, title: 'Transfer To James Wilson', time: '05-Sep-2024', numOfUsd: '+$5,000.00'},
    {id: 7, title: 'Transfer To James Wilson', time: '05-Sep-2024', numOfUsd: '+$5,000.00'},
]

const Wallet = () => {
  return (
    <MainContainer>
    <Header2 headerText3='' hideCancel text={'Wallet'} subHeading={''} />

        <View style={{padding: responsiveHeight(2.5), paddingTop: 0}}>
            <View style={{backgroundColor: colors.primary, height: responsiveHeight(18), justifyContent: 'center', borderRadius: 10, padding: responsiveHeight(2)}}>
                <View style={{gap: 10}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: responsiveFontSize(2), color: colors.secondary}}>Available Balance</Text>
                    <Text style={{fontSize: responsiveFontSize(2), color: colors.secondary}}>Reward Point</Text>
                    </View>

                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                    <Text style={{fontSize: responsiveFontSize(3.4), fontWeight: 'bold', color: colors.secondary}}>$87,430.12</Text>
                    <SVGXml width={'20'} height={'20'} icon={svgIcons.eyeIconMain} />
                    </View>
                    <Text style={{fontSize: responsiveFontSize(3), fontWeight: 'bold', color: colors.secondary}}>5000</Text>
                </View>
                </View>
            </View>

            <View style={{marginTop: responsiveHeight(2), flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: responsiveFontSize(2), fontWeight: 'bold', color: colors.dark_purple}}>All Transactions</Text>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <Text>Sort By Date</Text>
                <SVGXml width={'12'} height={'12'} icon={svgIcons.dropdownBlack} />
                </TouchableOpacity>
            </View>

            <View style={{marginTop: responsiveHeight(2)}}>
                <FlatList
                data={walletData}
                ItemSeparatorComponent={() => <View style={{height: responsiveHeight(2)}} />}
                renderItem={({item}) => {
                    return (
                        <View style={{borderWidth: 1, borderRadius: 10, borderColor: colors.line_color, padding: responsiveHeight(2)}}>
                           <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View>
                            <Text style={{fontSize: responsiveFontSize(1.8), color: colors.black}}>{item.title}</Text>
                            <Text style={{fontSize: responsiveFontSize(1.7), color: colors.gray}}>{item.time}</Text>
                            </View>
                            <Text style={{fontSize: responsiveFontSize(2), color: colors.black, fontWeight: 'bold'}}>{item.numOfUsd}</Text>
                           </View>
                        </View>
                    )
                }}
                />
            </View>
        </View>
    </MainContainer>
  )
}

export default Wallet