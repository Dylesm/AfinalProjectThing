import React, { useEffect, useState, Fragment,useCallback} from 'react';
import debounce from 'lodash/debounce';
import { invoke, view } from '@forge/bridge';
import styled from 'styled-components';
import Form, {Field, ErrorMessage} from '@atlaskit/form';
import Textfield from '@atlaskit/textfield';
import { RadioGroup } from '@atlaskit/radio';
import { Box, xcss } from '@atlaskit/primitives';
import { OptionsPropType } from '@atlaskit/radio/types';
import { set } from 'lodash';
import DropdownMenu, { DropdownItemRadioGroup, DropdownItemRadio } from '@atlaskit/dropdown-menu';

const Content = styled.div`
  overflow: hidden;
`;

const boxStyles = xcss({
  borderColor: 'color.border.discovery',
  borderRadius: 'border.radius',
  borderWidth: 'border.width',
  paddingBottom: '10px',
  paddingTop: '15px'
});

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
  const [selected, setSelected] = useState('detail'); // Assuming 'detail' is the default selection
  const [triggerLabel, setTriggerLabel] = useState('Apps'); // Default trigger label
  const [selectedModule, setSelectedModule] = useState('detail'); // Assuming 'detail' is the default selection
  const [triggerLabelModule, setTriggerLabelModule] = useState('Modules'); // Default trigger label


  /**
   * Populates the apps array with data.
   * @param {Object} datas - The data object containing the access information.
   */
  function populateApps(datas){
    let apps = [];
    for (let key of datas.access) {
      //custom field made in JSM to display the relevant App
      // apps.push({name: 'customfield_10050', value: key, label: key});
      apps.push({id: key, name: key});
    }
    setOptionsApps(apps);
  }


  useEffect(() => {
    async function fetchDataAndPopulateApps() {
      const apps =  await invoke('getOrgs');
      console.log(apps);
      await populateApps(apps);
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
    console.log('OnRadioChangeHandler Called')
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
        minLength: 1
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
    { id: 'Bookings', name: 'Bookings' },
    { id: 'Relations', name: 'Relations' },
    { id: 'Master Data', name: 'Master Data' },
    { id: 'Truck planning', name: 'Truck planning' },
    { id: 'Yard Managment', name: 'Yard Managment' },
    { id: 'Stock Containers', name: 'Stock Containers' },
    { id: 'Inbox', name: 'Inbox' },
    { id: 'Outbox', name: 'Outbox' }
  ];

  const BosModules = [
    { id: 'Cargo Planning', name: 'Cargo Planning' },
    { id: 'Charters', name: 'Charters' },
    { id: 'Control tower', name: 'Control tower' },
    { id: 'Core', name: 'Core' },
    { id: 'Inbox', name: 'Inbox' },
    { id: 'Outbox', name: 'Outbox' },
    { id: 'Invoicing', name: 'Invoicing' },
    { id: 'Location Planning', name: 'Location Planning' }
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
        debounceRadioOnChange({name: 'customfield_10051', value: ""});
        console.log("No modules found for app: ", app);
        console.log(fieldData);
        setModuleVisible(false);
    }
  }

  // Handle selection
  const handleOptionSelect = (optionId, optionName) => {
    setSelected(optionId);
    setTriggerLabel(optionName); // Update trigger label to reflect selected option
    debounceRadioOnChange({name: "customfield_10050", value: optionName});
    populateModules(optionName);
  };

  const handleModuleSelect = (optionId, optionName) => {
    setSelectedModule(optionId);
    setTriggerLabelModule(optionName); // Update trigger label to reflect selected option
    debounceRadioOnChange({name: "customfield_10051", value: optionName});
  };


  return (
      <Content>
        <Form>
          {({formProps}) => (
              <form {...formProps}>
                <Box xcss={boxStyles}>
                  <h5 style={{fontSize:"0.85em", color:"#6B778C", fontWeight:"600",paddingBottom: '4px'}}>Select App*</h5>
                  <DropdownMenu label='Select App' trigger={triggerLabel} >
                    <DropdownItemRadioGroup label='select app' id="customfield_10050" >
                      {optionsApps.map(option => (
                          <DropdownItemRadio
                              key={option.id}
                              id={option.id}
                              onClick={() => handleOptionSelect(option.id, option.name)}
                              isSelected={selected === option.id}
                          >
                            {option.name}
                          </DropdownItemRadio>
                      ))}
                    </DropdownItemRadioGroup>
                  </DropdownMenu>
                </Box >
                {moduleVisible && <Box xcss={boxStyles}>
                  <h5 style={{fontSize:"0.85em", color:"#6B778C", fontWeight:"600",paddingBottom: '4px'}} >Select Module*</h5>
                  <DropdownMenu trigger={triggerLabelModule}>
                    <DropdownItemRadioGroup id="customfield_10050">
                      {currentModule.map(option => (
                          <DropdownItemRadio
                              key={option.id}
                              id={option.id}
                              onClick={() => handleModuleSelect(option.id, option.name)}
                              isSelected={selectedModule === option.id}
                          >
                            {option.name}
                          </DropdownItemRadio>
                      ))}
                    </DropdownItemRadioGroup>
                  </DropdownMenu>
                </Box>}

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
