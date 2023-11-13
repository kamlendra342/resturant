import { async } from 'regenerator-runtime';
import addrecipie from './views/addrecipie.js';
import { KEY } from "./config.js";
import view from './views/View.js';

const time_out = function () {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`request took too long `));
        }, 5000);
    });
};



export const sendJSON = async function (url, uploaddata) {
    
    try {
        const fetchPro = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(uploaddata)
        });
        const res = await Promise.race([fetchPro,time_out()]);
        const data = await res.json();
        console.log(data);
        console.log(res);
        if (!res.ok) addrecipie.renderError(`${data.message}`);
        return data;

    } catch (err) {
        console.error("data send error");
    }
}