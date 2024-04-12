import React, { useEffect, useState } from 'react';
import { invoke, view } from '@forge/bridge';
import api, { route } from "@forge/api";
import { AppsField, ModuleField, VersionField } from './config';

function App() {
  
  const [updateDataForge, setUpdateDataForge] = useState('');
  const [app, setApp] = useState('');
  const [mod, setMod] = useState('');
  const [version, setVersion] = useState('');
  const [key, setKey] = useState('');
  const [modVisibility, setModVisibility] = useState(false);
  const [headerStyle, setHeaderStyle] = useState({fontSize:"1.2em", color:"#636363",backgroundColor:"#e6e6e6", fontWeight:"550",paddingBottom: '4px',alignItems: "center", textAlign:"center", verticalAlign:"middle",height:'1.2em',paddingBottom:'4px',paddingTop:'4px', width:'100%',borderRadiusLeft:'0px',  })
  const [inputStyle, setInputStyle] = useState({backgroundColor:"#FFFFFF",height:'1.2em',paddingBottom:'4px',borderBottomRightRadius:"4px",borderBottomLeftRadius:"4px",paddingTop:'4px', fontSize:"1em", color:"black", fontWeight:"520",borderRadiusLeft:'4px', width:"fit-content",borderWidth:'0px',borderTop:'2px solid  #0074e0', textAlign:"center", verticalAlign:"middle"})
  const [boxStyle, setBoxStyle] = useState({display: 'flex', flexDirection: 'column', margin: '0', padding: 0, justifyContent: "space-around", alignItems: "center", border:'2px solid  #DFE1E6', borderRadius:"4px"})
  
  
  
  /**
   * Fetches data and updates the state variables.
   * @summary Adjust the custom field names to match the ones in your Jira instance.
   * @returns {Promise<string>} The updated data.
   */
  async function fetchData() {  
    let updateData = `{"fields":{`
    let context = await view.getContext();
    let key = context.extension.request.key;
    setKey(context.extension.request.key);
    let fields = context.extension.request.properties.value.fields
    for (var field of fields) { 
      switch (field.key) {
        case AppsField:
          setApp(field.value);
          updateData += `"${field.key}":"${field.value}",`
          break;
        case ModuleField:
          if (field.value!= "") {
            console.log(field.value)
            setModVisibility(true);
            setMod(field.value);
            updateData += `"${field.key}":"${field.value}",`
          }
          
          break;
        case VersionField:
          setVersion(field.value);
          updateData += `"${field.key}":"${field.value}"`
          break;
      }
    }
    updateData += `}}`
    
    //setUpdateDataForge(updateData);
    setUpdateDataForge(updateData);
    setKey(key);
    return [updateData, key];
  }


/**
 * Invokes Update Data from index, updates newly created issue with custom fields
 * @async
 * @function functionEdit
 * @returns {Promise<void>} A promise that resolves when the data is updated.
 */
async function updateIssue(data,key){
  invoke ("UpdateData",{key: {key},data: {data}});
}

useEffect(() => {
  async function pageSetUp() {
    let  data  = await fetchData()
    let processedData = data[0]
    let keyS = data[1]
    await updateIssue(processedData, keyS);

    
  }

  pageSetUp(); 
}, []);

  return (
    <div style={{display:'flex', flexdDirection: 'row',justifyContent: "space-around"}}>
      <div style={boxStyle}>
        <h3 style={headerStyle} >App</h3>
        <input style={inputStyle} disabled type="text"  id="nApp" name="lname" value={app}></input>
      </div>
      
      {modVisibility && <div style={boxStyle}>
        <h3 style={headerStyle} >Module</h3>
        <input style={inputStyle} disabled type="text"  id="nApp" name="lname" value={mod}></input>
      </div>}
      
      <div style={boxStyle}>
      <h3 style={headerStyle} >Version</h3>
      <input style={inputStyle}  disabled type="text"  id="nApp" name="lname" value={version}></input> 
     </div>
      
      
    </div>
  );
}




export default App;
