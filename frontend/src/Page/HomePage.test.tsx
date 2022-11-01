import HomePage from "./HomePage";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { MockedProvider} from '@apollo/client/testing';
import { RecoilRoot } from "recoil";
import { MovieFeed } from "../utils/Queries";

const movieMocks =[{
    request: {
        query: MovieFeed,
        variables: {
            offset: 0,
            limit: 10,
            text: "",
            filter: "",
        }
    },
    result: {
        data: {
            moviesBySearch: [
                {poster_path: "/6VZlm8sEwxkE3L5nXxz17QLj1sF.jpg", original_language: "Polish", title: "Corpus Christi", runtime: 118, genres: ["Action", "Drama"], id: "123", directors: [{id: 566109, name: "Jan Komasa"}], cast: [{id: 1609214, name: "Bartosz Bielenia"}, {id: 131695, name: "Aleksandra Konieczna"}]}, 
                {poster_path: "/hL3NqRE2ccR4Y2sYSJTrmalRjrz.jpg", original_language: "Japanese", title: "Maquia: When the Promised Flower Blooms", runtime: 115, genres: ["Animation", "Fantasy", "Drama"], id: "1234", directors: [{id: 1257117, name: "Mari Okada"}], cast: [{id: 1835721, name: "Manaka Iwami"}, {id: 19588, name: "Miyu Irino"}]}
            ]
        }
    }
}]

describe('HomePage component', () => {
    test("HomePage is rendered", async () => {
        const {} = render(
            <MockedProvider mocks={movieMocks} addTypename={false}>
                <BrowserRouter>
                    <RecoilRoot>
                        <HomePage/>
                    </RecoilRoot>
                </BrowserRouter>
            </MockedProvider>
        )
        // expect(await screen.findByText("Loading...")).toBeInTheDocument;
        // expect(await screen.findAllByTestId("searchField")).toBeInTheDocument;


    })
})