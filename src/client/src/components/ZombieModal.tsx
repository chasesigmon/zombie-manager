import { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

interface ZombieModalProps {
    isOpen: boolean;
    createZombie: (name: string, gender: string, location: string) => Promise<void>;
    toggleModal: () => void;
}

const ZombieModal = ({createZombie, isOpen, toggleModal}: ZombieModalProps) => {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [location, setLocation] = useState('');
    
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={toggleModal}
            contentLabel="Create Zombie"
            className="mymodal"
            overlayClassName="myoverlay"
            closeTimeoutMS={500}
        >
            <div id="modal-header">
                <h3>Create Zombie</h3>
            </div>

            <div id="modal-body">
                <div className='modal-body-item'>
                    <span className="item-text">Name:</span> <input type="text" onChange={e => setName(e.target.value)} />
                </div>
                <div className='modal-body-item'>
                    <span className="item-text">Gender:</span>
                    <div>
                        <input type="radio" name="gender" value='male' checked={gender === 'male'} onChange={e => setGender(e.target.value)} /> male <br />
                        <input type="radio" name="gender" value='female' checked={gender === 'female'} onChange={e => setGender(e.target.value)} /> female
                    </div>
                </div>
                <div className='modal-body-item'>
                    <span className="item-text">Location:</span>
                    <div>
                        <input type="radio" name="location" value='hospital' checked={location === 'hospital'} onChange={e => setLocation(e.target.value)} /> hospital <br />
                        <input type="radio" name="location" value='school' checked={location === 'school'} onChange={e => setLocation(e.target.value)} /> school <br />
                        <input type="radio" name="location" value='warehouse' checked={location === 'warehouse'} onChange={e => setLocation(e.target.value)} /> warehouse
                    </div>
                </div>
            </div>

            <div id="modal-footer">
                <input id="modal-close" className="modal-button" type="button" onClick={toggleModal} value="Close" />
                <input id="modal-submit" className="modal-button" type="button" disabled={!name || !gender || !location} onClick={() => {createZombie(name, gender, location); toggleModal();}} value="Submit" />
            </div>
        </Modal>
    );
}

export default ZombieModal;