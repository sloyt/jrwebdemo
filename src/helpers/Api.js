import axios from 'axios';

export default axios.create({
    baseURL: 'http://jrserver.northeurope.cloudapp.azure.com/jasperserver/',
    auth: {
        username: 'joeuser',
        password: '123456'
    }
});
