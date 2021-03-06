"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteFilesFeature = exports.DidSaveTextDocumentNotificationType = void 0;
const os = require("os");
const path = require("path");
const vscode = require("vscode");
const vscode_languageclient_1 = require("vscode-languageclient");
const languageClientConsumer_1 = require("../languageClientConsumer");
exports.DidSaveTextDocumentNotificationType = new vscode_languageclient_1.NotificationType("textDocument/didSave");
class RemoteFilesFeature extends languageClientConsumer_1.LanguageClientConsumer {
    constructor() {
        super();
        // Get the common PowerShell Editor Services temporary file path
        // so that remote files from previous sessions can be closed.
        this.tempSessionPathPrefix =
            path.join(os.tmpdir(), "PSES-")
                .toLowerCase();
        // At startup, close any lingering temporary remote files
        this.closeRemoteFiles();
        vscode.workspace.onDidSaveTextDocument((doc) => {
            if (this.isDocumentRemote(doc) && this.languageClient) {
                this.languageClient.sendNotification(exports.DidSaveTextDocumentNotificationType, {
                    textDocument: vscode_languageclient_1.TextDocumentIdentifier.create(doc.uri.toString()),
                });
            }
        });
    }
    dispose() {
        // Close any leftover remote files before exiting
        this.closeRemoteFiles();
    }
    isDocumentRemote(doc) {
        return doc.fileName.toLowerCase().startsWith(this.tempSessionPathPrefix);
    }
    closeRemoteFiles() {
        const remoteDocuments = vscode.workspace.textDocuments.filter((doc) => this.isDocumentRemote(doc));
        function innerCloseFiles() {
            if (remoteDocuments.length > 0) {
                const doc = remoteDocuments.pop();
                return vscode.window
                    .showTextDocument(doc)
                    .then((editor) => vscode.commands.executeCommand("workbench.action.closeActiveEditor"))
                    .then((_) => innerCloseFiles());
            }
        }
        innerCloseFiles();
    }
}
exports.RemoteFilesFeature = RemoteFilesFeature;
//# sourceMappingURL=RemoteFiles.js.map