
import { useState } from "react";
import PaginationComponent from "../components/PaginationComponent";
import SearchField from "../components/SearchField";
import Movies from "./Movies";

export const MOVIESPERPAGE = 10

export default function HomePage() {
    const [searchFilter, setSearchFilter] = useState("Movie")
    const [searchText, setSearchText] = useState("")
    const [numberOfPages, setNumberOfPages] = useState(0)
    const [offset, setOffset] = useState(0)
    
    return (
        <div data-testid="homePage">
            <SearchField searchText={searchText} filter={searchFilter} setSearchFilter={setSearchFilter} setSearchText={setSearchText} setNumberOfPages={setNumberOfPages}/>
            <Movies limit={MOVIESPERPAGE} offset={offset} text={searchText} filter={searchFilter}/>
            <PaginationComponent moviesPerPage={MOVIESPERPAGE} pages={numberOfPages} setOffset={setOffset}/>
        </div>
    )
}
