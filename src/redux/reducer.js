const initialState = {
    userId: null,
    lists: [],
    isAdmin: false,
    username: null,
    email: null,
    groups: [],
    score: null,
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'authenticated':
            return {
                ...state,
                userId: action.payload.userId,
                lists: action.payload.lists,
                isAdmin: action.payload.isAdmin,
                username: action.payload.username,
                email: action.payload.email,
                groups: action.payload.groups,
                score: action.payload.score,
            };
        case "logout":
            return {
                ...state,
                userId: null,
                isAdmin: false,
            };
        case 'userChange':
            return {
                ...state,
                username: action.payload.username,
                email: action.payload.email,

                password: action.payload.password,
            };
         case 'updateScore':
             return {
        ...state,
        score: state.score + action.payload.points,
             }

        default:
            return state;
    }
};