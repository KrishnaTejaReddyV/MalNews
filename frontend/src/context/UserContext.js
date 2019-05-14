import React from 'react';

export default React.createContext({
    userId: null,
    name: null,
    token: null,
    login: (userId, name, token) => {},
    logout: () => {}
})