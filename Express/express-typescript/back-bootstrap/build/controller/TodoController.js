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
exports.TodoController = void 0;
var db_1 = require("../db/db");
var mongodb_1 = require("mongodb");
var TodoController = /** @class */ (function () {
    function TodoController() {
    }
    TodoController.prototype.getTodoList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.DB.MongoConn.getInstance.connect()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.db(db_1.DB.NAME).collection(db_1.DB.COLLECTIONS.ToDo).aggregate([
                                { $match: { deleteCheck: '1' } },
                                { $group: {
                                        _id: {
                                            doing: {
                                                $switch: {
                                                    branches: [
                                                        { case: { $eq: ['$doing', '2'] }, then: '?????????' },
                                                        { case: { $eq: ['$doing', '3'] }, then: '??????' },
                                                    ],
                                                    default: '????????????'
                                                }
                                            },
                                            todo_content: '$todo_content',
                                            updatedAt: '$updatedAt',
                                            obId: '$_id'
                                        },
                                    } },
                                { $sort: { '_id': -1 } },
                            ]).toArray()];
                    case 2:
                        exists = _a.sent();
                        if (exists) {
                            return [2 /*return*/, {
                                    result: true,
                                    exists: exists
                                }];
                        }
                        throw new Error('?????? ??????');
                }
            });
        });
    };
    TodoController.prototype.insertData_ToDo = function (toDo) {
        return __awaiter(this, void 0, void 0, function () {
            var client, exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.DB.MongoConn.getInstance.connect()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.db(db_1.DB.NAME).collection(db_1.DB.COLLECTIONS.ToDo).insertOne({
                                todo_content: toDo.todo_content,
                                doing: '1',
                                deleteCheck: '1',
                                createdAt: new Date(),
                                updatedAt: new Date(),
                            })];
                    case 2:
                        exists = _a.sent();
                        if (exists) {
                            return [2 /*return*/, { result: true }];
                        }
                        throw new Error('??????..');
                }
            });
        });
    };
    TodoController.prototype.doing = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var do_id, client, exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        do_id = new mongodb_1.ObjectId(id);
                        return [4 /*yield*/, db_1.DB.MongoConn.getInstance.connect()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.db(db_1.DB.NAME).collection(db_1.DB.COLLECTIONS.ToDo).updateOne({ '_id': do_id }, {
                                '$set': { 'doing': '2', 'updatedAt': new Date },
                            })];
                    case 2:
                        exists = _a.sent();
                        if (exists) {
                            return [2 /*return*/, { result: true }];
                        }
                        return [2 /*return*/, { result: false }];
                }
            });
        });
    };
    TodoController.prototype.complete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var complete_id, client, exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        complete_id = new mongodb_1.ObjectId(id);
                        return [4 /*yield*/, db_1.DB.MongoConn.getInstance.connect()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.db(db_1.DB.NAME).collection(db_1.DB.COLLECTIONS.ToDo).updateOne({ '_id': complete_id }, {
                                '$set': { 'doing': '3', 'updatedAt': new Date },
                            })];
                    case 2:
                        exists = _a.sent();
                        if (exists) {
                            return [2 /*return*/, { result: true }];
                        }
                        return [2 /*return*/, { result: false }];
                }
            });
        });
    };
    TodoController.prototype.deleteData = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var delete_id, client, exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        delete_id = new mongodb_1.ObjectId(id);
                        return [4 /*yield*/, db_1.DB.MongoConn.getInstance.connect()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.db(db_1.DB.NAME).collection(db_1.DB.COLLECTIONS.ToDo).updateOne({ '_id': delete_id }, {
                                '$set': { 'deleteCheck': '2', 'updatedAt': new Date },
                            })];
                    case 2:
                        exists = _a.sent();
                        if (exists) {
                            return [2 /*return*/, { result: true }];
                        }
                        return [2 /*return*/, { result: false }];
                }
            });
        });
    };
    TodoController.prototype.chartData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.DB.MongoConn.getInstance.connect()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.db(db_1.DB.NAME).collection(db_1.DB.COLLECTIONS.ToDo).aggregate([
                                { $match: { deleteCheck: '1', doing: '3' } },
                                { $group: {
                                        _id: { updatedAt: '$updatedAt' }
                                    } }
                            ]).toArray()];
                    case 2:
                        exists = _a.sent();
                        if (exists) {
                            return [2 /*return*/, {
                                    result: true,
                                    exists: exists
                                }];
                        }
                        return [2 /*return*/, { result: false }];
                }
            });
        });
    };
    return TodoController;
}());
exports.TodoController = TodoController;
//# sourceMappingURL=TodoController.js.map