import * as vscode from 'vscode';
import * as path from 'path';
import { defaultFileExtensions } from './constants';

const configKey = 'extraExtensions' as const;

export function getAllowedExtensions() {
	const settings = vscode.workspace.getConfiguration('easyToChange');
	const extraExtensions = settings.get<string[]>(configKey) || [];
	return new Set([...defaultFileExtensions, ...extraExtensions]);
}

export function activate(context: vscode.ExtensionContext) {

	const disposable = vscode.workspace.onDidSaveTextDocument((doc) => {
		const allowedExtensions = getAllowedExtensions();

		const fileExt = path.extname(doc.fileName).toLowerCase();
		if (allowedExtensions.has(fileExt)) {
			vscode.window.showInformationMessage('Is your code easy to change?');
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
