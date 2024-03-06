import ForgeUI, {render,useEffect, Fragment, Text, Button, PortalSubheader, Form, TextField, Checkbox, CheckboxGroup, useState} from '@forge/ui';
import api,{ route } from '@forge/api';
const userID = 1001;
    

    

    
       

    

    const App = () => {


        const [Stack, setStack] = useState(false);
        const [Hipo, setHipo] = useState(false);
        const [Asset, setAsset] = useState(false);
        const [bos, setBos] = useState(false);
        const [Vast, setVast] = useState(false);
        const [Customer, setCustomer] = useState(false);

        const [username, setUsername] = useState('');
        const [products, setProducts] = useState([]);
        const [showText, setShowText] = useState(true);

    
        
        
        
        



        
        let variable = true
        async function createIssue(){

   
        }



// This sample uses Atlassian Forge
// https://developer.atlassian.com/platform/forge/


var bodyData = `{
  "fields": {
    "assignee": {
      "id": "5b109f2e9729b51b54dc274d"
    },
    "components": [
      {
        "id": "10000"
      }
    ],
    "customfield_10000": "09/Jun/19",
    "customfield_20000": "06/Jul/19 3:25 PM",
    "customfield_30000": [
      "10000",
      "10002"
    ],
    "customfield_40000": {
      "content": [
        {
          "content": [
            {
              "text": "Occurs on all orders",
              "type": "text"
            }
          ],
          "type": "paragraph"
        }
      ],
      "type": "doc",
      "version": 1
    },
    "customfield_50000": {
      "content": [
        {
          "content": [
            {
              "text": "Could impact day-to-day work.",
              "type": "text"
            }
          ],
          "type": "paragraph"
        }
      ],
      "type": "doc",
      "version": 1
    },
    "customfield_60000": "jira-software-users",
    "customfield_70000": [
      "jira-administrators",
      "jira-software-users"
    ],
    "customfield_80000": {
      "value": "red"
    },
    "description": {
      "content": [
        {
          "content": [
            {
              "text": "Order entry fails when selecting supplier.",
              "type": "text"
            }
          ],
          "type": "paragraph"
        }
      ],
      "type": "doc",
      "version": 1
    },
    "duedate": "2019-05-11",
    "environment": {
      "content": [
        {
          "content": [
            {
              "text": "UAT",
              "type": "text"
            }
          ],
          "type": "paragraph"
        }
      ],
      "type": "doc",
      "version": 1
    },
    "fixVersions": [
      {
        "id": "10001"
      }
    ],
    "issuetype": {
      "id": "10000"
    },
    "labels": [
      "bugfix",
      "blitz_test"
    ],
    "parent": {
      "key": "PROJ-123"
    },
    "priority": {
      "id": "20000"
    },
    "project": {
      "id": "10000"
    },
    "reporter": {
      "id": "5b10a2844c20165700ede21g"
    },
    "security": {
      "id": "10000"
    },
    "summary": "Main order flow broken",
    "timetracking": {
      "originalEstimate": "10",
      "remainingEstimate": "5"
    },
    "versions": [
      {
        "id": "10000"
      }
    ]
  },
  "update": {}
}`;

async function hello(){
const response = await api.asUser().requestJira(route`/rest/api/3/issue`, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: bodyData
});

console.log(`Response: ${response.status} ${response.statusText}`);
console.log(await response.json());

}


        //     const response = await api.fetch('https://bitinc.atlassian.net/rest/api/3/issue', {
        //     method: 'POST',
        //     headers: {
        //         'Authorization': `Basic ${Buffer.from(
        //           'bitinc2024@gmail.com:ATATT3xFfGF0McuJY1uJEX1woSYKY-R_eL9Cpw4x8SbqTqWIs-j0LgyPMnlvdJlkudQwX7Kfwr3ua40fTayWVHoTw1BAEi7bpheEBIgwh2bUa-mymJwT9dfS0VQZ-9lc8Cq6Xidgzkgpx0l-5B4e7RK_tHM7RAcuPkdOQluOEeDf2EbJW4jsy6w=39938EE4'
        //         ).toString('base64')}`,
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //       },
        //     body: {"fields": {
        //               "assignee": {
        //                 "id": "5b109f2e9729b51b54dc274d"
        //               }
        //     }},
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // });
        //     let data = await response.json();
        //     console.log(data);
        // }

        
        async function getRequester() {
            const response = await api.fetch('https://bartgeugies.com/', {
            method: 'GET',
        });
            let data = await response.json();
            //console.log(data[userID]["access"]);
            for (let i of data[userID]["access"]){
                switch(i){
                    case "Stack":
                        setStack(true);
                        break;
                    case "Hipo":
                        setHipo(true);
                        break;
                    case "Asset":
                        setAsset(true);
                        break;
                    case "Bos":
                        setBos(true);
                        break;
                    case "Vast":
                        setVast(true);
                        break;
                    case "Customer":
                        setCustomer(true);
                        break;
                }
                
                    

        }
    }
        
        const formData = {
            username: '',
            products: []
        };



        useEffect(() => {
            getRequester();
           // console.log("this is a test");
        }, []);

        const handleFormSubmit = (formData) => {
           // console.log(formData); // This will log the form data when the form is submitted
        };
        return (
            <Fragment>
                <Text>This is my app! i have no idea if this works</Text>
                <Button text="CLICK" onClick={hello}/>
                
                <Text>Hello this is a text</Text>
                {showText && <Text>Hello this is a text</Text>}
                <Form onSubmit={handleFormSubmit}>
                    <TextField id="hello" name="username" label={username} value={username} onChange={setUsername} />
                    <CheckboxGroup name="products" label="Products" children={products} onChange={setProducts} >
                        {Stack && <Checkbox value="confluence" label="Stack" />}
                        {Hipo && <Checkbox value="confluence" label="Hipo" />}
                        {Asset && <Checkbox value="confluence" label="Asset management" />}        
                        {bos && <Checkbox value="confluence" label="BOS" />}
                        {Vast && <Checkbox value="confluence" label="Vast" />}
                        {Customer && <Checkbox value="confluence" label="CustomerPortal" />}
                        
                    </CheckboxGroup>
                    
                </Form>
                
            </Fragment>
        );
    };




export const run = render(
    
    <PortalSubheader>
        <App />
    </PortalSubheader>
);
