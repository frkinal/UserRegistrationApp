import React from 'react';
import {ScrollView, View, useWindowDimensions} from 'react-native';
import style from './style';
import {Header} from '../../components/header';
import RenderHTML from 'react-native-render-html';
import {useRoute} from '@react-navigation/native';

export const KVKKScreen = () => {
  const route = useRoute<any>();

  const fromAuth = route.params?.fromAuth;
  const {width} = useWindowDimensions();
  const source = {
    html: `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>KVKK Bildirimi</title>
    </head>
    <body>
        <h1>Kişisel Verilerin Korunması Kanunu (KVKK) Aydınlatma Metni</h1>
        
        <h2>1. Veri Sorumlusu</h2>
        <p>Firma Adı: [FİRMA ADI]</p>
        <p>Adres: [ADRES]</p>
        <p>Telefon: [TELEFON]</p>
        <p>E-posta: [E-POSTA]</p>
        
        <h2>2. Kişisel Verilerin İşlenme Amaçları</h2>
        <p>Kişisel veriler, aşağıdaki amaçlar için işlenebilir:</p>
        <ul>
            <li>[AMAÇ 1]</li>
            <li>[AMAÇ 2]</li>
            <li>[AMAÇ 3]</li>
        </ul>
        
        <h2>3. Kişisel Verilerin Toplanma Yöntemleri</h2>
        <p>Kişisel veriler, [TOPLAMA YÖNTEMİ] yöntemi ile toplanabilir.</p>
        
        <h2>4. İşlenen Kişisel Veri Kategorileri</h2>
        <p>Aşağıda hangi kişisel veri kategorilerinin işlendiği belirtilmelidir:</p>
        <ul>
            <li>[KATEGORİ 1]</li>
            <li>[KATEGORİ 2]</li>
            <li>[KATEGORİ 3]</li>
        </ul>
        
        <h2>5. Kişisel Verilerin Aktarılması</h2>
        <p>Kişisel veriler, [AKTARMA AMACI] amaçlarıyla [AKTARILAN KİŞİLER] gibi üçüncü kişilere aktarılabilir.</p>
        
        <h2>6. Kişisel Veri Sahibinin Hakları</h2>
        <p>Kişisel veri sahipleri olarak, KVKK'nın 11. maddesi kapsamında aşağıdaki haklara sahipsiniz:</p>
        <ul>
            <li>Bilgi Edinme Hakkı</li>
            <li>Düzeltme Hakkı</li>
            <li>Silme veya Yok Etme Hakkı</li>
            <li>İşleme İtiraz Etme Hakkı</li>
            <li>...</li>
        </ul>
        
        <p>Daha fazla ayrıntı için lütfen <a href="[KVKK BİLDİRİMİ WEB SAYFASI LİNKİ]">KVKK Bildirimi</a> sayfamızı ziyaret edin.</p>
        
        <p>Bu metin [TARİH] tarihinde güncellenmiştir.</p>
    </body>
    </html>    
  `,
  };
  return (
    <View style={style.container}>
      <Header haveBackButton={fromAuth} title="KVKK" />
      <ScrollView style={style.inner_container}>
        <RenderHTML contentWidth={width} source={source} />
      </ScrollView>
    </View>
  );
};
