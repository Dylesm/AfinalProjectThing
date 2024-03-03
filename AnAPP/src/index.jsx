import ForgeUI, {render,useEffect, Fragment, Text, Button, PortalSubheader, Form, TextField, Checkbox, CheckboxGroup} from '@forge/ui';
import api from '@forge/api';
const userID = "1001"
    

    

    
       

    // ...
    async function getRequester() {
        const response = await api.fetch('http://deonysus.student.utwente.nl:5867/', {
        method: 'GET',
    });
    console.log(response); // 200
    }
    const formData = {
        username: '',
        products: []
    };

    const App = () => {

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
                    <TextField name="username" label="Username" value={formData.username} onChange={(value) => formData.username = value} />
                    <CheckboxGroup name="products" label="Products" value={formData.products} onChange={(value) => formData.products = value}>
                        <Checkbox defaultChecked value="jira" label="Jira" />
                        <Checkbox value="confluence" label="Confluence" />
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
