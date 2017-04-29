//function reference inside of an object to be able to stub it in tests
const session = {
    setSessionId: (sessionId) => {
        localStorage.setItem('sessionId', sessionId); 
    }
};

export default session;