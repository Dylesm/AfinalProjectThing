import React, { useEffect, useState } from 'react';
import { invoke, view } from '@forge/bridge';
import api, { route } from "@forge/api";

function App() {
  const [updateDataForge, setUpdateDataForge] = useState('');
  const [app, setApp] = useState('');
  const [mod, setMod] = useState('');
  const [version, setVersion] = useState('');
  const [key, setKey] = useState('');

  async function fetchData() {  
    let updateData = `{"fields":{
  `
    let context = await view.getContext();
    setKey(context.extension.request.key);
    
    let fields = context.extension.request.properties.value.fields
    console.log(fields);
    for (var field of fields) {
      updateData += `"${field.key}":"${field.value}",`
      switch (field.key) {
        case "customfield_10059":
          setApp(field.value);
          break;
        case "customfield_10060":
          setMod(field.value);
          break;
        case "customfield_10061":
          setVersion(field.value);
          break;
      }
    }
    updateData += `
    }
  }`
    setUpdateDataForge(updateData);
    console.log(updateData);
    return updateData;
  }


  



async function functionEdit(){
  invoke ("UpdateData",{key: {key},data: {updateDataForge}}).then(console.log);
}

useEffect(() => {
  fetchData();
}, []);




  return (
    <div>
      <h2>Context</h2>
      <button onClick={fetchData}>Get Context</button>
      <button onClick={functionEdit}>Edit the issue </button>
      
      
      {/* <input type="text">{updateDataForge}</input> */}
      <h3>App</h3>
      <input disabled type="text" id="nApp" name="lname" value={app}></input>
      <h3>Module</h3>
      <input disabled type="text" id="nApp" name="lname" value={mod}></input>
      <h3>Version</h3>
      <input disabled type="text" id="nApp" name="lname" value={version}></input>
      
    </div>
  );
}

export default App;
