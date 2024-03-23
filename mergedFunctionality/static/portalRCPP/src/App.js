import React, { useEffect, useState, Fragment,useCallback} from 'react';
import debounce from 'lodash/debounce';
import { invoke, view } from '@forge/bridge';
import styled from 'styled-components';
import Form, {Field, ErrorMessage} from '@atlaskit/form';
import Textfield from '@atlaskit/textfield';
import { RadioGroup } from '@atlaskit/radio';
import { Box } from '@atlaskit/primitives';
import { OptionsPropType } from '@atlaskit/radio/types';
const Content = styled.div`
  overflow: hidden;
`;

const CUSTOM_FIELD_NAME = 'Custom Field';
const MIN_LENGTH_LIMIT = 5

function App() {


  const [fieldData, setField] = useState({});
  const [optionsApps, setOptionsApps] = useState([]);
  const [error, setError] = useState({});

  const fetchData = async (id) => {
    let qry = await invoke('fetchAccess', {id: {id}}).then(console.log)
  }



  let hardData = {
    "1001":{"access":["Stack","Hipo"]},
    "1002":{"access":["Asset","Bos"]},
    "1003":{"access":["Vast","Customer"]},
    "1004":{"access":["Stack"]}
  }


  function populateApps(datas){
    console.log(datas);

    for (let key of datas.access) {
      console.log(key);
      optionsApps.push({name: 'customfield_10059', value: key, label: key});
    }



  }







  // async function fetchData() {
  //   let data = await api.fetch(
  //       'https://bartgeugies.com', {
  //           method: 'GET'
  //       }
  //   )
  //       .then(async response => {
  //         await console.log(
  //             `Response: ${response.status} ${response.statusText}`
  //         );
  //         return response.text();
  //       })
  //       .then(async text => await console.log(text))
  //       .catch(async err => await console.error(err));

  //   return data
  // }

  useEffect(() => {
    populateApps(hardData[1001]);
    fetchData(1001);
  }, []);

  const validateCustomFields = ({fieldName, fieldValue, minLength}) => {
    console.log(optionsApps);
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
      console.log(formData);
    } catch (errorTrace) {
      console.log("Couldn't save custom field : ", errorTrace);
    }
  }

  const debounceOnChange = debounce(({name, value}) => onInputChangeHandler({name, value}), 400);





  const validateRadioFields = ({fieldName, fieldValue}) => {
    if (fieldName === 'radio-default' || fieldName === 'radio-disabled') {
      const errorMsg = !fieldValue ? `Please select a value for "${fieldName}"` : undefined;
      setError({...error, [fieldName]: errorMsg});
      return !errorMsg;
    }
    return true;
  }

  const onRadioChangeHandler = ({name, value}) => {
    console.log(name, value);
    console.log(optionsApps);
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
    // check radio button validation
    isValid = validateRadioFields({
      fieldName: name,
      fieldValue: value
    }) && isValid;
    const formData = {
      fields,
      isValid,
    }
    // submit form data to forge bridge
    try {
      view.submit(formData);
      console.log(formData);
    } catch (errorTrace) {
      console.log("Couldn't save custom field : ", errorTrace);
    }
  }


  const debounceRadioOnChange = debounce(({name, value}) => onRadioChangeHandler({name, value}), 400);


  return (
      <Content>
        <Form>
          {({formProps}) => (
              <form {...formProps}>
                <Box>
                  <RadioGroup
                      options={optionsApps}
                      onChange={(event)=>{debounceRadioOnChange({name: event.target.name, value: event.target.value})}}/>
                </Box>
                {/* <Field label="Apps" name="customfield_10059">
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
            </Field> */}
                <Field label="modules" name="customfield_10062">
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
                <Field label='Version' name="customfield_10061">
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
