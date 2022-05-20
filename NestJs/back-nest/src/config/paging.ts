const paging = (page: number, totalPost: number) => {
    const maxPost = 10;
    const maxPage = 10;
    let currentPage = page ? page : 1;
    const hidePost = page === 1 ? 0 : (page - 1) * maxPost;
    const totalPage = Math.ceil(totalPost / maxPost);

    if (currentPage > totalPage) {
        currentPage = totalPage;
    }

    const startPage = Math.floor(((currentPage - 1) / maxPage)) * maxPage + 1;
    let endPage = startPage + maxPage - 1;

    if (endPage > totalPage) {
        endPage = totalPage;
    }
    return { startPage, endPage, hidePost, maxPost, totalPage, currentPage };
};

export default paging;