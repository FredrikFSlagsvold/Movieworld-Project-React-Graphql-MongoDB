import { atom } from "recoil";

export const filterAtom = atom({
    key: 'filter-atom',
    default: 'title'
})

export const sortAtom = atom({
    key: 'sort-atom',
    default: 'release_date'
})