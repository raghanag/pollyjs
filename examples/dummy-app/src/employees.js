import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
  // Edit,
  // Create,
  Datagrid,
  // ReferenceField,
  TextField,
  // EditButton,
  ShowButton,
  // DisabledInput,
  // LongTextInput,
  // ReferenceInput,
  // SelectInput,
  // SimpleForm,
  TextInput,
  Filter,
  Show,
  SimpleShowLayout
} from 'react-admin';

const EmployeeFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    {/* <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
      <SelectInput optionText="name" />
    </ReferenceInput> */}
  </Filter>
);

const EmployeeTitle = ({ record }) => {
  return <span>Employee - {record ? `${record.id}` : ''}</span>;
};

EmployeeTitle.propTypes = {
  record: PropTypes.PropTypes.shape({
    id: PropTypes.string
  })
};

export const EmployeeList = props => (
  <List
    title="Employees"
    {...props}
    filters={<EmployeeFilter />}
    sort={{ field: 'id', order: 'ASC' }}
  >
    <Datagrid>
      <TextField source="FIRST_NAME" />
      <TextField source="LAST_NAME" />
      <ShowButton />
    </Datagrid>
  </List>
);

export const EmployeeShow = props => (
  <Show title={<EmployeeTitle />} {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="FIRST_NAME" />
      <TextField source="LAST_NAME" />
    </SimpleShowLayout>
  </Show>
);
