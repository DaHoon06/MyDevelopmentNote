"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ToDo_1 = __importDefault(require("./ToDo"));
var router = (0, express_1.Router)();
router.use('/todoList', ToDo_1.default);
exports.default = router;
//# sourceMappingURL=api.js.map