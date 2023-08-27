import React, {useEffect, useState} from 'react';
import {View, FlatList, Image, Text, ScrollView} from 'react-native';
import style from './style';
import {Header} from '../../../components/header';
import {Button} from '../../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ProfileScreen = () => {
  const [activeTabMenu, setActiveTabMenu] = useState<string>('user-info');
  const [userData, setUserData] = useState<object>({});

  useEffect(() => {
    AsyncStorage.getItem('user').then(res => {
      setUserData(JSON.parse(res));
    });
  }, []);

  const userSections = [
    {
      id: 'user-info',
      title: 'Bilgilerim',
    },
    {
      id: 'user-carrier',
      title: 'Kariyerim',
    },
    {
      id: 'user-education',
      title: 'Eğitimim',
    },
    {
      id: 'user-cv',
      title: 'CV ve Projelerim',
    },
  ];

  const renderItem = (item: {id: string; title: string}) => {
    const {id, title} = item;
    return (
      <View style={style.render_item_container}>
        <Button
          preset={activeTabMenu === id ? 'primary' : 'muted'}
          text={title}
          onPress={() => setActiveTabMenu(id)}
          color="white"
        />
      </View>
    );
  };
  return (
    <View style={style.container}>
      <Header title="Profil" />
      <ScrollView>
        <View style={style.inner_container}>
          <View style={style.avatar_container}>
            <View style={style.photo_container}>
              <Image
                style={style.user_photo}
                source={
                  userData?.image
                    ? {
                        uri: userData?.image,
                      }
                    : require('../../../assets/images/user.png')
                }
              />
            </View>
            <Text>{userData?.fullName}</Text>
            <Text>{userData?.email}</Text>
          </View>
          <FlatList
            data={userSections}
            renderItem={({item}) => renderItem(item)}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={200}
            keyExtractor={item => item.id}
          />
        </View>
        {activeTabMenu === 'user-info' && (
          <View style={style.user_container}>
            <Text style={style.user_content_title}>
              Cinsiyet:{' '}
              <Text style={style.user_content}>{userData?.gender}</Text>
            </Text>
            <Text style={style.user_content_title}>
              Kimlik Numarası:{' '}
              <Text style={style.user_content}>{userData?.idNumber}</Text>
            </Text>
            <Text style={style.user_content_title}>
              Telefon Numarası:{' '}
              <Text style={style.user_content}>{userData?.phoneNumber}</Text>
            </Text>
            <Text style={style.user_content_title}>
              Ülke: <Text style={style.user_content}>{userData?.country}</Text>
            </Text>
          </View>
        )}
        {activeTabMenu === 'user-carrier' && (
          <View style={style.user_container}>
            <Text style={style.user_content_title}>
              Meslek: <Text style={style.user_content}>{userData?.job}</Text>
            </Text>
            <Text style={style.user_content_title}>
              Çalışma Durumu:{' '}
              <Text style={style.user_content}>
                {userData?.employmentStatus}
              </Text>
            </Text>
          </View>
        )}
        {activeTabMenu === 'user-education' && (
          <View style={style.user_container}>
            <Text style={style.user_content_title}>
              Eğitim Düzeyi:{' '}
              <Text style={style.user_content}>{userData?.educationLevel}</Text>
            </Text>
            <Text style={style.user_content_title}>
              Okul Adı:{' '}
              <Text style={style.user_content}>{userData?.schoolName}</Text>
            </Text>
            <Text style={style.user_content_title}>
              Fakülte Adı:{' '}
              <Text style={style.user_content}>{userData?.facultyName}</Text>
            </Text>
            <Text style={style.user_content_title}>
              Bölüm Adı:{' '}
              <Text style={style.user_content}>{userData?.sectionName}</Text>
            </Text>
            <Text style={style.user_content_title}>
              Başlama Tarihi:{' '}
              <Text style={style.user_content}>{userData?.startDate}</Text>
            </Text>
            <Text style={style.user_content_title}>
              Bitiş Tarihi:{' '}
              <Text style={style.user_content}>{userData?.endDate}</Text>
            </Text>
            <Text style={style.user_content_title}>
              Yetkinlikler:{' '}
              <Text style={style.user_content}>{userData?.qualifications}</Text>
            </Text>
          </View>
        )}
        {activeTabMenu === 'user-cv' && (
          <View style={style.user_container}>
            <Text style={style.user_content_title}>
              CV: <Text style={style.user_content}>{userData?.cv}</Text>
            </Text>
            <Text style={style.user_content_title}>
              Projeler:{' '}
              <Text style={style.user_content}>{userData?.projects}</Text>
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
