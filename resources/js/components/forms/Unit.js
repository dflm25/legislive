/**
 * Unit form
 */
import React, { useState, useEffect } from 'react';
import useForm from 'react-hook-form';
import { get_levels, get_sub_levels, sendForm } from '../../services/unitsServices';

const Unit = (props) => {
    const [levels, setLevels] = useState([]);
    const [subLevels, setSubLevels] = useState([]);
    const { register, handleSubmit, watch, errors } = useForm()

    // send units form
    const onSubmit = data => {
        sendForm(data)
    }

    useEffect(() => {
        // Set levels
        async function fetchLevels () {
            let datalevel = await get_levels();
            setLevels(datalevel);     
        }

        fetchLevels();
    }, [])

    const change = async (e) => {
        if (e.target.name === 'level') {
            // set sublevels
            let dataSubLevels = await get_sub_levels(e.target.value);
            setSubLevels(dataSubLevels);
        }
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card-body">
                <div className="form-group">
                    <label>Level</label>
                    <select className="form-control" name="level" id="level" ref={register({ required: true })} onChange={change}>
                        <option value="">Select a level</option>
                        {
                            levels.map(function(result) {
                                return <option key={`${result.uid}`} value={result.uid}>{result.name}</option>
                            })
                        }
                    </select>
                    {errors.level && <span>This field is required</span>}
                </div>
                <div className="form-group">
                    <label>Sub level</label>
                    <select className="form-control" name="sub_levels_id" id="sub_levels_id" ref={register({ required: true })}>
                        <option value="">Select a sub level</option>
                        {
                            subLevels.map(function(result) {
                                return <option key={`${result.uid}`} value={result.uid}>{result.name}</option>
                            })
                        }
                    </select>
                    {errors.sub_levels_id && <span>This field is required</span>}
                </div>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" id="name" className="form-control" ref={register({ required: true })} value={props.data.name} />
                    {errors.name && <span>This field is required</span>}
                </div>
                <div className="form-group mb-0">
                    <label>Description</label>
                    <textarea name="description" id="description" className="form-control" rows="8" ref={register({ required: false })}></textarea> 
                </div>
            </div>
            <div className="text-right">
                <button className="btn btn-primary">
                    { (props.action === 'create') ? 'Create' : 'Update' }
                </button>
            </div>
        </form>
}

export default Unit;