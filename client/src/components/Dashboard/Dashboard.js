/* eslint-disable default-case */
import React, {useEffect} from 'react';
import axios from 'axios';

const Dashboard = () => {
  useEffect(() => {
    axios.get('/api/user/checkToken')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])
  return (
    <h2>Dashboard component</h2>
  )
}

export default Dashboard;