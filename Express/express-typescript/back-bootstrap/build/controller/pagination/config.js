"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paging = void 0;
var paging = function (page, totalPost) {
    var maxPost = 10;
    var maxPage = 10;
    var currentPage = page ? parseInt(page) : 1;
    var hidePost = page === 1 ? 0 : (page - 1) * maxPost;
    var totalPage = Math.ceil(totalPost / maxPost);
    if (currentPage > totalPage) {
        currentPage = totalPage;
    }
    var startPage = Math.floor(((currentPage - 1) / maxPage)) * maxPage + 1;
    var endPage = startPage + maxPage - 1;
    if (endPage > totalPage) {
        endPage = totalPage;
    }
    return { startPage: startPage, endPage: endPage, hidePost: hidePost, maxPost: maxPost, totalPage: totalPage, currentPage: currentPage };
};
exports.paging = paging;
//# sourceMappingURL=config.js.map