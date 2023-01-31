import { useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';

function Card(color) {
  <TouchableOpacity style={{height: 150, width: 150, borderRadius: 5, backgroundColor: color, margin: 10}} /> 
}

export default function App() {
  const [colors, setColors] = useState(null)
 function getPalette() {
      fetch("http://colormind.io/api/", {
        method: "POST",
        body: JSON.stringify({model : "default"})
      })
        .then(res => res.json())
        .then(res => {
          console.log(res)
          setColors(res)
        }).catch(error => {
          console.log(`${error.message}!`);
        });
  }

  return (
    <View>
      <Text style={{fontSize: 30, textAlign: 'center', marginTop:70, marginBottom: 50}}>Random Color Palette</Text>
      <View style={{display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems:"center", justifyContent:"center", marginBottom: 50}}>
    
     <TouchableOpacity style={{height: 150, width: 150, borderRadius: 5, backgroundColor: 'black', margin: 10}} />
     <TouchableOpacity style={{height: 150, width: 150, borderRadius: 5, backgroundColor: 'black', margin: 10}} />
     <TouchableOpacity style={{height: 150, width: 150, borderRadius: 5, backgroundColor: 'black', margin: 10}} />
     <TouchableOpacity style={{height: 150, width: 150, borderRadius: 5, backgroundColor: 'black', margin: 10}} />
     </View>
     <Button title='Generate' onPress={() => getPalette()} />
    </View>
  );
}
