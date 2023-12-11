import { useState } from "react";
import { View,Text, TextInput,TouchableOpacity,Vibration } from "react-native";
import NetworkStyles from "./NetworkStyles";
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from "./Styles";
import { Ionicons } from '@expo/vector-icons';
import Colors from "./Colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default NetworkConfig=()=>{
    const [showPassword,setShowPassword]=useState(true);
    const [oldPassword, setOldPassword] = useState('');
    const [newSSID, setNewSSID] = useState('');
    const [newPassword1, setNewPassword1] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [responseText, setResponseText] = useState('');
    const [msg,setMsg]=useState('');
    const [msgState,setMsgState]=useState(true);


    const changeTheSSID=()=>{
      Vibration.vibrate(200);
      new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          const url = 'http://192.168.4.1/newssidwdx?value='+newSSID;
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                  if(xhr.responseText=="SSID updated"){
                      setMsg('تم تغيير اسم الشبكة وكلمة السر بنجاح😘');
                      setOldPassword('');
                      setNewSSID('');
                      setNewPassword1('');
                      setNewPassword2('');
                  }
              } else {
                setMsg("لايمكن الاتصال بالجهاز!");
              }
            }
          };
          xhr.open('GET', url, true);
          xhr.timeout = 2000; // set the timeout to 2 seconds
          xhr.send();
        });
  }
  const changeThePassword=()=>{
    new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const url = "http://192.168.4.1/newpasswdx?newpassword="+newPassword2;
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                if(xhr.responseText=="Password updated"){

                    setMsg('تم تغيير اسم الشبكة وكلمة السر بنجاح😘');
                }
            } else {
              setMsg("لايمكن الاتصال بالجهاز!");
            }
          }
        };
        xhr.open('GET', url, true);
        xhr.timeout = 2000; // set the timeout to 2 seconds
        xhr.send();
      });
}


    const sendRequest = () => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const url = 'http://192.168.4.1/passwdx';
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
            } else {
              reject("لايمكن الاتصال!");
            }
          }
        };
        xhr.open('GET', url, true);
        xhr.timeout = 2000; // set the timeout to 2 seconds
        xhr.send();
      });
    };
    const handleChange = async () => {
      setIsLoading(true);
      try {
        const response = await sendRequest();
        setResponseText(response);
    
        if (newSSID ==='' || oldPassword === '' || newPassword1 === '' || newPassword2 === '') {
          setMsg('يجب أن تملأ جميع الحقول');
          setIsLoading(false);
          return;
        }
        if (newPassword1.length<8 || newPassword2.length<8){
          setMsg('كلمة السر يجب أن تتكون من ثمانية أحرف او ارقام على الأقل');
          setIsLoading(false);
          return;
        }
    
        if (response === oldPassword) {
          if(newPassword1===newPassword2){
              // send request to change the password
              changeTheSSID();
              changeThePassword();
          }else{
              setMsg('إدخالات كلمة السر مختلفة');
          }
        } else {
          setMsg('كلمة السر غير صحيحة!');
        }
    
        setIsLoading(false);
      } catch (error) {
        setMsg(error);
        setIsLoading(false);
      }
    };
    return(
        <View style={{width:"100%"}}>
          <View>
            <View style={{...NetworkStyles.loginFieldContainer,paddingLeft:5}}>
              <Icon name="key" size={23} style={{ marginHorizontal: 10 }} color={Colors.mainColor} />
              <TextInput
                  style={{...NetworkStyles.textboxtext,flex:1}}
                  placeholder="كلمة السر القديمة"
                  secureTextEntry={showPassword}
                  value={oldPassword}
                  onChangeText={setOldPassword}
              /></View>
            <View style={{...NetworkStyles.loginFieldContainer,paddingLeft:5}}>
              <Icon name="wifi" size={23} style={{ marginHorizontal: 10 }} color={Colors.mainColor} />
              <TextInput
                style={{...NetworkStyles.textboxtext,flex:1}}
                placeholder="اسم جديد للشبكة"
                value={newSSID}
                onChangeText={setNewSSID}
              /></View>
            <View style={NetworkStyles.loginFieldContainer}>
              <MaterialCommunityIcons name="form-textbox-password" size={23} color={Colors.mainColor} />
              <TextInput
                style={{...NetworkStyles.textboxtext,flex:1}}
                placeholder="كلمة السر الجديدة"
                secureTextEntry={showPassword}
                value={newPassword1}
                onChangeText={setNewPassword1}
                maxLength={30}
              />
            </View>
          <View style={NetworkStyles.loginFieldContainer}>
            <MaterialCommunityIcons name="form-textbox-password" size={23} color={Colors.mainColor} />
            <TextInput
              style={{...NetworkStyles.textboxtext,flex:1}}
              placeholder="أعد كتابة كلمة السر الجديدة"
              secureTextEntry={showPassword}
              value={newPassword2}
              onChangeText={setNewPassword2}
              maxLength={30}
            />
          </View>
          <View style={{flexDirection:'row-reverse'}}>
          <TouchableOpacity style={{marginRight:10}}
            onPress={()=>{setShowPassword(!showPassword)}}
            >
            <Ionicons name={showPassword?"eye":"eye-off"} size={24} color={Colors.mainColor} />
          </TouchableOpacity>

          <TouchableOpacity style={{marginRight:10}}
            onPress={()=>{setOldPassword(''),setNewPassword1(''),setNewPassword2('')}}
            >
            <Ionicons name="close-sharp" size={24} color={Colors.mainColor} />
          </TouchableOpacity>
          </View>
            <Text style={{color:"red",margin:5}}>{msg}</Text>
         
        </View>
  
        <TouchableOpacity
          style={[NetworkStyles.button, isLoading && NetworkStyles.loadingLoginButton]}
          onPress={handleChange}
          disabled={isLoading}
        >
          <Text style={Styles.midFont1}>{isLoading ? 'جارِ حفظ التغييرات..' : 'حفظ التغييرات'}</Text>
        </TouchableOpacity>
      </View>
        
    )
}