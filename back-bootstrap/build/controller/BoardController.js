"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardController = void 0;
var db_1 = require("../db/db");
var config_1 = require("./pagination/config");
var BoardController = /** @class */ (function () {
    function BoardController() {
    }
    BoardController.prototype.getBoardList = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            var client, allCount, _a, startPage, endPage, hidePost, maxPost, totalPage, currentPage, boardData, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, db_1.DB.MongoConn.getInstance.connect()];
                    case 1:
                        client = _b.sent();
                        return [4 /*yield*/, client.db(db_1.DB.NAME).collection(db_1.DB.COLLECTIONS.Board).aggregate([
                                { $match: { isDelete: 1 } },
                                { $count: 'allCount' },
                            ]).toArray()];
                    case 2:
                        allCount = (_b.sent())[0].allCount;
                        if (isNaN(page)) {
                            page = 1;
                        }
                        _a = (0, config_1.paging)(page, allCount), startPage = _a.startPage, endPage = _a.endPage, hidePost = _a.hidePost, maxPost = _a.maxPost, totalPage = _a.totalPage, currentPage = _a.currentPage;
                        return [4 /*yield*/, client.db(db_1.DB.NAME).collection(db_1.DB.COLLECTIONS.Board).aggregate([
                                { $match: { isDelete: 1 } },
                                { $sort: { '_id': -1 } },
                                // {$skip: `${hidePost}`},
                                // {$limit: `${maxPost}`},
                                { $skip: 0 },
                                { $limit: 10 },
                            ]).toArray().catch(function (err) {
                                console.log('test', err);
                            })];
                    case 3:
                        boardData = _b.sent();
                        console.log(totalPage, currentPage + ' 총 페이지 : 현재 페이지');
                        return [2 /*return*/, {
                                result: true,
                                boardData: boardData,
                                currentPage: currentPage,
                                totalPage: totalPage,
                            }];
                    case 4:
                        e_1 = _b.sent();
                        throw new Error('ERROR!');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return BoardController;
}());
exports.BoardController = BoardController;
//# sourceMappingURL=BoardController.js.map