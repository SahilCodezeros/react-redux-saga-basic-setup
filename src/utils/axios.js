import axios from 'axios';

import { proxy } from './proxy';
import { getToken } from './localStorage';

export async function getUserIdByToken() {
    try {
        const res = await axios.get(`${proxy}https://sahil-task-manager.herokuapp.com/users/me`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });

        return res;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export async function sendDataIntoDb(task, completed) {
    try {
        const res = await axios.post(`${proxy}https://sahil-task-manager.herokuapp.com/tasks`, {
            task,
            completed
        }, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });

        return res;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export async function getDataFromDb() {
    try {
        const res = await axios.get(`${proxy}https://sahil-task-manager.herokuapp.com/tasks`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });

        return res;
    } catch (err) {
        return err;
    }
};

export async function updateDataIntoDb(updateValue) {
    try {
        const res = await axios.put(`${proxy}https://sahil-task-manager.herokuapp.com/tasks/${updateValue.taskId}`, {
            task: updateValue.task,
            completed: updateValue.completed
        }, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });

        return res;
    } catch (err) {
        return err;
    }
};

export async function deleteDataFromDb(id) {
    try {
        const res = await axios.delete(`${proxy}https://sahil-task-manager.herokuapp.com/tasks/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });

        return res;
    } catch (err) {
        return err;
    }
};