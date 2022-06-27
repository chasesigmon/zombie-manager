import { useEffect, useState } from 'react';
import { ZombieState } from '../redux/reducers/zombie.reducer';
import { Dispatch } from 'redux';
import { listZombies } from '../redux/actions/zombie.actions';
import { connect, useDispatch, useSelector } from 'react-redux';
import QuarantineZone from './QuarantineZone';
import ZombieModal from './ZombieModal';
import ZombieService from '../services/zombie.service';
import store, { RootReducerState } from '../redux/store';

const zombieSvc: ZombieService = new ZombieService();

const mapState = (state: ZombieState) => {
  return {
    zombies: state.zombies,
  };
};

const mapDispatch = (dispatch: Dispatch) => {
  return {
    listZombies: () => dispatch(listZombies()),
  };
};

const connector = connect(mapState, mapDispatch);

const updateLocation = async (id: string, location: string): Promise<void> => {
    await zombieSvc.update(id, location)
    await store.dispatch(listZombies());
}

const createZombie = async (name: string, gender: string, location: string): Promise<void> => {
    await zombieSvc.create(name, gender, location);
    await store.dispatch(listZombies());
}

const ZombieManager = () => {
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    
    const toggleModal = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        const getZombies = async () => {
            await dispatch(listZombies());
        }
        getZombies();
    }, [dispatch]);

    const { zombies } = useSelector((state: RootReducerState) => state.zombieReducer);

    return (
        <div>
            <div id="zombie-header">
                Zombie Manager
            </div>

            <div id="zombie-button-container">
                <input type="button" id="create-zombie-button" value="Create Zombie" onClick={toggleModal} />
            </div>

            <div id="zombie-quarantine-instructions">
                * To move a zombie from one location to another click the corresponding button icon.
            </div>

            <div className="quarantine-zones">
                <QuarantineZone zombies={zombies} location="Hospital" updateLocation={updateLocation} />
                <QuarantineZone zombies={zombies} location="School" updateLocation={updateLocation} />
                <QuarantineZone zombies={zombies} location="Warehouse" updateLocation={updateLocation} />
            </div>

            <ZombieModal createZombie={createZombie} isOpen={isOpen} toggleModal={toggleModal} />
        </div>
    );
}

export default connector(ZombieManager);
