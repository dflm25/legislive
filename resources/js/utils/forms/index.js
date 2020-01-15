/**
 * control forms modal
*/
import React from 'react';
import Unit from '../../components/forms/Unit';
import Room from '../../components/forms/Room';

const forms = (form, action) => {

    switch (form) {
        case 'admin_room':
            return <Room action={action} />
        break;
        default:
            <div>Something is wrong</div>
        break;
    }

    return form;
}

export default forms;