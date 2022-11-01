
import { useState } from "react";
import { useRecoilState } from "recoil";
import PaginationComponent from "../components/PaginationComponent";
import SearchField from "../components/SearchField";
import { filterAtom, sortAtom } from "../shared/globalState";
import Movies from "./Movies";

export const MOVIESPERPAGE = 21

export default function HomePage() {
    const [searchFilter, setSearchFilter] = useRecoilState(filterAtom)
    const [searchText, setSearchText] = useState("")
    const [sort, setSort] = useState(-1)
    const [sortType, setSortType] = useRecoilState(sortAtom)
    const [numberOfPages, setNumberOfPages] = useState(0)
    const [offset, setOffset] = useState(0)
    
    return (
        <div 
        data-testid="homePage" 
        style={
            {display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '20px'}}>
            <SearchField searchText={searchText} filter={searchFilter} setSearchFilter={setSearchFilter} setSearchText={setSearchText} setNumberOfPages={setNumberOfPages} setSortType={setSortType} setOffset={setOffset} sortType={sortType} setSort={setSort}/>
            <Movies limit={MOVIESPERPAGE} offset={offset} text={searchText} filter={searchFilter} sort={sort} sortType={sortType}/>
            <PaginationComponent moviesPerPage={MOVIESPERPAGE} pages={numberOfPages} setOffset={setOffset}/>
        </div>
    )
}
