/**
 * Table units headers
 */
import React from 'react';

export const columns = (handleEdit, handleDelete) => {
    return [
        {
            name: "ID",
            selector : "id",
            sortable: true,
        },
        {
            name: "Name",
            selector : "name", 
            sortable: true,
        },
        {
            cell: (row) => <div>
                <a href="#" className="btn btn-sm btn-info" onClick={()=>handleEdit(row.id)}> Edit </a>&nbsp;
                <a href="#" className="btn btn-sm btn-danger deleteUnit" onClick={()=>handleDelete(row.id)}> Delete </a>
            </div>,
            button: true,
            width: 'auto', // custom width for icon button
        }
    ]
};