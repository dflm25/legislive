/**
 * Unit form
 */
import React, { useState, useEffect } from 'react';
import useForm from 'react-hook-form';
// import { get_levels, get_sub_levels, sendForm } from '../../services/unitsServices';
import Http from '../../Http';

const Room = (props) => {
    const [publicRoom, setPublicRoom] = useState([]);
    const [errorRoom, setErrorRoom] = useState();
    const { register, handleSubmit, watch, errors } = useForm()

    // send units form
    const onSubmit = data => {
        sendForm(data)
    }
    
    useEffect(() => {
        Http.get('/get-rooms')
        .then((response) => {
            const { data } = response;
            setPublicRoom(data);
        })
        .catch(() => {
            setErrorRoom('Unable to fetch data.')
        });
    }, [])
    /*
    const change = async (e) => {
        if (e.target.name === 'level') {
            // set sublevels
            let dataSubLevels = await get_sub_levels(e.target.value);
            setSubLevels(dataSubLevels);
        }
    }*/

    return <form onSubmit={handleSubmit(onSubmit)}>
            <div className="">{errorRoom}</div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12"><p>Grupos publicos</p></div>
                    <div className="col-md-12">
                        <div className="form-group">
                        {
                            publicRoom.map(function (result) {
                                return <div key={`item-room-${result.id}`} className="custom-control custom-checkbox custom-control-inline">
                                        <input type="checkbox" id={`public-${result.id}`} name={`public-${result.id}`} className="custom-control-input" />
                                        <label className="custom-control-label" for={`public-${result.id}`}>{result.name}</label>
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
                        {/*
                            publicRoom.map(function (result) {
                                return <div key={`item-room-${result.id}`} className="custom-control custom-checkbox custom-control-inline">
                                        <input type="checkbox" id="customRadioInline1" name="customRadioInline1" className="custom-control-input" />
                                        <label className="custom-control-label" for="customRadioInline1">{result.name}</label>
                                    </div>
                            })
                        */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-right">
                <button className="btn btn-primary">
                    { (props.action === 'create') ? 'Create' : 'Update' }
                </button>
            </div>
        </form>
}

export default Room;