/**
 * Super modal Forms
 */
import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { setModal } from '../store/actions';
import forms from '../utils/forms';

const SuperModal = (props) => {
    return <Modal
                show={props.statusModal.state}
                onHide={() => props.setModal(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        { props.statusModal.title }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {forms(props.statusModal.form, props.statusModal.action)}
                </Modal.Body>
        </Modal>
}

const mapStateToProps = state => ({
    statusModal: state.statusModal
});

const mapDispatchToProps = {
    setModal : setModal
};

export default connect(mapStateToProps, mapDispatchToProps)(SuperModal);