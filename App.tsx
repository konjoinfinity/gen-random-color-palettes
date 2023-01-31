


import { useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [colors, setColors] = useState([{id: 1, color: 'black'},{id: 2, color: 'black'},{id: 3, color: 'black'},{id: 4, color: 'black'},{id: 5, color: 'black'}])

 function getPalette() {
      fetch("http://colormind.io/api/", {
        method: "POST",
        body: JSON.stringify({model : "default"})
      })
        .then(res => res.json())
        .then(res => {
          var palette = colors
          palette = [{id: 1, color: `rgb(${res.result[0][0]},${res.result[0][1]},${res.result[0][2]})`},{id: 2, color: `rgb(${res.result[1][0]},${res.result[1][1]},${res.result[1][2]})`},{id: 3, color: `rgb(${res.result[2][0]},${res.result[2][1]},${res.result[2][2]})`},
          {id: 4, color: `rgb(${res.result[3][0]},${res.result[3][1]},${res.result[3][2]})`},{id: 5, color: `rgb(${res.result[4][0]},${res.result[4][1]},${res.result[4][2]})`}]
          console.log(palette)
          setColors(palette)
        }).catch(error => {
          console.log(`${error.message}!`);
        });
  }

  return (
    <View>
      <Text style={{fontSize: 30, textAlign: 'center', marginTop:70, marginBottom: 50}}>Random Color Palette</Text>
      <View style={{display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems:"center", justifyContent:"center", marginBottom: 50}}>
    {colors.map(color => {return <TouchableOpacity key={color.id} style={{height: 150, width: 150, borderRadius: 5, backgroundColor: color.color, margin: 10}} />})}
     </View>
     <Button title='Generate' onPress={() => getPalette()} />
    </View>
  );
}
