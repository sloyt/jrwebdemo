import axios from 'axios';

export default axios.create({
    baseURL: 'http://jrserver.northeurope.cloudapp.azure.com/jasperserver/rest_v2/',
    auth: {
        username: 'joeuser',
        password: '123456'
    }
    // withCredentials: true,
    // headers: {
    //     'X-REMOTE-DOMAIN': '1'
    // }
});
