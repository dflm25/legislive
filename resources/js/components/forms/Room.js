/**
 * Unit form
 */
import React, { useState, useEffect } from 'react';
import useForm from 'react-hook-form';
import ReactTagInput from "@pathofdev/react-tag-input";
import { update_room_status, sendForm } from '../../services/roomsService';
import Http from '../../Http';
import { validateEmail } from '../../utils';
import swal from 'sweetalert';

const Room = (props) => {
    const [formStatus, setFormStatus] = useState(false);
    const [textBtn, setTextBtn] = useState('Crear un grupo');
    const [roomsData, setRoomData] = useState([]);
    const [errorRoom, setErrorRoom] = useState();
    const [checkedItems, setCheckedItems] = useState({}); //plain object as state
    const [tags, setTags] = React.useState([])
    
    const { handleSubmit, watch, errors, register } = useForm()

    // send units form
    const onSubmit = data => {
        const returnedTarget = Object.assign(data, { tags: tags })
        sendForm(returnedTarget)
    }
    
    useEffect(() => {
        Http.get('/get-rooms')
        .then((response) => {
            const { data } = response;
            data.selected.map(function(item) {
                setCheckedItems({
                    ...checkedItems, [item.name] : 'checked'
                });
            })
            setRoomData(data);
        })
        .catch(() => {
            setErrorRoom('Unable to fetch data.')
        });
    }, [])

    const handleChange = async (event) => {
        setCheckedItems({
            ...checkedItems, [event.target.name] : event.target.checked 
        });
        // Actualizamos en base de datos el status
        let response = await update_room_status({ status: event.target.checked, id: event.target.value })
    }

    const handleAddRoom = async (event) => {
        let text = !formStatus ? 'Cancelar' : 'Crear un grupo';
        setFormStatus(!formStatus)
        setTextBtn(text)
    }

    const handleDelete = (i) => {
        const { tags } = this.state;
        this.setState({ tags: tags.filter((tag, index) => index !== i) });
    }

    const handleAddition = (newtag) => {
        const tags = [].concat(tags, newtag)
        setTags(tags)
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
            <div className="">{errorRoom}</div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12"><p>Grupos publicos</p></div>
                    <div className="col-md-12">
                        <div className="form-group">
                        {
                            roomsData.public && roomsData.public.map(function (result) {
                                return <div key={`item-room-${result.id}`} className="custom-control-inline">
                                        <input 
                                            type="checkbox" 
                                            name={result.name}
                                            checked={checkedItems[result.name] || false }
                                            onChange={handleChange}
                                            value={result.id}
                                        />
                                        <label htmlFor={result.name}>{result.name}</label>
                                    </div>
                            })
                        }
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12"><p>Grupos privados</p></div>
                    <div className="col-md-12">
                        <div className="form-group">
                        {
                            roomsData.private && roomsData.private.map(function (result) {
                                return <div key={`item-room-${result.id}`} className="custom-control-inline">
                                        <input
                                            type="checkbox" 
                                            name={result.name}
                                            checked={checkedItems[result.name] || false }
                                            onChange={handleChange}
                                            value={result.id}
                                        />
                                        <label htmlFor={result.name}>{result.name}</label>
                                    </div>
                            })
                        }
                        </div>
                    </div>
                </div>
                <div className="row animated fadeIn" style={{ display: formStatus ? 'block' : 'none' }}>
                    <hr />
                    <div className="col-md-12"><h4>Crear un grupo</h4></div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Nombre del grupo (*Nombre debe de ser unico)</label>
                            <input type="text" name="name" id="name" className="form-control" ref={register({ required: true })} />
                            {errors.name && <span>Este campo es requerido</span>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="type" value="Privado" ref={register({ required: true })}/>
                                    <label className="form-check-label" htmlFor="inlineRadio1">Privado</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="type" value="Publico" ref={register({ required: true })}/>
                                    <label className="form-check-label" htmlFor="inlineRadio2">Publico</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Quieres invitar a alguien a unirse al grupo</label>
                            <ReactTagInput 
                                name="emails"
                                ref={register()}
                                tags={tags} 
                                onChange={(newTags) => setTags(newTags)}
                                placeholder="Escribe un email"
                                validator={(value) => {
                                    const isEmail = validateEmail(value)
                                    if (!isEmail) {
                                        swal("Error!", "Debes de digitar un email!", "warning");
                                    }
                                    return isEmail;
                                }}
                            />
                        </div>
                    </div>
                    <input className="btn btn-warning" type="submit" />
                </div>
            </div>
            <div className="text-right">
                <a onClick={handleAddRoom} className="text-info">{textBtn}</a>
            </div>
        </form>
}

export default Room;