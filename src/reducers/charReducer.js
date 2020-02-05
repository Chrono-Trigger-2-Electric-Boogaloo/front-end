export const initChar = {
    current: 'krishan',
    avail: ['julie', 'ryan', 'isla'],
    all: ['krishan', 'julie', 'ryan', 'isla']
}

export const charSelect = (state, action) => {
    switch(action.type) {
        case 'SET_CHAR':
            return {
                ...state,
                current: action.payload,
                avail: state.all.filter(char => char !== action.payload)
            }
        default:
            return state
    }
}