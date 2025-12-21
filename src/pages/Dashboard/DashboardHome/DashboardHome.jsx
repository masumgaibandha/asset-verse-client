import React from 'react'
import useRole from '../../../hooks/useRole'
import Loading from '../../../component/Loading/Loading';
import HRDashboardHome from './HRDashboardHome';
import EmployeeDashboardHome from './EmployeeDashboardHome';
import UsersDashboardHome from './UsersDashboardHome';

const DashboardHome = () => {
  const {role, roleLoading} = useRole();

  if(roleLoading){
    return <Loading></Loading>
  }

  if(role=== 'hr'){
    return <HRDashboardHome></HRDashboardHome>
  }

  else if(role=== 'employee'){
    return <EmployeeDashboardHome></EmployeeDashboardHome>
  }

  else {
    return <UsersDashboardHome></UsersDashboardHome>
  }

}

export default DashboardHome