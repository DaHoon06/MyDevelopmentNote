"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var boardController_1 = __importDefault(require("./board/boardController"));
var userController_1 = __importDefault(require("./user/userController"));
var verifyTokenController_1 = __importDefault(require("./user/verifyTokenController"));
var controller = (0, express_1.default)();
controller.use('/board', boardController_1.default);
controller.use('/user', userController_1.default);
controller.use('/verify', verifyTokenController_1.default);
exports.default = controller;
//# sourceMappingURL=controller.js.map