export const setToken = (token) => {
    return localStorage.setItem('new-project', token);
};

export const getToken = () => {
    return localStorage.getItem('new-project');
};

export const removeToken = () => {
    return localStorage.removeItem('new-project');
};