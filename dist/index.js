#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isCommand(value) {
    return value === 'greet' || value === 'add' || value === 'help';
}
const commands = {
    greet: (args) => {
        const name = args[0] || 'World';
        console.log(`Hello, ${name}!`);
    },
    add: (args) => {
        const num1 = Number(args[0]);
        const num2 = Number(args[1]);
        if (!Number.isFinite(num1) || !Number.isFinite(num2)) {
            console.error('Error: Please provide two valid numbers');
            return;
        }
        console.log(`Result: ${num1 + num2}`);
    },
    help: () => {
        console.log(`
Available commands:
  greet [name]     - Greet someone
  add [a] [b]      - Add two numbers  
  help             - Show this help message
    `);
    }
};
// Main execution
const [command, ...args] = process.argv.slice(2);
if (isCommand(command)) {
    commands[command](args);
}
else {
    console.error('Unknown command. Try "help"');
    process.exit(1);
}
//# sourceMappingURL=index.js.map