import { useState,useEffect } from 'react';
import { View, Text } from 'react-native';
import Styles from '../components/Styles';

const Home = () => {
  const [speed,setSpeed]=useState(0.0);
  const [errorMsg,setErrorMsg]=useState("");
// sycronisation
useEffect(() => {
  const interval=setInterval(()=>{
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = 'http://192.168.4.1/state';
      xhr.onreadystatechange = async() => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText);
            setSpeed(parseFloat(xhr.responseText));
            setErrorMsg("");
          } else {
            setErrorMsg("لايوجد اتصال!");
          }
        }
      };
      xhr.open('GET', url, true);
      xhr.timeout = 2000; // set the timeout to 2 seconds
      xhr.send();
    });
  },200);
  return ()=> clearInterval(interval);
}, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={Styles.normalText}>
        سرعة الرياح
      </Text>
      <Text style={{...Styles.normalText,fontSize:35}}>
        {speed+" m/s"}
      </Text>
      <View>
        <Text style={{color:"red",marginTop:50}}>{errorMsg}</Text>
      </View>
    </View>
  );
};

export default Home;
