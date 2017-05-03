import React, {Component, PropTypes} from 'react';

import {Modal, Button} from 'react-bootstrap';

export default class DeletePopover extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="modal=static">
                <Modal show={this.props.show} onHide={this.props.hide}>
                    <Modal.Header>
                        <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this poll?</Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.hide}>Close</Button>
                        <Button 
                            id="deleteButton"
                            bsStyle="danger"
                            onClick={() => {this.props.delete(); this.props.hide();}}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

DeletePopover.propTypes = {
    show: PropTypes.bool,
    delete: PropTypes.func,
    hide: PropTypes.func,
};