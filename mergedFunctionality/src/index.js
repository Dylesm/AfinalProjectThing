import Resolver from '@forge/resolver';
const fetch = require('node-fetch');
import api, { route } from "@forge/api";
import { text } from 'express';

const resolver = new Resolver();

const api_token = 'b.p.geugies@student.utwente.nl:ATATT3xFfGF0wzAc7O6GF6SiuWPFEb_eYw6IX9ldKWZLkS83xnMw1nKZzd4kWH72xyV8o6VxYu7x7KyrqIJP8-WKu26kQ-_RQ8GY-ea4WvEHgZ4yZHISb6kF8VfdQDD0Lw7aCzp_XWUXmne1rku1wBhsF1NpSnqeLhkOlGDY5m9dxyKzM64PqD4=6350B172'

resolver.define('UpdateData', async (req) => {
    let key = req.payload.key.key;
    //console.log(key);

    let updatedData = req.payload.data.updateDataForge;


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
    const orgUserMapJson = JSON.stringify(Array.from(orgUserMap.entries()), null, 2);
    return orgUserMapJson;


})



export const handler = resolver.getDefinitions();