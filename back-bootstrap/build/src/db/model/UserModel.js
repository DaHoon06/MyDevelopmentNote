"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var schema = mongoose_1.default.Schema;
var userSchema = new schema({
    email: String,
    pw: String,
    name: String,
});
var User = mongoose_1.default.model('User', userSchema);
exports.User = User;
//# sourceMappingURL=UserModel.js.map