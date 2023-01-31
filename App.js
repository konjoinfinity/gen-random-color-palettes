


import { useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';

export default function App() {
  const [colors, setColors] = useState([{id: 1, color: 'black'},{id: 2, color: 'black'},{id: 3, color: 'black'},{id: 4, color: 'black'},{id: 5, color: 'black'}])
  const [copiedText, setCopiedText] = useState('');

const copyToClipboard = async(clip) => {
  await Clipboard.setStringAsync(clip);
};

function getPalette() {
      fetch("http://colormind.io/api/", {
        method: "POST",
        body: JSON.stringify({model : "default"})
      })
        .then(res => res.json())
        .then(res => {
          var palette = colors
          palette = [{id: 1, color: `rgb(${res.result[0][0]},${res.result[0][1]},${res.result[0][2]})`},{id: 2, color: `rgb(${res.result[1][0]},${res.result[1][1]},${res.result[1][2]})`},
          {id: 3, color: `rgb(${res.result[2][0]},${res.result[2][1]},${res.result[2][2]})`},{id: 4, color: `rgb(${res.result[3][0]},${res.result[3][1]},${res.result[3][2]})`},
          {id: 5, color: `rgb(${res.result[4][0]},${res.result[4][1]},${res.result[4][2]})`}]
          console.log(palette)
          setColors(palette)
        }).catch(error => {
          console.log(`${error.message}!`);
        });
  }

  return (
    <View>
      <Text style={{fontSize: 30, textAlign: 'center', marginTop:70, marginBottom: 30}}>Random Color Palette</Text>
      <View style={{display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems:"center", justifyContent:"center", marginBottom: 30}}>
    {colors.map(color => {
      return <View key={color.id}><TouchableOpacity style={{height: 150, width: 150, borderRadius: 5, backgroundColor: color.color, margin: 10}} onPress={() => copyToClipboard(color.color)} /> 
      <Text selectable={true} style={{textAlign: 'center'}}>{color.color}</Text></View>})}
     </View>
     <Button title='Generate' onPress={() => getPalette()} />
    </View>
  );
}
