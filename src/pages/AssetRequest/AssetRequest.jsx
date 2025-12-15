import React from 'react'
import { useForm } from 'react-hook-form'
import { data } from 'react-router'
import Swal from 'sweetalert2'

const AssetRequest = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const handleAssetRequest = data => {
        console.log(data)
       
        Swal.fire({
            title: "Are you sure to submit?",
            text: "It will take time for HR approval",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, confirmed"
        }).then((result) => {
            if (result.isConfirmed) {


                
                // Swal.fire({
                //     title: "Deleted!",
                //     text: "Your file has been deleted.",
                //     icon: "success"
                // });
            }
        });

    }




    return (
        <div className="bg-base-100 rounded-2xl shadow-sm p-6 md:p-10 my-5">
            <h2 className="text-3xl md:text-5xl font-extrabold text-secondary">
                Request an Asset
            </h2>
            <form onSubmit={handleSubmit(handleAssetRequest)} className='mt-8 p-4 text-black'>
                <div>
                    <label className="label mr-4">
                        <input type="radio" {...register('assetType')} value="returnable" className="radio radio-accent" defaultChecked />
                        Returnable
                    </label>
                    <label className="label">
                        <input type="radio" {...register('assetType')} value="non-returnable" className="radio radio-accent" />
                        Non-returnable
                    </label>
                </div>
                {/* Assets Details */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-8'>
                    <fieldset className="fieldset">
                        <label className="label">Asset Name</label>
                        <input type="text" {...register('assetName', { required: true })} className="input w-full" placeholder="Asset Name" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label className="label">Asset QTY</label>
                        <input type="number" {...register('assetQTY', { required: true })} className="input w-full" placeholder="Asset QTY" />
                    </fieldset>
                </div>

                {/* two columns */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                    {/* Employe details */}

                    <fieldset className="fieldset space-y-2">
                        {/* Employee Name */}
                        <h2 className="text-2xl font-bold">Employee Details</h2>
                        <label className="label">Employee Name</label>
                        <input type="text" {...register('employeeName', { required: true })} className="input w-full" placeholder="Employee Name" />
                        {/* Employee Email */}
                        <label className="label">Employee Email</label>
                        <input type="email" {...register('employeeEmail', { required: true })} className="input w-full" placeholder="Email Address" />
                        {/* Employee Designation */}
                        <label className="label">Employee Designation</label>
                        <input type="text" {...register('employeeDesignation', { required: true })} className="input w-full" placeholder="Designation" />

                        {/* Assets Notes */}
                        <label className="label">Assets Notes</label>
                        <textarea type="text" {...register('assetsNotes')} className="input w-full min-h-[120px]" placeholder="Assets Notes"></textarea>


                    </fieldset>

                    {/* HR details */}

                    <fieldset className="fieldset space-y-2">
                        <h2 className="text-2xl font-bold">HR Details</h2>
                        {/* HR Name */}
                        <label className="label">HR Name</label>
                        <input type="text" {...register('hrName', { required: true })} className="input w-full" placeholder="HR Name" />
                        {/* HR Email */}
                        <label className="label">HR Email</label>
                        <input type="email" {...register('hrEmail', { required: true })} className="input w-full" placeholder="Email Address" />
                        {/* Company Name */}
                        <label className="label">Company Name</label>
                        <input type="text" {...register('companyName', { required: true })} className="input w-full" placeholder="Company Name" />

                        {/* Assets Notes */}
                        <label className="label">HR Notes</label>
                        <textarea type="text" {...register('hrNotes')} className="input w-full min-h-[120px]" placeholder="HR Notes"></textarea>


                    </fieldset>

                </div>
                <input type="submit" className='btn btn-accent' value="Asset Request" />
            </form>


        </div>
    )
}

export default AssetRequest