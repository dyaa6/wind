import react, { useState,useEffect } from "react";
import { View,Text,ScrollView,Switch, TextInput } from "react-native";
import Styles from "../Components/Styles";
import NetworkConfig from "../Components/NetworkConfig";
import TempConfig from "../Components/TempConfig";
import Colors from "../Components/Colors";
export default Settings=()=>{
    const [isEnabled3, setIsEnabled3] = useState(true);// switch two is on
    const [errorMsg,setErrorMsg]=useState("لا يوجد اتصال بالجهاز!");
    const [errorMsgState,setErrorMsgState]=useState(true);

    
// sycronisation
useEffect(() => {
  const interval=setInterval(()=>{
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = 'http://192.168.4.1/statewdx';
  
      xhr.onreadystatechange = async() => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText);
            setErrorMsgState(false);
            if(xhr.responseText.split("#")[3]=="on"){
              setIsEnabled3(true);
            }
            else{
              setIsEnabled3(false);
              }
          } else {
            setErrorMsgState(true);
          }
        }
      };
      xhr.open('GET', url, true);
      xhr.timeout = 400; // set the timeout to 2 seconds
      xhr.send();
    });
  },200);
  return ()=> clearInterval(interval);
}, []);

    const switchThreeOn=()=>{
        setIsEnabled3(previousState => !previousState); 
        // turn on auto mode
        if(!isEnabled3){
          new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const url = "http://192.168.4.1/buzzerOption?value=1";
        
            xhr.onreadystatechange = () => {
              if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                  resolve(xhr.responseText);
                  setErrorMsgState(false);
                } else {
                  setErrorMsgState(true);
                }
              }
            };
            xhr.open('GET', url, true);
            xhr.timeout = 1000; // set the timeout to 2 seconds
            xhr.send();
          });
        }
        else{
          new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const url = "http://192.168.4.1/buzzerOption?value=0";
        
            xhr.onreadystatechange = () => {
              if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                  resolve(xhr.responseText);
                  setErrorMsgState(false);
                } else {
                  setErrorMsgState(true);
                }
              }
            };
            xhr.open('GET', url, true);
            xhr.timeout = 1000; // set the timeout to 2 seconds
            xhr.send();
          });
        }
      
      }
    return(
    <ScrollView>
      <View style={Styles.header}>
        <Text style={Styles.midFont1}>
                    الاعدادات
        </Text>
      </View>
      
      <View style={Styles.mainContainer}>
      <View style={[errorMsgState? Styles.visible : Styles.hidden]}>
        <Text style={Styles.errorMessage}>{errorMsg}</Text>
      </View>
      
      <View style={{...Styles.pannel,marginBottom:25}}>
          
            <Text style={{...Styles.midFont2,marginTop:-15}}>اعدادات الحرارة والرطوبة</Text>
            <TempConfig/>
        </View>

        <View style={{...Styles.pannel,marginBottom:25}}>
          
            <Text style={{...Styles.midFont2,marginTop:-15}}>اعدادات الشبكة</Text>
            <NetworkConfig/>
        </View>
        
        </View>
        </ScrollView>
    )
}