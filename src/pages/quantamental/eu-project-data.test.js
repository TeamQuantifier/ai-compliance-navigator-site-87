import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as data from './eu-project-data.ts';
test('Project identifier matches funding specification', () => assert.equal(data.projectNumber, 'POPW.01.01.02-06-0044/21'));
test('Localized project paths preserve required trailing slashes', () => assert.deepEqual(data.projectPaths, {pl:'/projekt-ue/', en:'/en/eu-project/', de:'/de/eu-projekt/', es:'/es/proyecto-ue/'}));
test('Every project locale has four planned effects', () => { for (const c of Object.values(data.projectCopy)) assert.equal(c.effects.length, 4); });
test('Every project locale has five modules', () => { for (const c of Object.values(data.projectCopy)) assert.equal(c.modules.length, 5); });
test('Every project locale has three stages', () => { for (const c of Object.values(data.projectCopy)) assert.equal(c.stageNames.length, 3); });