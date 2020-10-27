/* eslint-disable default-case */
import React, { useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/authContext';

const Dashboard = () => {
  const { authState } = useContext(AuthContext)
  console.log(authState);
  return (
    <h2>Dashboard component</h2>
  )
}

export default Dashboard;