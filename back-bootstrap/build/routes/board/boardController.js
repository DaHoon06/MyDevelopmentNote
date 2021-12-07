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
var express_1 = __importDefault(require("express"));
var BoardModel_1 = require("../../src/db/model/BoardModel");
var paging_1 = __importDefault(require("./paging"));
var commentController_1 = __importDefault(require("./commentController"));
var boardController = (0, express_1.default)();
//답변
boardController.use('/comment', commentController_1.default);
//GET
boardController.get('/:page?', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var page, $count, allCount, _a, startPage, endPage, hidePost, maxPost, totalPage, currentPage;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log('Posts GET !!!');
                page = req.query;
                console.log(page + ' : PAGE');
                $count = { $count: "allCount" };
                if (page === undefined) {
                    page: 1;
                }
                return [4 /*yield*/, BoardModel_1.Board.aggregate([
                        $count
                    ]).exec()];
            case 1:
                allCount = (_b.sent())[0].allCount;
                _a = (0, paging_1.default)(page, allCount), startPage = _a.startPage, endPage = _a.endPage, hidePost = _a.hidePost, maxPost = _a.maxPost, totalPage = _a.totalPage, currentPage = _a.currentPage;
                console.log(currentPage + ' : ' + endPage + ' : ' + totalPage + ' : ' + startPage + ' maxPost');
                BoardModel_1.Board.find((function (err, boards) {
                    if (err) {
                        return res.status(500).send({ err: 'DB Failure' });
                    }
                    res.json({
                        board: boards,
                        totalPage: totalPage,
                        startPage: startPage,
                        currentPage: currentPage,
                    });
                })).sort({ "_id": -1 }).skip(hidePost).limit(maxPost);
                return [2 /*return*/];
        }
    });
}); });
//DETAIL
boardController.get('/b/:id', function (req, res) {
    console.log('Posts GET :ID !!!' + req.params.id);
    BoardModel_1.Board.findOne({ _id: req.params.id }, function (err, boards) {
        if (err) {
            return res.status(500).json({ err: err });
        }
        if (!boards) {
            return res.status(404).json({ err: 'board not found...' });
        }
        console.log(boards);
        res.json({
            board: boards,
        });
    });
});
//INSERT
boardController.post('/', function (req, res) {
    console.log('Posts POST !!!');
    console.log(req.body);
    var body = req.body;
    var insertBoard = new BoardModel_1.Board();
    insertBoard.board_title = body.board_title;
    insertBoard.board_content = body.board_content;
    insertBoard.board_writer = '전다훈';
    insertBoard.created_at = new Date();
    insertBoard.updated_at = new Date();
    insertBoard.save(function (err) {
        if (err) {
            console.log('작성 실패..' + err);
            res.json({ result: 0 });
            return;
        }
        res.json({ result: 1 });
    });
});
//UPDATE
boardController.put('/:id', (function (req, res) {
    BoardModel_1.Board.findById(req.params.id, function (err, boards) {
        var body = req.body;
        console.log('Posts PUT !!!');
        if (err) {
            return res.status(500).json({ err: 'database failure' });
        }
        if (!boards) {
            return res.status(404).json({ err: 'board not found...' });
        }
        boards.board_title = body.board_title;
        boards.board_content = body.board_content;
        boards.updated_at = new Date();
        boards.save(function (err) {
            if (err) {
                return res.status(500).json({ err: 'failed to update...' });
            }
            res.json({ result: 1 });
        });
    });
}));
//DELETE
boardController.delete('/:id', function (req, res) {
    BoardModel_1.Board.remove({ _id: req.params.id }, function (err) {
        if (err) {
            return res.status(500).json({ err: 'DELETE FAILED...' });
        }
        res.status(204).end();
    });
});
boardController.get('/search/:keyword', function (req, res) {
    console.log('검색 중....', req.params.keyword);
    BoardModel_1.Board.find({
        board_title: req.params.keyword
    }, function (err, boards) {
        if (err) {
            return res.status(500).send({ err: 'DB Failure' });
        }
        console.log(boards);
        res.json({
            board: boards,
            data: req.params.keyword,
        });
    });
});
exports.default = boardController;
//# sourceMappingURL=boardController.js.map