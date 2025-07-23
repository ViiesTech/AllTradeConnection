/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {ActivityIndicator, View} from 'react-native';
import {colors} from '../assets/colors';

const ChatCom = ({receiverData, userData}: any) => {
  const {
    _id: receiverId,
    fullName: receiverName,
    image: receiverImage,
  } = receiverData;
  const currentUserId = userData?._id;
  const currentUserImage = userData?.image;
  const currentUserName = userData?.fullName;
  // console.log(receiverData, userData)
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const uniqueDocId = [currentUserId, receiverId].sort().join('_');
  // Real-time listener for messages
  useEffect(() => {
    if (!currentUserId || !receiverId) return;
    setIsLoading(true);
    const messagesRef = firestore()
      .collection('chats')
      .doc(uniqueDocId)
      .collection('messages')
      .orderBy('createdAt', 'desc');
    const unsubscribe = messagesRef.onSnapshot(
      querySnapshot => {
        const allMessages = querySnapshot.docs.map(doc => {
          const data = doc.data();
          const createdAt = data.createdAt?.toDate() || new Date();
          const isCurrentUser = data.senderId === currentUserId;
          return {
            _id: doc.id,
            text: data.text,
            createdAt,
            user: {
              _id: data.senderId,
              name: isCurrentUser ? 'You' : receiverName,
              avatar: isCurrentUser ? currentUserImage : receiverImage,
            },
          };
        });
        setMessages(allMessages);
        setIsLoading(false);
      },
      error => console.error('Message listener error:', error),
    );
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserId, receiverId]);
  // Send message
  const onSend = useCallback(
    async (newMessages = []) => {
      const text = newMessages[0].text;
      const batch = firestore().batch();
      // 1. Add main message
      const messageRef = firestore()
        .collection('chats')
        .doc(uniqueDocId)
        .collection('messages')
        .doc();
      batch.set(messageRef, {
        text,
        senderId: currentUserId,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      // 2. Update last message metadata for both users
      const lastMsgData = {
        userId: receiverId,
        userName: receiverName,
        userImage: receiverImage,
        lastMessage: text,
        timestamp: firestore.FieldValue.serverTimestamp(),
      };
      // For current user
      const currentUserChatRef = firestore()
        .collection('userChats')
        .doc(currentUserId);
      batch.set(
        currentUserChatRef,
        {
          [uniqueDocId]: lastMsgData,
        },
        {merge: true},
      );
      // For receiver
      const receiverLastMsgData = {
        userId: currentUserId,
        userName: currentUserName,
        userImage: currentUserImage,
        lastMessage: text,
        timestamp: firestore.FieldValue.serverTimestamp(),
      };
      const receiverChatRef = firestore()
        .collection('userChats')
        .doc(receiverId);
      batch.set(
        receiverChatRef,
        {
          [uniqueDocId]: receiverLastMsgData,
        },
        {merge: true},
      );
      await batch.commit();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUserId, receiverId],
  );

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} color={colors.primary} />
      </View>
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: currentUserId,
        name: currentUserName,
        avatar: currentUserImage,
      }}
      alwaysShowSend
    />
  );
};
export default ChatCom;
