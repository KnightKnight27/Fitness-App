const initState = { loggedIn: false, trainings: [] };

export default function (state = initState, action) {

    if (action.type === 'FETCH_ALL_SCHEDULE') {
        // const updatedTrainings = [...state.trainings];
        // updatedTrainings.push(action.payload);
        return {
            ...state,
            trainings: action.payload
        }
    } else if (action.type === 'FETCH_SINGLE_SCHEDULE') {
        return {
            ...state,
            singleTraining: action.payload
        }
    } else if (action.type === 'LOGIN') {

        if (action.loginCred.username === 'admin' && action.loginCred.password === 'pass') {
            return {
                ...state,
                loggedIn: true
            };
        } else {
            return { ...state };
        }

    }

    return { ...state };
}