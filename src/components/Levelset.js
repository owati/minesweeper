import React from 'react';
import '../css/Levelset.css'


const Levelset = (props) => {
    return (
        <select onChange={props.change} className="grow" value={props.value}>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
        </select>
    )
}

export default Levelset;