const initialState = {
    userId: null,
    lists: [],
    isAdmin: false,
    username: null,
    email: null,
    groups: [],
    score: null,
    groupLists: [],
    isMemberOf: [],
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
                isMemberOf: action.payload.groupMembers
            };
        case "logout":
            return {
                initialState
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
            };
        case 'leave_group':
            return {
                ...state,
                isMemberOf: action.payload.groupMembers,
            }

        default:
            return state;
    }
};