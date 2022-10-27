
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import PaginationComponent from "../components/PaginationComponent";
import SearchField from "../components/SearchField";
import Movies from "./Movies";

const MOVIESPERPAGE = 10

export default function HomePage() {
    const [searchFilter, setSearchFilter] = useState("Movie")
    const [searchText, setSearchText] = useState("")
    const [numberOfPages, setNumberOfPages] = useState(0)
    const [offset, setOffset] = useState(0)
    
    return (
        <div>
            <SearchField searchText={searchText} filter={searchFilter} setSearchFilter={setSearchFilter} setSearchText={setSearchText} setNumberOfPages={setNumberOfPages}/>
            <PaginationComponent moviesPerPage={MOVIESPERPAGE} pages={numberOfPages} setOffset={setOffset}/>
            <Movies limit={MOVIESPERPAGE} offset={offset} text={searchText} filter={searchFilter}/>
        </div>
    )
}
