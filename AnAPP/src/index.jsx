import ForgeUI, {render,useEffect, Fragment, Text, Button, PortalSubheader, Form, TextField, Checkbox, CheckboxGroup, useState} from '@forge/ui';
import api from '@forge/api';
const userID = "1001"
    

    

    
       

    // ...
    

    const App = () => {
        const [username, setUsername] = useState('');
        const [products, setProducts] = useState([]);

        async function getRequester() {
            const response = await api.fetch('https://bartgeugies.com/', {
            method: 'GET',
        });
        
            await setUsername("Bart");
            console.log( await response.json());

            const boxes = [<Checkbox value="confluence" label="conclufecnce" />];
        
            setProducts(boxes);

        
            console.log(products)
        

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
                <Form onSubmit={handleFormSubmit}>
                    <TextField id="hello" name="username" label={username} value={username} onChange={setUsername} />
                    <CheckboxGroup name="products" label="Products" children={products} onChange={setProducts} >
                        
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
