import ForgeUI, {render,useEffect, Fragment, Text, Button, PortalSubheader, Form, TextField, Checkbox, CheckboxGroup, useState} from '@forge/ui';
import api,{ route } from '@forge/api';
import fetch from 'node-fetch';
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

var bodyData = `{
  "fields": {
      "project": {
          "id": "10002"
      },
      "issuetype": {
          "id": "10009"
      },
      "summary": "created via Postman.",
      "description": {
          "type": "doc",
          "version": 1,
          "content": [
              {
                  "type": "paragraph",
                  "content": [
                      {
                          "type": "text",
                          "text": "description"
                      }
                  ]
              }
          ]
      }
  }
}`

async function connectionTry(){
  console.log("this is a test");
  await fetch('https://bitinc.atlassian.net/rest/api/3/issue', {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${Buffer.from(
      'bitinc2024@gmail.com:ATATT3xFfGF0McuJY1uJEX1woSYKY-R_eL9Cpw4x8SbqTqWIs-j0LgyPMnlvdJlkudQwX7Kfwr3ua40fTayWVHoTw1BAEi7bpheEBIgwh2bUa-mymJwT9dfS0VQZ-9lc8Cq6Xidgzkgpx0l-5B4e7RK_tHM7RAcuPkdOQluOEeDf2EbJW4jsy6w=39938EE4'
    ).toString('base64')}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: bodyData
})
  .then(response => {
    console.log(
      `Response: ${response.status} ${response.statusText}`
    );
    return response.text();
  })
  .then(text => console.log(text))
  .catch(err => console.error(err));
}





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
                <Button text="CLICK" onClick={connectionTry}/>
                
                <Text>Hello this is a text,dimi</Text>
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
