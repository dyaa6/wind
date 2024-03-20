import React from 'react';
import { View, Text,Image } from 'react-native';
import Styles from '../components/Styles';
const About = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Image source={require("../assets/ntu.png")} style={{width:55,height:65,margin:10}}></Image>
    <Text style={Styles.title}>
مقياس سرعة الرياح
    </Text>
      <Text style={Styles.normalText}>
        مشروع تخرج مقدم الى قسم الكهرباء/ المعهد التقني الموصل/ الجامعة التقنية الشمالية
      </Text>
      <Text style={{...Styles.title,alignSelf:"flex-start",marginHorizontal:25,marginTop:30}}>
        إعداد الطلاب:
      </Text>
      <View style={Styles.students}>
        <Text style={Styles.student}>
            الطالب 1
        </Text>
        <Text style={Styles.student}>
            الطالب 2
        </Text>
        <Text style={Styles.student}>
            الطالب 3
        </Text>
        <Text style={Styles.student}>
            الطالب 4
        </Text>
      </View>
    </View>
  );
};

export default About;
