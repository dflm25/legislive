import React, { useState } from 'react'
import useForm from 'react-hook-form'

export const Password = () => {
    const { register, handleSubmit, watch, errors } = useForm()
    const onSubmit = data => { console.log(data) }

    return <form className="needs-validation" onSubmit={handleSubmit(onSubmit)}>
                <div className="card-header">
                    <h4>Change password</h4>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="form-group col-md-12 col-12">
                            <label for="newpassword">New Password</label>
                            <input name="newpassword" type="text" className="form-control" value="" ref={register({ required: true })} />
                            {errors.newpassword && <div className="invalid-feedback">
                                Please fill in the first name
                            </div>}
                        </div>
                        <div className="form-group col-md-12 col-12">
                            <label for="renewpassword">New Password</label>
                            <input name="renewpassword" type="text" className="form-control" value="" ref={register({ required: true })} />
                            {errors.renewpassword && <div className="invalid-feedback">
                                Please fill in the first name
                            </div>}
                        </div>
                    </div>
                </div>
                <div className="card-footer text-right">
                    <button className="btn btn-primary">Update password</button>
                </div>
        </form>
}