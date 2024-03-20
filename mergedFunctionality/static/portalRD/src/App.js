import React, { useEffect, useState } from 'react';
import { invoke, view } from '@forge/bridge';
import api, { route } from "@forge/api";

function App() {
  async function fetchData() {  
    const context = await view.getContext().then(console.log);
    return context;
  }

  // This sample uses Atlassian Forge
// https://developer.atlassian.com/platform/forge/

async function functionEdit(){
  invoke ("UpdatePlease",{key: "value"}).then(console.log);


}






  return (
    <div>
      <h1>Context</h1>
      <button onClick={fetchData}>Get Context</button>
      <button onClick={functionEdit}>Editthe issue </button>
    </div>
  );
}

export default App;
