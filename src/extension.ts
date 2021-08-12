// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import fetch from "node-fetch";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

const updateStatusBar = () => {
  // Fetch the current price
  fetch("https://api.coindesk.com/v1/bpi/currentprice/BTC.json")
    .then((res: { json: () => any }) => res.json())
    .then((data: { bpi: { USD: { rate: string } } }) => {
      // Update the status bar
      vscode.window.setStatusBarMessage(`BTC: \$${data.bpi.USD.rate}`);
    })
    .catch((err: any) => {
      // Display an error message box to the user
      vscode.window.showErrorMessage(
        `Failed to update BitCoin's price: ${err}`
      );
    });
};

export function activate(context: vscode.ExtensionContext) {
  updateStatusBar();

  // Update the price every minute
  setInterval(updateStatusBar, 60 * 1000);

  const disposable = vscode.commands.registerCommand(
    "bitcoin-manager.updatePrice",
    () => {

      updateStatusBar();

      // Display a message box to the user
      vscode.window.showInformationMessage("Price updated!");
    }
  );

  context.subscriptions.push(disposable);
}
