"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var mongodb_1 = require("mongodb");
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
                                { $skip: hidePost },
                                { $limit: maxPost },
                            ]).toArray()];
                    case 3:
                        boardData = _b.sent();
                        if (boardData.length !== 0) {
                            return [2 /*return*/, {
                                    result: true,
                                    boardData: boardData,
                                    currentPage: currentPage,
                                    totalPage: totalPage,
                                }];
                        }
                        return [2 /*return*/, { result: false }];
                    case 4:
                        e_1 = _b.sent();
                        throw new Error(e_1);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    BoardController.prototype.insertData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var client, exists, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, db_1.DB.MongoConn.getInstance.connect()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.db(db_1.DB.NAME).collection(db_1.DB.COLLECTIONS.Board).insertOne({
                                title: data.title,
                                content: data.content,
                                writer: data.writer,
                                createData: new Date(),
                                updatedDate: new Date(),
                                isComment: 1,
                                isDelete: 1,
                                hit: 0,
                            })];
                    case 2:
                        exists = _a.sent();
                        if (exists) {
                            return [2 /*return*/, { result: true }];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        throw new Error(e_2);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BoardController.prototype.detailData = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var obID, client, exists, data, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        obID = new mongodb_1.ObjectId(id);
                        return [4 /*yield*/, db_1.DB.MongoConn.getInstance.connect()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.db(db_1.DB.NAME).collection(db_1.DB.COLLECTIONS.Board).findOne({ _id: obID })];
                    case 2:
                        exists = _a.sent();
                        data = __assign({ result: true }, exists);
                        if (exists.length !== 0) {
                            return [2 /*return*/, {
                                    data: data
                                }];
                        }
                        return [2 /*return*/, { result: false }];
                    case 3:
                        e_3 = _a.sent();
                        throw new Error(e_3);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BoardController.prototype.deleteData = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var obID, client, exists, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        obID = new mongodb_1.ObjectId(id);
                        return [4 /*yield*/, db_1.DB.MongoConn.getInstance.connect()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.db(db_1.DB.NAME).collection(db_1.DB.COLLECTIONS.Board).findOneAndUpdate({ _id: obID }, {
                                $set: { isDelete: 2 }
                            })];
                    case 2:
                        exists = _a.sent();
                        if (exists)
                            return [2 /*return*/, { result: true }];
                        return [2 /*return*/, { result: false }];
                    case 3:
                        e_4 = _a.sent();
                        throw new Error(e_4);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return BoardController;
}());
exports.BoardController = BoardController;
//# sourceMappingURL=BoardController.js.map