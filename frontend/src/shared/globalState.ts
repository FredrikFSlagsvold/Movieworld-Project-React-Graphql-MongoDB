import { atom } from "recoil";

export const isLoggedInAtom = atom({
    key: 'isLoggedIn-atom',
    default: true
})

export const userIDAtom = atom({
    key: 'userID-atom',
    default: ''
})
