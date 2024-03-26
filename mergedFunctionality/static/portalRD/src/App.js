import React, { useEffect, useState } from 'react';
import { invoke, view } from '@forge/bridge';
import api, { route } from "@forge/api";

function App() {
  
  const [updateDataForge, setUpdateDataForge] = useState('');
  const [app, setApp] = useState('');
  const [mod, setMod] = useState('');
  const [version, setVersion] = useState('');
  const [key, setKey] = useState('');

  /**
   * Fetches data and updates the state variables.
   * @summary Adjust the custom field names to match the ones in your Jira instance.
   * @returns {Promise<string>} The updated data.
   */
  async function fetchData() {  
    let updateData = `{"fields":{`
    let context = await view.getContext();
    console.log(context)
    setKey(context.extension.request.key);
    let fields = context.extension.request.properties.value.fields
    for (var field of fields) { 
      switch (field.key) {
        case "customfield_10059":
          setApp(field.value);
          updateData += `"${field.key}":{"value":"${field.value}"},`
          break;
        case "customfield_10062":
          setMod(field.value);
          updateData += `"${field.key}":{"value":"${field.value}"},`
          break;
        case "customfield_10061":
          setVersion(field.value);
          updateData += `"${field.key}":"${field.value}"`
          break;
      }
    }
    updateData += `}}`
    setUpdateDataForge(updateData);
    return updateData;
  }


  



/**
 * Invokes Update Data from index, updates newly created issue with custom fields
 * @async
 * @function functionEdit
 * @returns {Promise<void>} A promise that resolves when the data is updated.
 */
async function updateIssue(){
  invoke ("UpdateData",{key: {key},data: {updateDataForge}});
}

useEffect(() => {
  fetchData();
}, []);




  return (
    <div>
      <h2>Context</h2>
      <button onClick={fetchData}>Get Context</button>
      <button onClick={updateIssue}>Edit the issue </button>
      <h3>App</h3>
      <input disabled type="text"  class="display" id="nApp" name="lname" value={app}></input>
      <h3>Module</h3>
      <input disabled type="text"  class="display" id="nApp" name="lname" value={mod}></input>
      <h3>Version</h3>
      <input disabled type="text"  class="display" id="nApp" name="lname" value={version}></input>
      
    </div>
  );
}

export default App;
