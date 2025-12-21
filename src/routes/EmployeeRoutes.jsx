import React from 'react'
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Loading from '../component/Loading/Loading';

const EmployeeRoutes = ({children}) => {
    const { loading, user } = useAuth();
    const { role, roleLoading } = useRole()

    if (loading || !user || roleLoading) {
        return <Loading></Loading>
    }


    if (role !== 'employee') {
        return <div><p className='text-4xl text-red-500'>Access restricted</p></div>
    }


    return children;
}

export default EmployeeRoutes