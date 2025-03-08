import React, { useState, useCallback, useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Composer, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat'
import svgIcons from '../assets/icons';
import SVGXml from './SVGXml';

const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          paddingHorizontal: 10,
          paddingVertical: 5,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#ddd',
        }}
        renderComposer={(composerProps) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#f0f0f0',
              borderRadius: 25,
              paddingHorizontal: 10,
              flex: 1,
            }}
          >
            {/* Mic Icon on the Left Side */}
            <TouchableOpacity onPress={() => console.log('Start Voice Recording')} style={{ marginRight: 5 }}>
            <SVGXml width={'20'} height={'20'} icon={svgIcons.mic} />
            </TouchableOpacity>
  
            {/* Text Input in the Middle */}
            <TextInput
              {...composerProps}
              placeholder="Type a message..."
              style={{
                flex: 1,
                fontSize: 16,
                paddingVertical: 8,
              }}
              value={props.text}
              onChangeText={props.onTextChanged}
            />
  
            {/* Attachment Icon on the Right Side */}
            <TouchableOpacity onPress={() => console.log('Attach File')} style={{ marginRight: 10 }}>
            <SVGXml width={'20'} height={'20'} icon={svgIcons.attachment} />
            </TouchableOpacity>
  
            {/* Conditional Send Icon on the Right Side */}
            {/* {props.text.trim().length > 0 ? (
              <TouchableOpacity onPress={() => props.onSend({ text: props.text }, true)}>
                <SVGXml width={'20'} height={'20'} icon={svgIcons.send} />
              </TouchableOpacity>
            ) : null} */}
          </View>
        )}
      />
    );
  };
  
const Example = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
          },
        },
      ]);
    }, []);

    const renderSend = () => null;
    const renderActions = () => null;

    const onSend = useCallback((newMessages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    }, []);
  
    return (
      <SafeAreaView style={styles.container}>
        <GiftedChat
          messages={messages}
          onSend={onSend}
          renderSend={renderSend} // Hide default Send button
          user={{ _id: 1 }}
          renderInputToolbar={renderInputToolbar}
           alwaysShowSend={false}
           renderActions={renderActions} 
        />
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1, // Ensure it takes up the full screen
      backgroundColor: '#fff', // Optional, for visibility
    },
  });

export default Example