"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var DataController = (0, express_1.default)();
DataController.get('/:keyword?', function (req, res) {
    console.log('검색 키워드 작성중...');
});
exports.default = DataController;
//# sourceMappingURL=DataController.js.map