import React from "react";
import { useParams } from 'react-router-dom';

export const ProductDetail = () => {
    const params = useParams();
    console.log(params.productId);

    return (
        <article>
            <h1>제품 상세보기</h1>
            {params.productId}
        </article>
    )
}