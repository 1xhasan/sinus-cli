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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var inquirer_1 = require("inquirer");
var web3_js_1 = require("@solana/web3.js");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var keyword, action, cluster, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("Welcome to Solana CLI \n");
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: "input",
                                name: "keyword",
                                message: 'Type "solana" to continue:',
                                validate: function (input) {
                                    return input.trim().toLowerCase() === "solana" ||
                                        'You must type exactly "solana" to continue.';
                                },
                            },
                        ])];
                case 1:
                    keyword = (_b.sent()).keyword;
                    console.log("Great! Let’s proceed.\n");
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: "list",
                                name: "action",
                                message: "What do you want to do?",
                                choices: ["transfer", "swap", "rent", "airdrop"],
                            },
                        ])];
                case 2:
                    action = (_b.sent()).action;
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: "list",
                                name: "cluster",
                                message: "Select network:",
                                choices: ["devnet", "testnet", "mainnet-beta"],
                                default: "devnet",
                            },
                        ])];
                case 3:
                    cluster = (_b.sent()).cluster;
                    console.log("\nAction: ".concat(action));
                    console.log("Network: ".concat(cluster, "\n"));
                    _a = action;
                    switch (_a) {
                        case "transfer": return [3 /*break*/, 4];
                        case "airdrop": return [3 /*break*/, 6];
                    }
                    return [3 /*break*/, 8];
                case 4: return [4 /*yield*/, handleTransfer(cluster)];
                case 5:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 6: return [4 /*yield*/, handleAirdrop(cluster)];
                case 7:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 8:
                    console.log("".concat(action, " not implemented yet."));
                    _b.label = 9;
                case 9: return [2 /*return*/];
            }
        });
    });
}
// ========== ACTION HANDLERS ==========
function handleTransfer(cluster) {
    return __awaiter(this, void 0, void 0, function () {
        var connection, _a, recipient, amount, secretKeyPath, keyData, sender, recipientPubkey, tx, sig, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)(cluster), "confirmed");
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: "input",
                                name: "recipient",
                                message: "Enter recipient wallet address:",
                                validate: function (input) {
                                    return input && input.length > 30 ? true : "Invalid address";
                                },
                            },
                            {
                                type: "number",
                                name: "amount",
                                message: "Enter amount (in Lamports):",
                                validate: function (n) { return typeof n === 'number' && n > 0 || "Amount must be greater than 0"; },
                            },
                            {
                                type: "input",
                                name: "secretKeyPath",
                                message: "Enter path to your sender secret key file (e.g., ~/.config/solana/id.json):",
                                default: "".concat(process.env.HOME, "/.config/solana/id.json"),
                            },
                        ])];
                case 1:
                    _a = _b.sent(), recipient = _a.recipient, amount = _a.amount, secretKeyPath = _a.secretKeyPath;
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, Promise.resolve("".concat("file://".concat(secretKeyPath))).then(function (s) { return require(s); })];
                case 3:
                    keyData = _b.sent();
                    sender = web3_js_1.Keypair.fromSecretKey(Uint8Array.from(keyData.default));
                    recipientPubkey = new web3_js_1.PublicKey(recipient);
                    console.log("\nSender: ".concat(sender.publicKey.toBase58()));
                    console.log("Sending ".concat(amount, " SOL to ").concat(recipient, " on ").concat(cluster, "..."));
                    tx = new web3_js_1.Transaction().add(web3_js_1.SystemProgram.transfer({
                        fromPubkey: sender.publicKey,
                        toPubkey: recipientPubkey,
                        lamports: amount * web3_js_1.LAMPORTS_PER_SOL,
                    }));
                    return [4 /*yield*/, (0, web3_js_1.sendAndConfirmTransaction)(connection, tx, [sender])];
                case 4:
                    sig = _b.sent();
                    console.log("Success! Tx: https://explorer.solana.com/tx/".concat(sig, "?cluster=").concat(cluster));
                    return [3 /*break*/, 6];
                case 5:
                    err_1 = _b.sent();
                    console.error("Transfer failed:", err_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function handleAirdrop(cluster) {
    return __awaiter(this, void 0, void 0, function () {
        var connection, _a, publicKey, amount, sig, err_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)(cluster), "confirmed");
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            { type: "input", name: "publicKey", message: "Enter wallet address to airdrop SOL to:" },
                            { type: "number", name: "amount", message: "Enter amount (in SOL):" },
                        ])];
                case 1:
                    _a = _b.sent(), publicKey = _a.publicKey, amount = _a.amount;
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, connection.requestAirdrop(new web3_js_1.PublicKey(publicKey), amount * web3_js_1.LAMPORTS_PER_SOL)];
                case 3:
                    sig = _b.sent();
                    console.log("Airdrop requested! Tx: https://explorer.solana.com/tx/".concat(sig, "?cluster=").concat(cluster));
                    return [3 /*break*/, 5];
                case 4:
                    err_2 = _b.sent();
                    console.error("Airdrop failed:", err_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
main().catch(function (err) { return console.error(err); });
