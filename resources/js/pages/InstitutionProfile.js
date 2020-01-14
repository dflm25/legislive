import React from 'react';
import { Link, useParams } from "react-router-dom";

const InstitutionProfile = () => {
    let { id } = useParams();

    return <div className="container py-5">
            <div className="text-center">
                institution {id}
            </div>
        </div>
}

export default InstitutionProfile;
