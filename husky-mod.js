/* eslint-disable no-useless-catch */
'use strict';

const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const cp = require('child_process');

const args = process.argv.slice(2);

const moveHusky = args.some((option, index) => {
  if (option === '--moveHusky') {
    return args[index + 1] ? args[index + 1] === 'true' : true;
  } else if (option.startsWith('--moveHusky')) {
    const opt = option.split('=');
    return opt[1] ? opt[1] === 'true' : false;
  }

  return false;
});

async function huskyMod(dir = '.husky_mod') {
  if (cp.spawnSync('git', ['rev-parse']).status !== 0) {
    console.log('Not a git repository. Skipping Husky hooks modification');
    return;
  }

  if (!(await fse.exists('.git'))) {
    console.log('Not a git repository. Skipping Husky hooks modification');
    return;
  }

  const projectDirName = path.basename(__dirname);
  const srcDir = '.husky';
  const destDir = `../${dir}/${projectDirName}`;

  try {
    fse.createFileSync(`${srcDir}/commit-msg`);
    fs.writeFileSync(`${srcDir}/commit-msg`, getCommitMsgContent(), {});
  } catch (error) {
    throw error;
  }

  try {
    fse.createFileSync(`${srcDir}/pre-commit`);
    fs.writeFileSync(`${srcDir}/pre-commit`, getPreCommitContent(), {});
  } catch (error) {
    throw error;
  }

  if (moveHusky) {
    try {
      fse.copySync(srcDir, destDir, {
        overwrite: true,
      });
    } catch (error) {
      throw error;
    }
  }

  if (moveHusky) {
    try {
      fse.remove(srcDir);
    } catch (error) {
      throw error;
    }
  }

  if (moveHusky) {
    const { error } = cp.spawnSync('git', ['config', 'core.hooksPath', destDir]);

    if (error) {
      throw error;
    }
  }

  console.log('Husky hooks modified');
}

function getCommitMsgContent() {
  return `#!/bin/sh

npx commitlint --edit $1
`;
}

function getPreCommitContent() {
  return `#!/bin/sh

PROCESS_DIR="$(pwd)"
DIR_HELPER=$(dirname "$0")

echo "[husky-mod] PROCESS_DIR: $PROCESS_DIR"
echo "[husky-mod] DIR_HELPER: $DIR_HELPER"

REAL_HUSKY_MOD_PROJECT_DIR=$(realpath "$DIR_HELPER")
PROJECT_NAME=$(basename ${moveHusky ? '$REAL_HUSKY_MOD_PROJECT_DIR' : '$(realpath "$REAL_HUSKY_MOD_PROJECT_DIR/../")'})
REAL_PROJECT_DIR=$(realpath "$REAL_HUSKY_MOD_PROJECT_DIR/../../$PROJECT_NAME")

echo "[husky-mod] REAL_HUSKY_MOD_PROJECT_DIR: $REAL_HUSKY_MOD_PROJECT_DIR"
echo "[husky-mod] PROJECT_NAME: $PROJECT_NAME"
echo "[husky-mod] REAL_PROJECT_DIR: $REAL_PROJECT_DIR"

HUSKY_MAJOR_VERSION=$(grep '"husky":' "$REAL_PROJECT_DIR/package.json" | sed -E 's/.*"[~^]?([0-9]+).*/\\1/')
HUSKY_MAJOR_VERSION_IN_NODE_MODULES=$(grep '"version":' "$REAL_PROJECT_DIR/node_modules/husky/package.json" | sed -E 's/.*"([0-9]+).*/\\1/')

echo "[husky-mod] Extracted Husky version from package.json: $HUSKY_MAJOR_VERSION"
echo "[husky-mod] Extracted Husky version from node_modules: $HUSKY_MAJOR_VERSION_IN_NODE_MODULES"

HUSKY_MAJOR_VERSION=$(grep '"husky":' "$REAL_PROJECT_DIR/package.json" | sed -E 's/.*"[~^]?([0-9]+).*/\\1/')
HUSKY_MAJOR_VERSION_IN_NODE_MODULES=$(grep '"version":' "$REAL_PROJECT_DIR/node_modules/husky/package.json" | sed -E 's/.*"([0-9]+).*/\\1/')

echo "[husky-mod] Extracted Husky version from package.json: $HUSKY_MAJOR_VERSION"
echo "[husky-mod] Extracted Husky version from node_modules: $HUSKY_MAJOR_VERSION_IN_NODE_MODULES"

if [ -z "$HUSKY_MAJOR_VERSION" ] || [ -z "$HUSKY_MAJOR_VERSION_IN_NODE_MODULES" ]; then
  echo "[husky-mod] Required version variables are not set"
  exit 1
fi

HUSKY_MAJOR_VERSION_INT=$((HUSKY_MAJOR_VERSION))
HUSKY_MAJOR_VERSION_IN_NODE_MODULES_INT=$((HUSKY_MAJOR_VERSION_IN_NODE_MODULES))

echo "[husky-mod] Husky major version in ./package.json: $HUSKY_MAJOR_VERSION_INT"
echo "[husky-mod] Husky major version in ./node_modules/husky/package.json: $HUSKY_MAJOR_VERSION_IN_NODE_MODULES_INT"

if [ "$HUSKY_MAJOR_VERSION_INT" -ne "$HUSKY_MAJOR_VERSION_IN_NODE_MODULES_INT" ]; then
  echo "[husky-mod] Husky major versions do not match: $HUSKY_MAJOR_VERSION_INT <> $HUSKY_MAJOR_VERSION_IN_NODE_MODULES_INT"
  echo "[husky-mod] You have to reinstall it using 'npm install'"
  exit 1
fi

if [ "$HUSKY_MAJOR_VERSION_INT" -ge 6 ]; then
  echo "[husky-mod] Run new Husky (major version >= 6)"
  "$REAL_HUSKY_MOD_PROJECT_DIR"/_/husky.sh
  (./node_modules/.bin/lint-staged --no-stash && exit 0) || exit 1
elif [ "$HUSKY_MAJOR_VERSION_INT" -gt 0 ]; then
  echo "[husky-mod] Run old Husky (major version < 6)"
  (./.git/hooks/pre-commit "$@" && exit 0) || exit 1
else
  echo "[husky-mod] Can't find Husky in 'package.json'"
  exit 1
fi
`;
}

huskyMod().then();
