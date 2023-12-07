const initialState = {
    userId: null,
    lists: [],
    isAdmin: false,
    username: null,
    email: null,
    groups: [],
}

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
                password: action.payload.password
            }
        default:
            return state
    }
}