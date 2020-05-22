import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import EmployeeIcon from '@material-ui/icons/Favorite';
// import TodoIcon from '@material-ui/icons/ViewList';
// import UserIcon from '@material-ui/icons/Group';
import { createMuiTheme } from '@material-ui/core/styles';

// import { UserList, UserShow } from './users';
// import { TodoList, TodoShow, TodoEdit, TodoCreate } from './todos';
import { EmployeeList, EmployeeShow } from './employees';

const dataProvider = jsonServerProvider('http://localhost:7000');
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ff5740',
      main: '#e50914',
      dark: '#aa0000',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff5740',
      main: '#e50914',
      dark: '#aa0000',
      contrastText: '#fff'
    }
  }
});

const App = () => (
  <Admin theme={theme} dataProvider={dataProvider}>
    <Resource
      name="employees"
      list={EmployeeList}
      show={EmployeeShow}
      icon={EmployeeIcon}
    />
    {/* <Resource
      name="todos"
      list={TodoList}
      show={TodoShow}
      edit={TodoEdit}
      create={TodoCreate}
      icon={TodoIcon}
    />
    <Resource name="users" list={UserList} show={UserShow} icon={UserIcon} /> */}
  </Admin>
);

export default App;
