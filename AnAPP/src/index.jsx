import ForgeUI, {render,useEffect, Fragment, Text, Button, PortalSubheader, Form, TextField, Checkbox, CheckboxGroup, useState} from '@forge/ui';
import api from '@forge/api';
const userID = "1001"
    

    

    
       

    // ...
    

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

        const test = ['test1', 'test2']
        
        
        
        

        let variable = true
        async function getRequester() {
            const response = await api.fetch('https://bartgeugies.com/', {
            method: 'GET',
        });
            let data = await response.json();
            
            const boxes = data[userID]['access'].map((i) => {
                switch (i) {
                    case "Stack":
                        return <Checkbox value="Stack" label="Stack" />;
                    case "Hipo":
                        return <Checkbox value="Hipo" label="Hipo" />;
                    case "Asset":
                        return <Checkbox value="Asset" label="Asset" />;
                    case "Bos":
                        return <Checkbox value="Bos" label="Bos" />;
                    case "Vast":
                        return <Checkbox value="Vast" label="Vast" />;
                    case "Customer":
                        return <Checkbox value="Customer" label="Customer" />;
                    default:
                        return null;
                }
            });

            setProducts(boxes);;
            setShowText(!showText);
        
            
        

        }
        
        async function testFunc() {
            return test[0]
        }
        
        const formData = {
            username: '',
            products: []
        };



        useEffect(() => {
            getRequester();
            console.log("this is a test");
        }, []);

        const handleFormSubmit = (formData) => {
            console.log(formData); // This will log the form data when the form is submitted
        };
        return (
            <Fragment>
                <Text>This is my app! i have no idea if this works</Text>
                <Button text="CLICK" onClick={getRequester}/>
                
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
