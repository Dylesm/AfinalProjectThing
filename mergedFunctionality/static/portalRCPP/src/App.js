import React, { useEffect, useState, Fragment,useCallback} from 'react';
import debounce from 'lodash/debounce';
import { invoke, view } from '@forge/bridge';
import styled from 'styled-components';
import Form, {Field, ErrorMessage} from '@atlaskit/form';
import Textfield from '@atlaskit/textfield';
import { RadioGroup } from '@atlaskit/radio';
import { Box } from '@atlaskit/primitives';
import { OptionsPropType } from '@atlaskit/radio/types';
import { set } from 'lodash';
const Content = styled.div`
  overflow: hidden;
`;

const CUSTOM_FIELD_NAME = 'Custom Field';
const MIN_LENGTH_LIMIT = 5


//@TODO make the module part dissapear while an app without 

function App() {

  const [userAcountId, setUserAccountId] = useState(""); //user account ids
  const [moduleVisible, setModuleVisible] = useState(false); //module visibility
  const [currentModule, setCurrentModule] = useState([]); //current module
  const [fieldData, setField] = useState({});
  const [optionsApps, setOptionsApps] = useState([]);
  const [error, setError] = useState({});




  /**
   * Fetches access data of the user by invoking the 'fetchAccess' function with the provided ID.
   * @param {number} id - The ID of the data to fetch.
   * @returns {Promise<Object>} - A promise that resolves to the fetched data.
   */
  const fetchData = async (id) => {
    let context = await view.getContext();  
    console.log(context);
    
    let qry = await invoke('fetchAccess', {id: {id}});
    return await JSON.parse(qry);
  }

  /**
   * Populates the apps array with data.
   * @param {Object} datas - The data object containing the access information.
   */
  function populateApps(datas){
    let apps = [];
    for (let key of datas.access) {
      //custom field made in JSM to display the relevant App
      apps.push({name: 'customfield_10050', value: key, label: key});
    }
    setOptionsApps(apps);
  }


  useEffect(() => {
    invoke("getOrgDetails")
    async function fetchDataAndPopulateApps() {
      const userId =  (await view.getContext()).accountId;
      setUserAccountId(userId);
      const dataToPop = await fetchData(1001);
      await populateApps(dataToPop);
      const userIds =  await invoke('getOrgs');
      console.log(JSON.parse(userIds));
    }
    fetchDataAndPopulateApps();
  }, []);

  /**
   * Validates custom fields based on the provided parameters.
   *
   * @param {Object} options - The options object.
   * @param {string} options.fieldName - The name of the field to validate.
   * @param {string} options.fieldValue - The value of the field to validate.
   * @param {number} options.minLength - The minimum length required for the field value.
   * @returns {boolean} - Returns true if the field is valid, false otherwise.
   */
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

  const debounceOnChange = debounce(({name, value}) => onInputChangeHandler({name, value}), 400);

  /**
   * Validates radio fields.
   *
   * @param {Object} options - The options object.
   * @param {string} options.fieldName - The name of the field.
   * @param {string} options.fieldValue - The value of the field.
   * @returns {boolean} - Returns true if the validation passes, false otherwise.
   */
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

  const ModulesField = 'customfield_10051'

  const StackModules = [
    { name: ModulesField, value: 'Bookings', label: 'Bookings' },
    { name: ModulesField, value: 'Relations', label: 'Relations' },
    { name: ModulesField, value: 'Master Data', label: 'Master Data' },
    { name: ModulesField, value: 'Truck planning', label: 'Truck planning' },
    { name: ModulesField, value: 'Yard Managment', label: 'Yard Managment' },
    { name: ModulesField, value: 'Stock Containers', label: 'Stock Containers' },
    { name: ModulesField, value: 'Inbox', label: 'Inbox' },
    { name: ModulesField, value: 'Outbox', label: 'Outbox' }
  ];
  const BosModules = [
    { name: ModulesField, value: 'Cargo Planning', label: 'Cargo Planning' },
    { name: ModulesField, value: 'Charters', label: 'Charters' },
    { name: ModulesField, value: 'Control tower', label: 'Control tower' },
    { name: ModulesField, value: 'Core', label: 'Core' },
    { name: ModulesField, value: 'Inbox', label: 'Inbox' },
    { name: ModulesField, value: 'Outbox', label: 'Outbox' },
    { name: ModulesField, value: 'Invoicing', label: 'Invoicing' },
    { name: ModulesField, value: 'Location Planning', label: 'Location Planning' }
  ];


  /**
   * Populates modules based on the provided app name.
   * @param {string} app - The name of the app.
   * @returns {string} - The result of the module population.
   */
  function populateModules(app){
    switch (app) {
      case 'Stack':
        setModuleVisible(true);
        setCurrentModule(StackModules);
        return "STACKED"
      case 'Bos':
        setModuleVisible(true);
        setCurrentModule(BosModules);
        return "BOSSED"
      default:
        //onRadioChangeHandler({name: 'customfield_10051', value: "clear"});
        setModuleVisible(false);
    }
  }


  return (
      <Content>
        <Form>
          {({formProps}) => (
              <form {...formProps}>
                <Box>
                  <h3>App</h3>
                  <RadioGroup
                      label="Apps"
                      options={optionsApps}
                      onChange={(event)=>{populateModules(event.target.value); ;debounceRadioOnChange({name: event.target.name, value: event.target.value})}}/>
                </Box>
                {moduleVisible &&  <Box>
                  <h3>Modules</h3>
                  <RadioGroup
                      label="Modules"
                      options={currentModule}
                      onChange={(event)=>{debounceRadioOnChange({name: event.target.name, value: event.target.value})}}/>
                </Box> }

                <Field label='Version' name="customfield_10052">
                  {({fieldProps}) => (
                      <Fragment>
                        <Textfield
                            {...fieldProps}
                            placeholder="Input version of your app"
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
