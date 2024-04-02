import Resolver from '@forge/resolver';
const fetch = require('node-fetch');
import api, { route } from "@forge/api";
import { text } from 'express';
// EDGE case perosn not in org
const resolver = new Resolver();

const api_token = 'b.p.geugies@student.utwente.nl:ATATT3xFfGF0wzAc7O6GF6SiuWPFEb_eYw6IX9ldKWZLkS83xnMw1nKZzd4kWH72xyV8o6VxYu7x7KyrqIJP8-WKu26kQ-_RQ8GY-ea4WvEHgZ4yZHISb6kF8VfdQDD0Lw7aCzp_XWUXmne1rku1wBhsF1NpSnqeLhkOlGDY5m9dxyKzM64PqD4=6350B172'

resolver.define('UpdateData', async (req) => {
    let key = req.payload.key.key;
    

    let updatedData = req.payload.data.data;

    await fetch(`https://bitincdev.atlassian.net/rest/api/2/issue/${key}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Basic ${Buffer.from(
                api_token
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




async function getAllOrgs() {
    try {
        const response = await fetch('https://bitincdev.atlassian.net/rest/servicedeskapi/organization', {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${Buffer.from(
                    api_token
                ).toString('base64')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        console.log(`Response: ${response.status} ${response.statusText}`);
        const text = await response.text();
        return text

    } catch (err) {
        console.error(err);
    }
}async function getOrgDetails(orgId) {
    try {
        const response = await fetch(`https://api.atlassian.com/jsm/csm/cloudid/8385de58-2977-4a3d-98c3-937a2d659fc3/api/v1/organization/${orgId}`, {
            method: 'GET',
            headers: {'Authorization': `Basic ${Buffer.from(
                    api_token
                ).toString('base64')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        console.log(`Response: ${response.status} ${response.statusText}`);
        
        const text = await response.text();
        return text

    } catch (err) {
        console.error(err);
    }
}




/**
 * Finds the key in a Map object that corresponds to the given value.
 *
 * @param {Map} map - The Map object to search in.
 * @param {*} value - The value to search for.
 * @returns {*} The key that corresponds to the given value, or undefined if not found.
 */
function findKeyForValueInMap(map, value) {
    for (var [key, val] of map.entries()) {
        if (val.includes(value)) {
            return key;
        }
}
}

/**
 * Retrieves the users in the specified organization.
 * @param {string} orgId - The ID of the organization.
 * @returns {Promise<string>} - A promise that resolves to the response text.
 */
async function getUsersInOrg(orgId) {
    
    try {
        const response = await fetch(`https://bitincdev.atlassian.net/rest/servicedeskapi/organization/${orgId}/user`, {
            method: 'GET',
            headers: {'Authorization': `Basic ${Buffer.from(
                    api_token
                ).toString('base64')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        console.log(`Response: ${response.status} ${response.statusText}`);
        const text = await response.text();
        return text
    } catch (err) {
        console.error(err);
    }
}



resolver.define("getOrgs", async (req) => {
    
    let userId = req.context.accountId;
    
    let orgUserMap = new Map();
    let orgs = await getAllOrgs();
    orgs = JSON.parse(orgs);
    for (var org of orgs.values) {
        let users = await getUsersInOrg(org.id);
        users = JSON.parse(users);
        let userIds = [];
        for (var user of users.values) {
            userIds.push(user.accountId);
        }
        orgUserMap.set(org.id, userIds);
    }

    const orgId = findKeyForValueInMap(orgUserMap, userId);
    let orgData = await getOrgDetails(await orgId);

    orgData = JSON.parse(orgData);
    
    const detailList = orgData.details[0].values[0].split(", ");

    const result = {
        access: detailList
    };

    return result;
})



export const handler = resolver.getDefinitions();