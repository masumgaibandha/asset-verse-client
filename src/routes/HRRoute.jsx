import React from 'react'
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Loading from '../component/Loading/Loading';

const HRRoute = ({children}) => {
    const {loading} = useAuth();
    const {role, roleLoading} =useRole()

    if(loading || roleLoading){
        return <Loading></Loading>
    }

    
    if(role !== 'hr'){
        return <div><p className='text-4xl text-red-500'>Access restricted</p></div>
    }


  return children;
}

export default HRRoute