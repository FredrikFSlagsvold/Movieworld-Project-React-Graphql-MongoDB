import { atom } from "recoil";

export const isLoggedInAtom = atom({
    key: 'isLoggedIn-atom',
    default: false
})

export const userIDAtom = atom({
    key: 'userID-atom',
    default: ''
})


export const nameAtom = atom({
    key: 'name-atom',
    default: 0
})

