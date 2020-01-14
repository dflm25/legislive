/**
 * control forms modal
*/
import React from 'react';
import Unit from '../../components/forms/Unit';

const forms = (form, action) => {

    switch (form) {
        case 'unit':
            return <Unit action={action} />
        break;
        default:
            <div>Something is wrong</div>
        break;
    }

    return form;
}

export default forms;