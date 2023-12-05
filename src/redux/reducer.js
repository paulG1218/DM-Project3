const initialState = {
    userId: null,
    isAdmin: false,
    username: null,
    email: null
}

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'authenticated':
            return {
                ...state,
                userId: action.payload.userId,
                isAdmin: action.payload.isAdmin,
                username: action.payload.username,
                email: action.payload.email
            };
        case "logout":
            return {
                ...state,
                userId: null,
                isAdmin: false,
            };
        default:
            return state
    }
}