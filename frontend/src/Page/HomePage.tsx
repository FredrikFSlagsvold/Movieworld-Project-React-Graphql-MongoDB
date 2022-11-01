
import { useState } from "react";
import PaginationComponent from "../components/PaginationComponent";
import SearchField from "../components/SearchField";
import Movies from "./Movies";

export const MOVIESPERPAGE = 12

export default function HomePage() {
    const [searchFilter, setSearchFilter] = useState("title")
    const [searchText, setSearchText] = useState("")
    const [sort, setSort] = useState(-1)
    const [sortType, setSortType] = useState("release_date")
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
