"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ToDoController_1 = __importDefault(require("./ToDo/ToDoController"));
var controller = (0, express_1.default)();
controller.use('/todoList', ToDoController_1.default);
exports.default = controller;
//# sourceMappingURL=controller.js.map