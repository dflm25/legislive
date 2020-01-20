import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const Users = (props) => {
    
}

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    title: state.title
});

export default connect(mapStateToProps)(Users);
/*
<div class="card">
    <div class="card-header">
    <h4>Who's Online?</h4>
    </div>
    <div class="card-body">
        <ul class="list-unstyled list-unstyled-border">
            <li class="media">
                <img alt="image" class="mr-3 rounded-circle" width="50" src="../assets/img/avatar/avatar-1.png" />
                <div class="media-body">
                    <div class="mt-0 mb-1 font-weight-bold">Hasan Basri</div>
                    <div class="text-success text-small font-600-bold"><i class="fas fa-circle"></i> Online</div>
                </div>
            </li>
        </ul>
    </div>
</div>
*/
