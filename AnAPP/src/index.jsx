import ForgeUI, {render, Fragment, Text, Button, PortalSubheader, Form, TextField, Checkbox, CheckboxGroup} from '@forge/ui';

const App = () => {
    return (
        <Fragment>
            <Text>This is my app! i have no idea if this works</Text>
            <Button text="CLICK"/>
            <Text>This is my app! i have no idea if this works</Text>
            <Form >
                <TextField name="username" label="Username" />
                <CheckboxGroup name="products" label="Products">
                <Checkbox defaultChecked value="jira" label="Jira" />
                <Checkbox value="confluence" label="Confluence" />
                </CheckboxGroup>
            </Form>
            <Text>This is my app! i have no idea if this works</Text>
            <Button text="CLICK"/>
        </Fragment>
    );
};

export const run = render(
    <PortalSubheader>
        <App/>
    </PortalSubheader>
);
