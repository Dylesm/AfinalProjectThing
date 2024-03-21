import Resolver from '@forge/resolver';
const fetch = require('node-fetch');

import api, { route } from "@forge/api";
const resolver = new Resolver();
resolver.define('UpdateData', async (req) => {
  console.log(req.payload);
    var bodyData = `{
      "fields": {
        "customfield_10061":"my new description",
        "customfield_10059": {"value":"Stack"},
        "customfield_10062": {"value":"Linus"}
        
      }
    }`;

    await fetch('https://bitinc.atlassian.net/rest/api/2/issue/BIT-58', {
    method: 'PUT',
    headers: {
      'Authorization': `Basic ${Buffer.from(
        'bitinc2024@gmail.com:ATATT3xFfGF0McuJY1uJEX1woSYKY-R_eL9Cpw4x8SbqTqWIs-j0LgyPMnlvdJlkudQwX7Kfwr3ua40fTayWVHoTw1BAEi7bpheEBIgwh2bUa-mymJwT9dfS0VQZ-9lc8Cq6Xidgzkgpx0l-5B4e7RK_tHM7RAcuPkdOQluOEeDf2EbJW4jsy6w=39938EE4'
      ).toString('base64')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: bodyData
  })
    .then(async response => {
      await console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.text();
    })
    .then(async text => await console.log(text))
    .catch(async err => await console.error(err));
  
  return "done";
  


  
    
});




export const handler = resolver.getDefinitions();