import React, { useEffect, useState } from 'react';
import { invoke, view } from '@forge/bridge';
import api, { route } from "@forge/api";

function App() {
  const [updateDataForge, setUpdateDataForge] = useState('');
  async function fetchData() {  
    let updateData = `{"fields":{
  `
    let context = await view.getContext();
    let key = context.extension.request.key;
    let fields = context.extension.request.properties.value.fields
    for (var field of fields) {
      updateData += `"${field.key}":"${field.value}",`
      //console.log(updateData);
    }
    updateData += `
    }
  }`
    setUpdateDataForge(updateData);
    console.log(updateData);
    return updateData;
  }


  



async function functionEdit(){
  invoke ("UpdateData",{key: {updateDataForge}}).then(console.log);
}

useEffect(() => {
  fetchData();
}, []);




  return (
    <div>
      <h1>Context</h1>
      <button onClick={fetchData}>Get Context</button>
      <button onClick={functionEdit}>Edit the issue </button>
      <h1>Fields</h1>
      <h2>{updateDataForge}</h2>
    </div>
  );
}

export default App;
