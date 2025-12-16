import React from 'react'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import Swal from 'sweetalert2'




const MyAssets = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: requests = [], refetch } = useQuery({
    queryKey: ['my-assets', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/requests?email=${user.email}`)
      return res.data;
    }
  })

  const handleAssetReject = id => {
    console.log(id)

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/requests/${id}`)
          .then(res => {
            console.log(res.data)
            if (res.data.deletedCount) {
              refetch()
              Swal.fire({
                title: "Deleted!",
                text: "Your asset request has been deleted.",
                icon: "success"
              });

            }
          })


      }
    });

  }



  return (
    <div>
      <h2 className="text-3xl font-bold">All of My Assets: {requests.length}</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Asset Name</th>
              <th>Company Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>

            {
              requests.map((request, index) => <tr key={request._id}>
                <th>{index + 1}</th>
                <td>{request.assetName}</td>
                <td>{request.companyName}</td>
                <td>{request.requestStatus}</td>
                <td>
                  <button className="btn btn-accent hover:bg-primary mx-2">Approved</button>
                  <button onClick={() => handleAssetReject(request._id)} className='btn btn-accent hover:bg-primary'>
                    Rejected
                  </button>
                </td>

              </tr>)
            }


          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyAssets
