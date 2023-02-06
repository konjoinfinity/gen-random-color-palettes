


import { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import ColorConvert from 'color-convert'

export default function App() {
  const [colors, setColors] = useState([{id: 1, color: '', hex: ''},{id: 2, color: '', hex: ''},{id: 3, color: '', hex: ''},{id: 4, color: '', hex: ''},{id: 5, color: '', hex: ''}])
  const [clipboard, setClipboard] = useState('')
const copyToClipboard = async(clip) => {
  setClipboard(clip)
  await Clipboard.setStringAsync(clip);
};

useEffect(() => {
  getPalette();
}, [])

function getPalette() {
      fetch("http://colormind.io/api/", {
        method: "POST",
        body: JSON.stringify({model : "default"})
      })
        .then(res => res.json())
        .then(res => {
          let palette = [{id: 1, color: `rgb(${res.result[0][0]},${res.result[0][1]},${res.result[0][2]})`, hex: ColorConvert.rgb.hex(res.result[0])},{id: 2, color: `rgb(${res.result[1][0]},${res.result[1][1]},${res.result[1][2]})`,hex: ColorConvert.rgb.hex(res.result[1])},
          {id: 3, color: `rgb(${res.result[2][0]},${res.result[2][1]},${res.result[2][2]})`,hex: ColorConvert.rgb.hex(res.result[2])},{id: 4, color: `rgb(${res.result[3][0]},${res.result[3][1]},${res.result[3][2]})`, hex: ColorConvert.rgb.hex(res.result[3])},
          {id: 5, color: `rgb(${res.result[4][0]},${res.result[4][1]},${res.result[4][2]})`,hex: ColorConvert.rgb.hex(res.result[4])}]
          setColors(palette)
        }).catch(error => {
          console.log(`${error.message}!`);
        });
  }

  return (
    <View>
    
      {clipboard == '' ?
        <Text style={{fontSize: 30, textAlign: 'center', marginTop:60, marginBottom: 20, fontWeight: '400'}}>Color Palette Generator</Text>:
        <Text style={{fontSize: 22, textAlign: 'center', marginTop:60, marginBottom: 20, fontWeight: '400', backgroundColor:'#007AFF', color: 'white', padding: 5}}>Copied #{clipboard} to your Clipboard!</Text>}
      
      <View style={{display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems:"center", justifyContent:"center", marginBottom: 20}}>
    {colors.map(color => {
      return <View key={color.id}><TouchableOpacity style={{height: 140, width: 140, borderRadius: 5, backgroundColor: color.color, margin: 10}} onPress={() => copyToClipboard(color.hex)} /> 
      {color.hex ? <Text selectable={true} style={{textAlign: 'center', fontSize: 25, fontWeight: '300'}}>#{color.hex}</Text> : null}</View>})}
     </View>
     <TouchableOpacity style={{backgroundColor: '#007AFF', padding: 20, borderRadius: 5}} onPress={() => getPalette()}><Text style={{textAlign: 'center', fontSize: 25, color: "white", fontWeight: '400'}}>Generate</Text></TouchableOpacity>
    </View>
  );
}
