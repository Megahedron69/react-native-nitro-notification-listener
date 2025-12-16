# Publishing Checklist for react-native-nitro-notification-listener

## 🧪 **CURRENT PHASE: TESTING** 🧪

**You are here!** Follow the testing instructions below before publishing.

---

## ✅ Phase 1: Core Development (Must-Have for Initial Release)

### Code Quality & Functionality

- [x] Basic notification listening works
- [x] Start/Stop functionality implemented
- [x] Permission checking implemented
- [x] Auto-initialization via ContentProvider
- [x] **Error handling**: Add try-catch blocks in all async methods ✅
- [x] **Service lifecycle**: Handle app killed/restarted scenarios ✅
- [x] **Memory leaks**: Ensure listeners are properly cleaned up ✅
- [x] **Thread safety**: Check concurrent access to listener list ✅
- [ ] **Edge cases**: Handle when service is disabled by user after granting permission

### Testing

- [ ] Create unit tests for TypeScript code
- [ ] Test on multiple Android versions (8.0+)
- [ ] Test on different devices (Samsung, Pixel, etc.)
- [ ] Test with different notification types (ongoing, silent, conversations)
- [ ] Test permission edge cases (deny, grant, revoke while app running)
- [ ] Test app background/foreground scenarios
- [ ] Test app restart scenarios

### Documentation (Critical)

- [ ] Complete README with all sections (see below)
- [ ] Add inline code comments in complex areas
- [ ] Create API documentation
- [ ] Add troubleshooting section
- [ ] Create migration guide (if applicable)

---

## ✅ Phase 2: Documentation (Required Before Publishing)

### README.md Must Include:

- [x] **Clear description** of what the library does ✅
- [x] **Installation instructions** (npm/yarn + linking) ✅
- [x] **Expo configuration** instructions ✅
- [x] **Android setup** (permissions, manifest) ✅
- [x] **Basic usage example** with TypeScript ✅
- [x] **API Reference**: ✅
  - [x] `start()` - Description, parameters, return type
  - [x] `stop()` - Description, parameters, return type
  - [x] `hasPermission()` - Description, parameters, return type
  - [x] `requestPermission()` - Description, parameters, return type
  - [x] `addListener()` - Description, parameters, return type, callback structure
  - [x] `removeListener()` - Description, parameters, return type
- [x] **NotificationEvent interface** documentation ✅
- [x] **Platform support** (Android only, min SDK version) ✅
- [x] **Known limitations** ✅
- [x] **Troubleshooting guide** ✅
- [x] **Example app** reference ✅
- [x] **Contributing guidelines** link ✅
- [x] **License** information ✅

### Additional Docs to Create:

- [x] **CHANGELOG.md** - Version history (start with 0.1.0) ✅
- [x] **CONTRIBUTING.md** - How others can contribute ✅
- [x] **LICENSE** file (MIT license already specified) ✅
- [ ] **CODE_OF_CONDUCT.md** (optional but recommended)

---

## ✅ Phase 3: Package Configuration

### package.json

- [ ] Set correct version (start with `0.1.0` for initial release) - NEEDS UPDATING
- [ ] Verify all `files` are correct (no missing, no extra)
- [ ] Check `peerDependencies` versions are correct
- [ ] Add `engines` field to specify Node/npm versions
- [ ] Add proper `keywords` for discoverability
- [ ] Verify `repository` URL is correct
- [ ] Add `funding` field (optional - GitHub sponsors, etc.)
- [ ] Ensure `license` field is correct

### Create These Files:

- [x] **.npmignore** - Exclude unnecessary files from npm package ✅
- [x] **.gitignore** - Already exists, verify it's complete ✅
- [x] **LICENSE** - Add MIT license file ✅

---

## ✅ Phase 4: Code Improvements (Before v1.0)

### Critical Features to Add:

- [ ] **Notification filters**: Allow filtering by package name
- [ ] **Notification actions**: Support for inline actions/buttons
- [ ] **Notification removal events**: Detect when notifications are dismissed
- [ ] **Rich notification data**: Extract images, big text, inbox style
- [ ] **Notification groups**: Handle notification groups/stacks
- [ ] **Error callbacks**: Add error handling in listeners
- [ ] **TypeScript generics**: Better type safety for events

### Code Structure:

- [ ] Extract helper functions to separate files
- [ ] Add JSDoc comments to all exported functions
- [ ] Implement proper error types/classes
- [ ] Add validation for inputs
- [ ] Create constants file for magic strings

### Performance:

- [ ] Debounce rapid notification events
- [ ] Limit notification history size (configurable)
- [ ] Optimize re-renders in React
- [ ] Profile memory usage

---

## ✅ Phase 5: Repository Setup

### GitHub Repository:

- [ ] Create proper README with badges (npm version, license, etc.)
- [ ] Set up GitHub Actions for CI/CD:
  - [ ] Lint check
  - [ ] TypeScript compilation
  - [ ] Build Android library
  - [ ] Run tests
- [ ] Create issue templates (bug, feature request)
- [ ] Create PR template
- [ ] Add GitHub topics/tags
- [ ] Enable GitHub Discussions (for Q&A)
- [ ] Create example GIFs/videos for README

### Version Control:

- [ ] Clean up commit history (squash if needed)
- [ ] Create `main` and `develop` branches
- [ ] Tag releases properly (v0.1.0, etc.)
- [ ] Write meaningful commit messages

---

## ✅ Phase 6: Pre-Publishing

### Quality Checks:

- [ ] Run `npm run lint` and fix all issues
- [ ] Run `npm run typecheck` and fix all errors
- [ ] Run `npm run build` successfully
- [ ] Test installation in a fresh project
- [ ] Verify all files in published package (`npm pack` and inspect)
- [ ] Check bundle size (keep it minimal)

### Security:

- [ ] Audit dependencies (`npm audit`)
- [ ] Remove unused dependencies
- [ ] Check for known vulnerabilities
- [ ] Add security policy (SECURITY.md)

### Legal:

- [ ] Ensure you have rights to publish
- [ ] Verify license compatibility with dependencies
- [ ] Add copyright notices if needed

---

## ✅ Phase 7: Publishing

### NPM Publishing:

1. [ ] Create npm account (if not already)
2. [ ] Run `npm login`
3. [ ] Update version in package.json (semantic versioning)
4. [ ] Create git tag: `git tag v0.1.0`
5. [ ] Push tag: `git push origin v0.1.0`
6. [ ] Run `npm publish --access public`
7. [ ] Verify package on npmjs.com
8. [ ] Create GitHub release with changelog

### Post-Publishing:

- [ ] Announce on:
  - [ ] Twitter/X
  - [ ] Reddit (r/reactnative)
  - [ ] Dev.to
  - [ ] React Native Community Discord
  - [ ] GitHub Discussions
- [ ] Update any related documentation
- [ ] Monitor issues/questions

---

## ✅ Phase 8: Ongoing Maintenance

### Regular Tasks:

- [ ] Respond to issues within 48 hours
- [ ] Review and merge PRs
- [ ] Update dependencies quarterly
- [ ] Release patches for bugs
- [ ] Plan feature releases (minor/major versions)
- [ ] Keep documentation updated
- [ ] Monitor analytics (npm downloads, GitHub stars)

### Future Enhancements (v0.2.0+):

- [ ] iOS support (if possible)
- [ ] Notification click handling
- [ ] Custom notification parsing
- [ ] Notification history persistence
- [ ] React hooks for easier integration
- [ ] Expo plugin improvements
- [ ] Web preview (for debugging)

---

## 📋 Immediate Action Items (Priority Order)

### Before First Publish (v0.1.0):

1. **Fix Critical Issues**:
   - Add proper error handling
   - Test on multiple devices/Android versions
   - Ensure no memory leaks

2. **Documentation**:
   - Rewrite README completely (see template below)
   - Add API reference
   - Create CHANGELOG.md
   - Add LICENSE file

3. **Package Prep**:
   - Create .npmignore
   - Update package.json version to 0.1.0
   - Test `npm pack` output

4. **Testing**:
   - Test in a fresh React Native project
   - Test in a fresh Expo project
   - Test all API methods

5. **Publish**:
   - Create git tag
   - npm publish
   - Create GitHub release

---

## ✅ v0.1.0 Published - December 16, 2025

---

## 📝 README Template (Copy & Customize)

````markdown
# react-native-nitro-notification-listener

🔔 Real-time Android NotificationListenerService for React Native using Nitro Modules

[![npm version](https://img.shields.io/npm/v/react-native-nitro-notification-listener.svg)](https://www.npmjs.com/package/react-native-nitro-notification-listener)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Android](https://img.shields.io/badge/Platform-Android-green.svg)](https://www.android.com/)

## Features

✅ Real-time notification monitoring
✅ Full TypeScript support
✅ Zero native configuration needed
✅ Built with Nitro Modules for optimal performance
✅ Supports Android 8.0+
✅ Automatic permission handling

## Installation

```bash
npm install react-native-nitro-notification-listener
# or
yarn add react-native-nitro-notification-listener
```
````

## Usage

[Add your usage example here]

## API Reference

[Add your API docs here]

## Platform Support

- ✅ Android (8.0+)
- ❌ iOS (Not supported - iOS doesn't allow notification listening)

## Requirements

- React Native 0.70+
- Android minSdkVersion 26+
- react-native-nitro-modules

## Example

See the [example app](./example) for a complete implementation.

## Troubleshooting

[Add common issues and solutions]

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT

## Author

[Your name/organization]

```

---

## 🎯 Success Metrics

Track these after publishing:
- npm downloads per week
- GitHub stars
- Issues opened vs. resolved
- Community engagement
- Forks and PRs
- Documentation clarity (fewer "how to" issues)

---

## ⚠️ Red Flags to Avoid

- [ ] Publishing without testing on real devices
- [ ] No documentation or unclear docs
- [ ] Ignoring error handling
- [ ] Not responding to issues
- [ ] Breaking changes without major version bump
- [ ] Missing license
- [ ] Shipping dev dependencies
- [ ] No changelog
```
