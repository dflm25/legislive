import React, { useState } from 'react'
import useForm from 'react-hook-form'

export const Password = () => {
    const { register, handleSubmit, watch, errors } = useForm()
    const onSubmit = data => { console.log(data) }

    return <form className="needs-validation" onSubmit={handleSubmit(onSubmit)}>
                <div className="card-header">
                    <h4>Cambiar mi contraseña</h4>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="form-group col-md-12 col-12">
                            <label htmlFor="newpassword">Nueva contraseña</label>
                            <input name="newpassword" type="text" className="form-control" ref={register({ required: true })} />
                            {errors.newpassword && <div className="invalid-feedback">
                                Please fill in the first name
                            </div>}
                        </div>
                        <div className="form-group col-md-12 col-12">
                            <label htmlFor="renewpassword">Repertir contraseña</label>
                            <input name="renewpassword" type="text" className="form-control" ref={register({ required: true })} />
                            {errors.renewpassword && <div className="invalid-feedback">
                                Please fill in the first name
                            </div>}
                        </div>
                    </div>
                </div>
                <div className="card-footer text-right">
                    <button className="btn btn-primary">Actualizar contraseña</button>
                </div>
        </form>
}