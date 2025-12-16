# Contributing to react-native-nitro-notification-listener

Thank you for your interest in contributing! 🎉

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/Megahedron69/react-native-nitro-notification-listener/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Device/Android version
   - Code sample (if applicable)
   - Screenshots/logs

### Suggesting Features

1. Check existing [Issues](https://github.com/Megahedron69/react-native-nitro-notification-listener/issues) and [Discussions](https://github.com/Megahedron69/react-native-nitro-notification-listener/discussions)
2. Create a new issue with:
   - Clear use case description
   - Why this feature would be useful
   - Proposed API (if applicable)

### Pull Requests

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/YOUR_USERNAME/react-native-nitro-notification-listener.git`
3. **Create a branch**: `git checkout -b feature/my-feature` or `git checkout -b fix/my-fix`
4. **Make your changes**:
   - Follow existing code style
   - Add tests if applicable
   - Update documentation
5. **Test your changes**:
   - Run `npm run lint`
   - Run `npm run typecheck`
   - Run `npm run build`
   - Test in the example app
6. **Commit**: Use clear, descriptive commit messages
   - Format: `type: description`
   - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
   - Example: `feat: add notification filter by package name`
7. **Push**: `git push origin feature/my-feature`
8. **Create Pull Request**:
   - Describe what you changed and why
   - Reference related issues
   - Include screenshots/GIFs if UI changes

### Development Setup

```bash
# Install dependencies
npm install

# Generate Nitro code
npm run specs

# Build TypeScript
npm run build

# Run example app
cd example
npm install
npx expo run:android
```

### Code Style

- Use TypeScript
- Follow existing code formatting (Prettier)
- Add JSDoc comments for public APIs
- Keep functions small and focused
- Write meaningful variable names

### Testing

- Test on multiple Android versions (8.0+)
- Test on different devices if possible
- Test edge cases (permissions, app restart, etc.)

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the issue, not the person
- Help create a welcoming environment

## Questions?

Feel free to ask in [Discussions](https://github.com/Megahedron69/react-native-nitro-notification-listener/discussions) or create an issue.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
