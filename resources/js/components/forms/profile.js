import React, { useState } from 'react'
import useForm from 'react-hook-form';

export const FormProfile = () => {
    const { register, handleSubmit, watch, errors } = useForm()
    const onSubmit = data => { console.log(data) }

    return <form className="needs-validation" onSubmit={handleSubmit(onSubmit)}>
            <div className="card-header">
                <h4>Edit Profile</h4>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="form-group col-md-12 col-12">
                        <label for="name">Full Name</label>
                        <input name="name" type="text" className="form-control" value="" ref={register({ required: true })} />
                        {errors.name && <div className="invalid-feedback">
                            Please fill in the first name
                        </div>}
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-7 col-12">
                        <label for="email">Email</label>
                        <input name="email" type="email" className="form-control" value="" 
                            ref={register({required: true, max: 15, min: 8, pattern: /^\S+@\S+$/i })} 
                        />
                        {errors.email && <div className="invalid-feedback">
                            Please fill in the email
                        </div>}
                    </div>
                    <div className="form-group col-md-5 col-12">
                        <label for="phone">Phone</label>
                        <input name="phone" type="tel" className="form-control" value="" 
                            ref={register({ required: true, max: 11, min: 8, pattern: /^\d+$/i })}
                        />
                        {errors.phone && <div className="invalid-feedback">
                            Please fill in the phone
                        </div>}
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-12">
                        <label>Bio</label>
                        <textarea className="form-control summernote-simple"></textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group mb-0 col-12">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" name="remember" className="custom-control-input" id="newsletter" />
                            <label className="custom-control-label" for="newsletter">Subscribe to newsletter</label>
                            <div className="text-muted form-text">
                                You will get new information about products, offers and promotions
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-footer text-right">
                <button className="btn btn-primary">Save Changes</button>
            </div>
        </form>
}