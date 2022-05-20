"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ToDoController = (0, express_1.default)();
ToDoController.post('/insert', function (req, res, next) {
    console.log('TODO 입력');
});
exports.default = ToDoController;
//# sourceMappingURL=Index.js.map