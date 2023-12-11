import { useState } from "react";
import { View,Text,TextInput,TouchableOpacity,Vibration } from "react-native";
import Styles from "./Styles";
import NetworkStyles from "./NetworkStyles";
import Colors from "./Colors";
export default TempConfig=()=>{
    const [minTemp,setMinTemp]=useState('');
    const [maxTemp,setMaxTemp]=useState('');
    const [minHum,setMinHum]=useState('');
    const [maxHum,setMaxHum]=useState('');
    const [tempMsgState,setTempMsgState]=useState(false);
    const [humMsgState,setHumMsgState]=useState(false);
    const [isLoadingTemp,setIsLoadingTemp]=useState(false);
    const [isLoadingHum,setIsLoadingHum]=useState(false);
    const [tempMsg,setTempMsg]= useState('');
    const [humMsg,setHumMsg]= useState('');
    const handleSaveTemp=()=>{
            Vibration.vibrate(200);
            if(minTemp <=0 || maxTemp <= 0){
                setTempMsg('يجب أن تملأ جميع الحقول');
                setTempMsgState(false);
            }
            else{ // send the values
                new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    const url = 'http://192.168.4.1/tempConfig?min='+minTemp+'&max='+maxTemp;
                    xhr.onreadystatechange = () => {
                      if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                                setTempMsg('تم ضبط درجات الحرارة');
                                setTempMsgState(true);
                        } else {
                            setTempMsg("هناك مشكلة في الاتصال");
                            setTempMsgState(false);
                        }
                      }
                    };
                
                    xhr.open('GET', url, true);
                    xhr.timeout = 2000; // set the timeout to 2 seconds
                    xhr.send();
                  });
            }
    }



    const handleSaveHum=()=>{
        Vibration.vibrate(200);
        if(minHum <=0 || maxHum <= 0){
            setHumMsg('يجب أن تملأ جميع الحقول');
            setHumMsgState(false);
        }
        else{ // send the values
            new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                const url = 'http://192.168.4.1/humConfig?min='+minHum+'&max='+maxHum;
                xhr.onreadystatechange = () => {
                  if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        if(xhr.responseText=="Values updated"){
                            setHumMsg('تم ضبط نسب الرطوبة');
                            setHumMsgState(true);
                        }
                    } else {
                        setHumMsg("هناك مشكلة في الاتصال");
                        setHumMsgState(false);
                    }
                  }
                };
            
                xhr.open('GET', url, true);
                xhr.timeout = 2000; // set the timeout to 2 seconds
                xhr.send();
              });
        }
}
    return(
        <View>
        <Text style={{...Styles.midFont2,marginTop:10,left:13}}>
           الحرارة:
        </Text>
        <View style={{...Styles.rowContainer,justifyContent:"space-between",width:"60%"}}>
        <TextInput
            style={Styles.textbox}
            placeholder="من"
            value={minTemp}
            onChangeText={setMinTemp}
            maxLength={4}
            keyboardType="numeric"
          />
          <Text>-</Text>
          <TextInput
            style={Styles.textbox}
            placeholder="الى"
            value={maxTemp}
            onChangeText={setMaxTemp}
            maxLength={4}
            keyboardType="numeric"
          />
           <TouchableOpacity
                style={{...Styles.button,paddingHorizontal:isLoadingTemp? 5:21}}
                onPress={handleSaveTemp}
                disabled={isLoadingTemp}
                >
                <Text style={Styles.midFont1}>{isLoadingTemp ? 'جارِ الحفظ..' : 'حفظ'}</Text>
            </TouchableOpacity>
        </View>
        <Text style={{color: tempMsgState?"#0BDA51":"red"}}>{tempMsg}</Text>




        <Text style={{...Styles.midFont2,marginTop:10,left:13}}>
           الرطوبة:
        </Text>
        <View style={{...Styles.rowContainer,justifyContent:"space-between",width:"60%"}}>
        <TextInput
            style={Styles.textbox}
            placeholder="من"
            value={minHum}
            onChangeText={setMinHum}
            maxLength={4}
            keyboardType="numeric"
          />
          <Text>-</Text>
          <TextInput
            style={Styles.textbox}
            placeholder="الى"
            value={maxHum}
            onChangeText={setMaxHum}
            maxLength={4}
            keyboardType="numeric"
          />
           <TouchableOpacity
                style={{...Styles.button,paddingHorizontal:isLoadingTemp? 5:21}}
                onPress={handleSaveHum}
                disabled={isLoadingHum}
                >
                <Text style={Styles.midFont1}>{isLoadingHum ? 'جارِ الحفظ..' : 'حفظ'}</Text>
            </TouchableOpacity>
        </View>
        <Text style={{color: humMsgState?"#0BDA51":"red"}}>{humMsg}</Text>
        </View>
    )
}