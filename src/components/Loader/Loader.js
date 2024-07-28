import React from 'react'
import { Spinner, Modal } from 'react-bootstrap';
import '../styles/Loader.css';

function Loader({show}) {

  return (
    <div className='loader-main'>
         <Modal show={show} centered>
            <Modal.Body className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Modal.Body>
        </Modal>
    </div>
  )
}

export default Loader
