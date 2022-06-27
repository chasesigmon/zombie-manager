import React, { ReactFragment } from "react";
import { Zombie } from "../models/zombie";

interface QuarantineZoneProps {
    zombies: Zombie[], 
    location: string,
    updateLocation: (id: string, newLocation: string) => Promise<void>
}

const QuarantineZone = ({ zombies, location, updateLocation }: QuarantineZoneProps) => {
    const loc = location.toLowerCase();

    const getZombieButtons = (zombie: Zombie) => {
        let button1Img, button2Img, button1NewLocation = '', button2NewLocation = '';

        switch (loc) {
            case 'hospital':
                button1Img = <img className="quarantine-zone-img" src="https://cdn-icons-png.flaticon.com/512/158/158234.png" alt="school" />;
                button1NewLocation = 'school';
                button2Img = <img className="quarantine-zone-img" src="https://cdn-icons-png.flaticon.com/512/702/702455.png" alt="warehouse" />;
                button2NewLocation = 'warehouse';
                break;
            case 'school':
                button1Img = <img className="quarantine-zone-img" src="https://cdn-icons-png.flaticon.com/512/3063/3063138.png" alt="hospital" />;
                button1NewLocation = 'hospital';
                button2Img = <img className="quarantine-zone-img" src="https://cdn-icons-png.flaticon.com/512/702/702455.png" alt="warehouse" />;
                button2NewLocation = 'warehouse';
                break;
            case 'warehouse':
                button1Img = <img className="quarantine-zone-img" src="https://cdn-icons-png.flaticon.com/512/3063/3063138.png" alt="hospital" />;
                button1NewLocation = 'hospital';
                button2Img = <img className="quarantine-zone-img" src="https://cdn-icons-png.flaticon.com/512/158/158234.png" alt="school" />;
                button2NewLocation = 'school';
                break;
        }
    
        return (
            <React.Fragment>
                <div className='zombie-cell'>
                    <button className='update-location-button' type="submit" title={button1NewLocation} onClick={() => updateLocation(zombie._id, button1NewLocation)}>{button1Img}</button>
                </div>
                <div className='zombie-cell'>
                    <button className='update-location-button' type="submit" title={button2NewLocation} onClick={() => updateLocation(zombie._id, button2NewLocation)}>{button2Img}</button>
                </div>
            </React.Fragment>
        );
    }
    
    const getZombiesList = (): ReactFragment => {
        return zombies?.filter((zombie: Zombie) => zombie.location === loc)?.map((zombie: Zombie) => {
            const zombieImg = zombie.gender === 'female' 
            ? <img className='zombie-icon' src="https://cdn-icons-png.flaticon.com/512/3189/3189664.png" alt="female zombie" /> 
            : <img className='zombie-icon' src="https://cdn-icons-png.flaticon.com/512/773/773362.png" alt="male zombie" />

            return (
                <li key={zombie._id}>
                    <div className='zombie-cell'>
                        {zombieImg}{zombie.name}
                    </div>
                    {getZombieButtons(zombie)}
                </li>
            );
        }) ?? [];
    }

    const zombiesList = getZombiesList();

    const zoneImg = loc === 'hospital' 
    ? <img className="quarantine-zone-img" src="https://cdn-icons-png.flaticon.com/512/3063/3063138.png" title="hospital" alt="hospital" />
    : loc === 'school' 
    ? <img className="quarantine-zone-img" src="https://cdn-icons-png.flaticon.com/512/158/158234.png" title="school" alt="school" /> 
    : <img className="quarantine-zone-img" src="https://cdn-icons-png.flaticon.com/512/702/702455.png" title="warehouse" alt="warehouse" />;

    return (
        <div className="zombies-list">
            <div className="zombie-location">
                <span className="zone-location-image">{zoneImg}</span> {location}
            </div>

            <ul>
                {zombiesList}
            </ul>
        </div>
    );
}


export default QuarantineZone;