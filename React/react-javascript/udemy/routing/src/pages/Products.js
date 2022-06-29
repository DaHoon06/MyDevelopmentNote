import { Link } from "react-router-dom";


export const Products = () => {
    return (
        <article>
            <h1>Products!</h1>
            <ul>
                <li>
                    <Link to='/products/p1'>pr1</Link>
                </li>
                <li>
                    <Link to='/products/p2'>pr2</Link>
                </li>
                <li>
                    <Link to='/products/p3'>pr3</Link>
                </li>
            </ul>
        </article>
    );
};