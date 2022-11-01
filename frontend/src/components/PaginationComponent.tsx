import { Pagination } from '@mui/material';

type movieProps ={
    moviesPerPage: number,
    pages: number
    setOffset: React.Dispatch<React.SetStateAction<number>>
}


export default function PaginationComponent( { moviesPerPage,pages, setOffset }: movieProps ){

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setOffset((value-1)*moviesPerPage);
      };

    return (
    <div>
        <Pagination 
        count={pages || 0} onChange={(handleChange)} siblingCount={2}/>
    </div>
    )
}