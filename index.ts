#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";


// Initialize user balance and pin code 
let myBalance = 5000;
let myPin = 1406;

// Print Welcome message
console.log(chalk.blue("\n \tWelcome to Mariam Niazi - ATM Machine\n"));

let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        Type: "number",
        message: chalk.yellow("Enter your pin code:")
    }
])
if(pinAnswer.pin == myPin){
    console.log(chalk.green("\nPin is Correct, Login Succesfully!\n"));
   // console.log(`Current Account Balance is ${myBalance}`)

    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "Select an operation:",
            choices: ["withdrawAmmount", "Check Balance"]
        }
    ])

    if(operationAns.operation === "withdrawAmmount"){
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "select a withdraw method",
                choices: ["fastCash", "enterAmount"]
            }
        ])
        if(withdrawAns.withdrawMethod === "fastCash"){
            let fastCashAns = await inquirer.prompt ([
                {
                    name: "fastCash",
                    type: "list",
                    message: "select amount:",
                    choices: [1000, 2000, 3000, 4000, 5000, 10000, 20000]
                }
            ])
            if(fastCashAns.fastCash > myBalance){
                console.log(chalk.red("Insufficient Balance"));
            }
            else{
                myBalance -= fastCashAns.fastCash
                console.log(`${fastCashAns.fastCash} withdraw Succesfully`);
                console.log(`Your Remaining Balance is ${myBalance}`)
            }
        }
        else if(withdrawAns.withdrawMethod === "enterAmount"){
            let amountAns = await inquirer.prompt ([
                {
                    name: "amount",
                    type: "number",
                    message: "enter the amount to withdraw:"
                }
            ])
            if(amountAns.amount > myBalance){
                console.log(chalk.red("Insufficient Balance"));
            }
            else{
                myBalance -= amountAns.amount;
                console.log(`${amountAns.amount} withdraw Successfully`)
                console.log(`Your Remaining Balance is: ${myBalance}`)
            }
        }
    }
    else if (operationAns.operation === "Check Balance"){
        console.log(`Your Account Balance Is: ${myBalance}`);
    }
}
else{
    console.log(chalk.red("Pin is Incorrect, Try Again!"));
}