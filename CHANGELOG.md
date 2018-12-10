# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Released]

## [1.0.2] - 2018-12-10
### Added
- Added ability to skip nodes.  To be used for external libraries.

### Changed
- Changed the lex and templating to escape values correctly.  Fixes bug.

### Removed
- Nothing.

## [1.0.1] - 2018-04-22
### Added
- Added changelog file.
- Added ability to attach properties to an element.  This is achievable by using the `prop` attribute.

### Changed
- Changed data bridge logic to check that curly braces are used on an element attribute.  This fixes an issue where the using curly braces else where in the template caused an exception.  It's an improvement, but still not fool proof.  Will have to work up a better regex at some point.

### Removed
- Nothing.