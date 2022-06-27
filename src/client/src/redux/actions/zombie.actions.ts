import { Zombie } from "../../models/zombie";

export const LIST_ZOMBIES_REQUEST = 'LIST_ZOMBIES_REQUEST';
export const LIST_ZOMBIES_SUCCESS = 'LIST_ZOMBIES_SUCCESS';
export const LIST_ZOMBIES_FAILURE = 'LIST_ZOMBIES_FAILURE';

export const listZombies = () => ({
    type: LIST_ZOMBIES_REQUEST,
    payload: []
});
  
export const listZombiesSucceeded = (zombies: Zombie[]) => ({
    type: LIST_ZOMBIES_SUCCESS,
    payload: zombies,
});

export const listZombiesFailed = (msg: string) => ({
    type: LIST_ZOMBIES_FAILURE,
    payload: msg,
});