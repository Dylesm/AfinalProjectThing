import Resolver from '@forge/resolver';
const fetch = require('node-fetch');
import api, { route } from "@forge/api";
import { text } from 'express';

const resolver = new Resolver();

resolver.define('UpdateData', async (req) => {
    let key = req.payload.key.key;
    //console.log(key);

    let updatedData = req.payload.data.updateDataForge;
    //console.log(updatedData);
    var bodyData = `{
      "fields": {
        "customfield_10061":"my new description",
        "customfield_10059": {"value":"Stack"},
        "customfield_10062": {"value":"Linus"}
      }
    }`;

    await fetch(`https://bitinc.atlassian.net/rest/api/2/issue/${key}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Basic ${Buffer.from(
                'bitinc2024@gmail.com:ATATT3xFfGF0McuJY1uJEX1woSYKY-R_eL9Cpw4x8SbqTqWIs-j0LgyPMnlvdJlkudQwX7Kfwr3ua40fTayWVHoTw1BAEi7bpheEBIgwh2bUa-mymJwT9dfS0VQZ-9lc8Cq6Xidgzkgpx0l-5B4e7RK_tHM7RAcuPkdOQluOEeDf2EbJW4jsy6w=39938EE4'
            ).toString('base64')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: updatedData
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

resolver.define('fetchAccess', async (req) => {
    let id = req.payload.id.id;
    let dataqr;
    //console.log(id)
    let data = await api.fetch(
        `https://bartgeugies.com/data?id=${id}`, {
            method: 'GET'
        }
    )
        .then(async response => {
            await console.log(
                `Response: ${response.status} ${response.statusText}`
            );
            dataqr = response.text();
            
        })
        .then(async text => console.log(text))
        .catch(async err => await console.error(err));
    
    console.log(await dataqr, "here");
    return await dataqr;
    
})

export const handler = resolver.getDefinitions();