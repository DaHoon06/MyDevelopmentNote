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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var BoardController_1 = require("../../controller/BoardController");
var index_1 = __importDefault(require("./comment/index"));
var router = (0, express_1.Router)();
var bc = new BoardController_1.BoardController();
router.get('/:page?', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var page, _a, result, boardData, currentPage, totalPage, data, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                page = req.query.page;
                return [4 /*yield*/, bc.getBoardList(page)];
            case 1:
                _a = _b.sent(), result = _a.result, boardData = _a.boardData, currentPage = _a.currentPage, totalPage = _a.totalPage;
                data = {
                    result: true,
                    boardData: boardData,
                    currentPage: currentPage,
                    totalPage: totalPage,
                };
                if (result) {
                    return [2 /*return*/, res.status(201).send(data)];
                }
                else {
                    return [2 /*return*/, res.status(500).send({ result: false })];
                }
                return [3 /*break*/, 3];
            case 2:
                e_1 = _b.sent();
                throw new Error(e_1);
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post('/insert', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, writer, content, boardData, result, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, title = _a.title, writer = _a.writer, content = _a.content;
                boardData = {
                    title: title,
                    writer: writer,
                    content: content
                };
                return [4 /*yield*/, bc.insertData(boardData)];
            case 1:
                result = (_b.sent()).result;
                if (result)
                    return [2 /*return*/, res.status(201).send({ result: true })];
                return [2 /*return*/, res.status(500).send({ result: false })];
            case 2:
                e_2 = _b.sent();
                throw new Error(e_2);
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/b/:id', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, data, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, bc.detailData(id)];
            case 1:
                data = (_a.sent()).data;
                if (data)
                    return [2 /*return*/, res.status(200).send(data)];
                return [2 /*return*/, res.status(500).send({ result: false })];
            case 2:
                e_3 = _a.sent();
                throw new Error(e_3);
            case 3: return [2 /*return*/];
        }
    });
}); });
router.patch('/delete/:id', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, bc.deleteData(id)];
            case 1:
                result = (_a.sent()).result;
                if (result)
                    return [2 /*return*/, res.status(200).send(result)];
                return [2 /*return*/, res.status(500).send(result)];
            case 2:
                e_4 = _a.sent();
                throw new Error(e_4);
            case 3: return [2 /*return*/];
        }
    });
}); });
router.use('/comment', index_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map