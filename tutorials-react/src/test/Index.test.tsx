import { render } from "@testing-library/react";
import IndexPage from "../pages";

describe('Index test',() => {
  it ('should render Index', () => {
    render(<IndexPage />);
  })
})
