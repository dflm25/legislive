import React, { useState } from 'react'
import { connect } from 'react-redux';
import useForm from 'react-hook-form';
import { update_profile } from '../../services/authService';
import { setUserInfo } from '../../store/actions'
import PhoneInput from 'react-phone-number-input'

const FormProfile = (props) => {
    const { register, handleSubmit, watch, errors } = useForm()
    const onSubmit = async (data) => { 
        let resp = await update_profile (data)
        props.setUserInfo(data)
        console.log('data', resp)
    }
    const { currentInfo } = props

    return <form className="needs-validation" onSubmit={handleSubmit(onSubmit)}>
            <div className="card-header">
                <h4>Editar mi perfil</h4>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="form-group col-md-12 col-12">
                        <label htmlFor="username">Nombre completo</label>
                        <input name="username" type="text" className="form-control" ref={ register({ required: true }) } 
                            defaultValue={currentInfo.username}
                        />
                        {errors.name && <div className="invalid-feedback">
                            Please fill in the first name
                        </div>}
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-7 col-12">
                        <label htmlFor="email">Email</label>
                        <input name="email" type="email" className="form-control" ref={ register({required: true, max: 15, min: 8, pattern: /^\S+@\S+$/i }) } 
                            defaultValue={currentInfo.email}
                        />
                        {errors.email && <div className="invalid-feedback">
                            Please fill in the email
                        </div>}
                    </div>
                    <div className="form-group col-md-5 col-12">
                        <label htmlFor="phone">Telefono</label>
                        <input name="phone" type="tel" className="form-control" ref={ register({ required: true, max: 11, min: 8, pattern: /^\d+$/i }) } 
                            defaultValue={currentInfo.phone}
                        />
                        {errors.phone && <div className="invalid-feedback">
                            Please fill in the phone
                        </div>}
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-6 col-12">
                        <label htmlFor="position">Cargo</label>
                        <input name="position" type="text" className="form-control" ref={ register({ min: 5 }) } 
                            defaultValue={currentInfo.position}
                        />
                        {errors.position && <div className="invalid-feedback">
                            Please fill in the position
                        </div>}
                    </div>
                    <div className="form-group col-md-6 col-12">
                        <label htmlFor="webpage">Pagina web</label>
                        <input name="webpage" type="text" className="form-control" ref={register({ min: 5 })} 
                            defaultValue={currentInfo.webpage}
                        />
                        {errors.webpage && <div className="invalid-feedback">
                            Please fill in the webpage
                        </div>}
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-6 col-12">
                        <label htmlFor="twitter">Twitter</label>
                        <input name="twitter" type="text" className="form-control" ref={register({ min: 5 })} 
                            defaultValue={currentInfo.twitter}
                        />
                        {errors.twitter && <div className="invalid-feedback">
                            Please fill in the twitter
                        </div>}
                    </div>
                    <div className="form-group col-md-6 col-12">
                        <label htmlFor="linkedin">Linkedin</label>
                        <input name="linkedin" type="text" className="form-control" ref={register({ min: 5 })} 
                            defaultValue={currentInfo.linkedin}
                        />
                        {errors.linkedin && <div className="invalid-feedback">
                            Please fill in the linkedin
                        </div>}
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-12">
                        <label htmlFor="description">Biografia max <em>(240 caracteres)</em></label>
                        <textarea className="form-control summernote-simple" name="description" ref={register({ min: 5, max: 240 })}
                            defaultValue={currentInfo.description}
                        ></textarea>
                        {errors.description && <div className="invalid-feedback">
                            Please fill in the description
                        </div>}
                    </div>
                </div>
                <div className="row">
                    <div className="form-group mb-0 col-12">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" name="remember" className="custom-control-input" id="newsletter" />
                            <label className="custom-control-label" htmlFor="newsletter">Recibir notificaciones por correo</label>
                            <div className="text-muted form-text">
                                Recibiras informacion de trabajos, nuevos temas y grupos.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-footer text-right">
                <button className="btn btn-primary">Actualizar perfil</button>
            </div>
        </form>
}

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user,
    currentInfo: state.currentInfo
  });
  
const mapDispatchToProps = {
    setUserInfo: setUserInfo
};
  
export default connect(mapStateToProps, mapDispatchToProps)(FormProfile);