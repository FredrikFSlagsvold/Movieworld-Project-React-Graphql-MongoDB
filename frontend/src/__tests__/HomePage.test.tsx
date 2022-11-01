import HomePage from "../Page/HomePage";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { MockedProvider} from '@apollo/client/testing';
import { RecoilRoot } from "recoil";

describe('HomePage component', () => {
    test("HomePage is rendered", async () => {
        const {} = render(
            <MockedProvider>
                <BrowserRouter>
                    <RecoilRoot>
                        <HomePage/>
                    </RecoilRoot>
                </BrowserRouter>
            </MockedProvider>
        )
        expect(await screen.findByText("Loading...")).toBeInTheDocument;
        expect(await screen.findAllByTestId("searchField")).toBeInTheDocument;
    })
})