"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = __importStar(require("Express/express-typescript/back-express/build/src/db/mongoose"));
var mongoose_1 = require("Express/express-typescript/back-express/build/src/db/mongoose");
exports.default = (function () {
    function connection() {
        mongoose.connect('mongodb://root:ekgns00@localhost:27017/local?authSource=admin&authMechanism=SCRAM-SHA-1', { dbName: 'simpleWebSite' }, function (err) {
            if (err) {
                console.log("DB ERR.. " + err);
            }
            console.log('DB 연결 되었습니다.');
        });
    }
    connection();
    //연결이 끊어지면 다시 연결을 요청
    mongoose.connection.on('disconnected', mongoose_1.connect);
});
//# sourceMappingURL=mongoose.js.map