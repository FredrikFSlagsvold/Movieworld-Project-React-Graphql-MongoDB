import { render, screen } from "@testing-library/react";
import { MockedProvider} from '@apollo/client/testing';
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import '@testing-library/jest-dom/extend-expect'
import { MovieFeed } from "../utils/Queries";
import Movies from "../Page/Movies";


const movieMocks =[{
    request: {
        query: MovieFeed,
        variables: {
            offset: 0,
            limit: 10,
            text: "",
            filter: "",
            sort: 0,
            sortType: ""
        }
    },
    result: {
        data: {
            moviesBySearch: [
                {poster_path: "/6VZlm8sEwxkE3L5nXxz17QLj1sF.jpg", vote_average: 8.4, release_date: "2020-01-01" , revenue: 100000, original_language: "Polish", title: "Corpus Christi", runtime: 118, genres: ["Action", "Drama"], id: "123", directors: [{id: 566109, name: "Jan Komasa"}], cast: [{id: 1609214, name: "Bartosz Bielenia"}, {id: 131695, name: "Aleksandra Konieczna"}]}, 
                {poster_path: "/hL3NqRE2ccR4Y2sYSJTrmalRjrz.jpg", vote_average: 8.0, release_date: "2020-01-05", revenue: 4300000, original_language: "Japanese", title: "Maquia: When the Promised Flower Blooms", runtime: 115, genres: ["Animation", "Fantasy", "Drama"], id: "1234", directors: [{id: 1257117, name: "Mari Okada"}], cast: [{id: 1835721, name: "Manaka Iwami"}, {id: 19588, name: "Miyu Irino"}]}
            ]
        }
    }
}]

const errorMock =[{
    request: {
        query: MovieFeed,
        variables: {
            offset: 0,
            limit: 10,
            text: "",
            filter: "",
            sort: 0,
            sortType: ""
        }
    },
    error: new Error("Error...")
}]

describe('Movies component', () => {
    it("Error occurs when rendering", async () => {
        const {} = render(
            <MockedProvider mocks={errorMock} addTypename={false}>
                <BrowserRouter>
                    <RecoilRoot>
                        <Movies limit={10} offset={0} text={""} filter={""} sort={0} sortType={""} />
                    </RecoilRoot>
                </BrowserRouter>
            </MockedProvider>
        )
        expect(await screen.findByText("Error...")).toBeInTheDocument;
    })

    it("Movies are rendered with the dummy data", async () => {
        const {} = render(
            <MockedProvider mocks={movieMocks} addTypename={false}>
                <BrowserRouter>
                    <RecoilRoot>
                        <Movies limit={10} offset={0} text={""} filter={""} sort={0} sortType={""}/>
                    </RecoilRoot>
                </BrowserRouter>
            </MockedProvider>
        )
        expect(await screen.findByText("Loading...")).toBeInTheDocument;
        expect(await screen.findByTestId("moviePage")).toBeInTheDocument;
        expect(await screen.getByText("Corpus Christi")).toBeInTheDocument;
        expect(await screen.getByText("Maquia: When the Prom...")).toBeInTheDocument;
        expect(await screen.getByText("Action, Drama")).toBeInTheDocument;
        expect(await screen.getByText("Animation, Fantasy, Drama")).toBeInTheDocument;
    })
})
