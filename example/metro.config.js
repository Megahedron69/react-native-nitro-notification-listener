const path = require('path')
const { getDefaultConfig } = require('expo/metro-config')

const projectRoot = __dirname
const nitroModuleRoot = path.resolve(projectRoot, '..')

const config = getDefaultConfig(projectRoot)

// 1️⃣ Watch the Nitro library
config.watchFolders = [nitroModuleRoot]

// 2️⃣ Resolve modules primarily from the Expo app
config.resolver.nodeModulesPaths = [path.resolve(projectRoot, 'node_modules')]

// ❌ DO NOT disable hierarchical lookup for Expo
// config.resolver.disableHierarchicalLookup = true;

module.exports = config
