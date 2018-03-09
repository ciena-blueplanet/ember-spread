# Overview

## Does this PR close an existing issue?
No PR should be opened without opening an issue first.  Any change needs to be discussed before proceeding.

## Summary
Provide a general summary of the issue addressed in the title above

## Issue Number(s)
Which issue(s) does this PR address?

Put `Closes #XXXX` below to auto-close the issue that this PR addresses:

* Closes #

## Screenshots or recordings
Please provide screenshots or recordings if this PR is modifying the visual UI or UX.

## Checklist
* [ ] I have added tests that prove my fix is effective or that my feature works
* [ ] I have evaluated if the _README.md_ documentation needs to be updated
* [ ] I have evaluated if the _/tests/dummy/_ app needs to be modified
* [ ] I have evaluated if DocBlock headers needed to be added or updated
* [ ] I have verified that lint and tests pass locally with my changes
* [ ] If a fork of a dependent package had to be made to address the issue this PR closes:
  * [ ] I noted in the fork's _README.md_ the reason the fork was created
  * [ ] I have opened an upstream issue detailing what was deficient about the dependency
  * [ ] I have opened an upstream PR addressing this deficiency
  * [ ] I have opened an issue in this repository to track this PR and schedule the removal of the usage of the fork


# Semver

**This project uses [semver](http://semver.org), please check the scope of this PR:**

- [ ] #none#
- [ ] #patch#
- [ ] #minor#
- [ ] #major#

Examples:
* **NONE**
  * _README.md_ changes
  * test additions
  * changes to files that are not used by a consuming application (_.travis.yml_, _.gitignore_, etc)
* **PATCH**
  * backwards-compatible bug fix
    * nothing about how to use the code has changed
    * nothing about the outcome of the code has changed (though it likely corrected it)
  * changes to demo app (_/tests/dummy/_)
* **MINOR**
  * adding functionality in a backwards-compatible manner
    * nothing about how used to use the code has changed but using it in a new way will do new things
    * nothing about the outcome of the code has changed without having to first use it in a new way
    * addition of new CSS selectors
    * addition of new `ember-hook` selectors
* **MAJOR**
  * incompatible API change
    * using the code how used to will cease working
    * using the code how used to will have a different outcome
    * any changes to CSS selector names
    * any removal of CSS selectors
    * any changes to `ember-hook` selectors
    * possibly changes to test helpers (depends on the changes made)
  * any changes to the **_dependencies_** entry in the _package.json_ file

# CHANGELOG

Please add a description of your change here, it will be automatically prepended to the `CHANGELOG.md` file.
