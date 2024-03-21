import React, {useState, Fragment} from 'react';
import debounce from 'lodash/debounce';
import {view} from '@forge/bridge';
import styled from 'styled-components';
import Form, {Field, ErrorMessage} from '@atlaskit/form';
import Textfield from '@atlaskit/textfield';

const Content = styled.div`
  overflow: hidden;
`;

const CUSTOM_FIELD_NAME = 'Custom Field';
const MIN_LENGTH_LIMIT = 5;

function App() {
  const [fieldData, setField] = useState({});
  const [error, setError] = useState({});

  const [Stack, setStack] = useState(false);
  const [Hipo, setHipo] = useState(false);
  const [Asset, setAsset] = useState(false);
  const [bos, setBos] = useState(false);
  const [Vast, setVast] = useState(false);
  const [Customer, setCustomer] = useState(false);

  const [username, setUsername] = useState('');
  const [products, setProducts] = useState([]);
  const [showText, setShowText] = useState(true);


  const validateCustomFields = ({fieldName, fieldValue, minLength}) => {
    if (fieldName === CUSTOM_FIELD_NAME) {
      const errorMsg = !fieldValue || fieldValue.length < minLength ? `Please provide a value for required field "${fieldName}"` : undefined;
      setError({...error, [fieldName]: errorMsg});
      return !errorMsg;
    }
    return true;
  }

  const onInputChangeHandler = ({name, value}) => {
    const newFieldData = !!name ? {...fieldData, [name]: value} : fieldData;
    setField(newFieldData);
    const fields = [];
    let isValid = true;

    // manipulate form fields
    for (const property in newFieldData) {
      fields.push({key: property, value: newFieldData[property]});

      // check form validation
      isValid = validateCustomFields({
        fieldName: property,
        fieldValue: newFieldData[property],
        minLength: MIN_LENGTH_LIMIT
      }) && isValid;
    }



    const formData = {
      fields,
      isValid,
    }

    // submit form data to forge bridge
    try {
      view.submit(formData);
    } catch (errorTrace) {
      console.log("Couldn't save custom field : ", errorTrace);
    }
  }

  async function getRequester() {
    const response = await api.fetch('https://bartgeugies.com/', {
      method: 'GET',
    });

    console.log(response)
    let data = await response.json();
    //console.log(data[userID]["access"]);
    for (let i of data[userID]["access"]) {
      switch (i) {
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

  getRequester()

  const debounceOnChange = debounce(({name, value}) => onInputChangeHandler({name, value}), 400);

  return (
    <Content>
      <Form>
        {({formProps}) => (
          <form {...formProps}>
            <Field label={CUSTOM_FIELD_NAME} name={CUSTOM_FIELD_NAME}>
              {({fieldProps}) => (
                <Fragment>
                  <Textfield
                    {...fieldProps}
                    placeholder="Enter value"
                    onChange={(event) => debounceOnChange({name: event.target.name, value: event.target.value})}
                  />
                  {error && error[CUSTOM_FIELD_NAME] && <ErrorMessage>{error[CUSTOM_FIELD_NAME]}</ErrorMessage>}
                </Fragment>
              )}
            </Field>
            <Field label='Field2_Label' name='Field2_Name'>
              {({fieldProps}) => (
                  <Fragment>
                    <Textfield
                        {...fieldProps}
                        placeholder="Field2_Value"
                        onChange={(event) => debounceOnChange({name: event.target.name, value: event.target.value})}
                    />
                    {error && error[CUSTOM_FIELD_NAME] && <ErrorMessage>{error[CUSTOM_FIELD_NAME]}</ErrorMessage>}
                  </Fragment>
              )}
            </Field>
          </form>
        )}
      </Form>
    </Content>

  );
}

export default App;
