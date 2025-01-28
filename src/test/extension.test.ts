import * as assert from 'assert';
import * as sinon from 'sinon';
import * as vscode from 'vscode';

import { getAllowedExtensions  } from '../extension';
import { defaultFileExtensions } from '../constants';

describe('Extension Tests', () => {
    let configStub: sinon.SinonStub;
    let showInfoStub: sinon.SinonStub;

    beforeEach(() => {
        // Stub vscode.workspace.getConfiguration
        configStub = sinon.stub(vscode.workspace, 'getConfiguration');

        // Stub vscode.window.showInformationMessage
        showInfoStub = sinon.stub(vscode.window, 'showInformationMessage');
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('getAllowedExtensions', () => {
        it('should return default extensions when no extra extensions are set', () => {
            configStub.withArgs('easyToChange').returns({
                get: sinon.stub().withArgs('extraExtensions').returns([])
            });

            const allowed = getAllowedExtensions();
            defaultFileExtensions.forEach(ext => {
                assert.ok(allowed.has(ext), `Missing default extension: ${ext}`);
            });
            assert.strictEqual(allowed.size, defaultFileExtensions.length, 'Allowed extensions size mismatch');
        });

        it('should include extra extensions from configuration', () => {
            const extra = ['.md', '.txt'];
            configStub.withArgs('easyToChange').returns({
                get: sinon.stub().withArgs('extraExtensions').returns(extra)
            });

            const allowed = getAllowedExtensions();
            defaultFileExtensions.forEach(ext => {
                assert.ok(allowed.has(ext), `Missing default extension: ${ext}`);
            });
            extra.forEach(ext => {
                assert.ok(allowed.has(ext), `Missing extra extension: ${ext}`);
            });
            assert.strictEqual(allowed.size, defaultFileExtensions.length + extra.length, 'Allowed extensions size mismatch');
        });

        it('should handle case insensitivity in extraExtensions', () => {
            const extra = ['.Md', '.TXT'];
            configStub.withArgs('easyToChange').returns({
                get: sinon.stub().withArgs('extraExtensions').returns(extra)
            });

            const allowed = getAllowedExtensions();
            assert.ok(allowed.has('.md'), 'Missing lowercased .md extension');
            assert.ok(allowed.has('.txt'), 'Missing lowercased .txt extension');
        });

        it('should handle empty extra extensions array', () => {
            configStub.withArgs('easyToChange').returns({
                get: sinon.stub().withArgs('extraExtensions').returns([])
            });

            const allowed = getAllowedExtensions();
            assert.strictEqual(allowed.size, defaultFileExtensions.length, 'Allowed extensions size should match defaultExtensions');
        });

        it('should default to default file extensions when extra extensions is undefined', () => {
            configStub.withArgs('easyToChange').returns({
                get: sinon.stub().withArgs('extraExtensions').returns(undefined)
            });

            const allowed = getAllowedExtensions();
            assert.strictEqual(allowed.size, defaultFileExtensions.length, 'Allowed extensions size should match defaultExtensions');
            defaultFileExtensions.forEach(ext => {
                assert.ok(allowed.has(ext), `Missing default extension: ${ext}`);
            });
        });

        it('should ignore invalid types in extraExtensions and default to defaultExtensions', () => {
            configStub.withArgs('easyToChange').returns({
                get: sinon.stub().withArgs('extraExtensions').returns(null)
            });

            const allowed = getAllowedExtensions();
            assert.strictEqual(allowed.size, defaultFileExtensions.length, 'Allowed extensions size should match defaultExtensions');
            defaultFileExtensions.forEach(ext => {
                assert.ok(allowed.has(ext), `Missing default extension: ${ext}`);
            });
        });
    });
});
