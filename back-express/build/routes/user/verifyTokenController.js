"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var verifyTokenController = express_1.default();
//토큰 유효성 검사
verifyTokenController.get('/', function (req, res) {
});
exports.default = verifyTokenController;
//# sourceMappingURL=verifyTokenController.js.map