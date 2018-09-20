# 6.0.0 (2018-09-20)

Dependencies:
* **Updated** core dependencies to be compatible with ember 3.3.
* **Updated** third party dependencies to be compatible with ember 3.3.

Addon:
* **Updated**  Ember core module import paths to match Ember.js new Modules API.

Testing:
* **Removed** `helpers/resolver.js`, `helpers/start-app.js`, `helpers/destroy-app.js` as they are not needed with Ember new testing API.
* **Updated** `test-helper.js` to allign with Ember's new testing API.
* **Added** Ember 3.3 senario to ember-try config.


# 5.1.0 (2018-08-01)
- Added support to the case when the source spreadable property gets replaced entirely.



# 5.0.2 (2018-07-20)

* **Fixed** Travis API key.


# 5.0.1 (2018-04-25)
* **Updated** usage of `targetObject` to `target` per the deprecation notice: https://www.emberjs.com/deprecations/v2.x#toc_code-targetobject-code

# 5.0.0 (2018-03-09)
* **Added** `CONTRIBUTING.md` file
* **Updated** pull request template
* **Added** issue template
* **Updated** to `pr-bumper` version `3`
* **Updated** to node 8
* **Added** slack integration
* **Updated** `ember-frost-test` to `^4.0.1`
* **Updated** `ember-test-utils` to `^8.1.1`
* **Updated** `ember-cli-frost-blueprints` to `^5.0.2`
* **Updated** `ember-prop-types` to `^7.0.1`
* **Removed** ignoring of `package-lock.json` file
* **Added** `package-lock.json` file

# 4.0.1 (2018-01-03)
* Add `ember-browserify` devDependency to address issue in demo app

# 4.0.0 (2018-01-03)
Version `3.0.2` was supposed to have been released as a major and all subsequent minor releases have been attempts to remedy this.  We believe we have discovered the culprit which is that a squash merge cannot be used against the PR employing `pr-bumper` so if this deploys correctly as `4.0.0` see the changelog entries for the `3.0.2` release.
  

# 3.1.5 (2018-01-03)
There was an error during release and this version should not have been released.  It was supposed to be `4.0.0`.  The 
cause of the error is believed to be due to not being able to do a squash merge of a PR when utilizing `pr-bumper`.  
We will know for sure after the next release attempt.

# 3.0.3 (2018-01-03)
There was an error during release and this version should not have been released.  It was supposed to be `4.0.0`.

# 3.0.2 (2018-01-03)
There was an error during release and this version should not have been released.  It was supposed to be `4.0.0`.

# 3.0.1 (2017-11-09)
* Delete blueprint
* Remove `ember-prop-types` from `devDependencies` in _package.json_
* Add `ember-prop-types` to `dependencies` in _package.json_

## Steps to perform in consuming application
* Remove `ember-prop-types` from `devDependencies` in _package.json_ if this add-on is the only codebase relying on it.

# 3.0.0 (2017-11-02)

## WARNING: THIS REVERTS EMBER CLI 2.16.1 BACK TO 2.12.3

We apologize for this change. Unfortunately, due to the internal needs of our organization this became a required action.

The 2.16.1 changes are now located in the `ember-cli-2.16.1` branch and will hopefully be contained in a versioned release again in the future.

# 2.0.1 (2017-10-11)
* **Updated** to Ember CLI 2.16.1


# 2.0.0 (2017-09-29)
* **Updated** to Ember CLI 2.15.1 (babel 6)
* **Updated** testing dependencies
* **Updated** to use Ember Javascript Modules API
(https://github.com/emberjs/rfcs/blob/master/text/0176-javascript-module-api.md)
* **Added** eslint rule to require usage of new modules syntax (will remove once added to ember-test-utils)
* **Updated** to use Ember CLI 2.15.1 inter-dependencies
* **Updated** to use headless Chrome in travis CI

# 1.2.2 (2017-08-10)
* **Updated** dependencies
* **Removed** deprecated `ember-hash-helper-polyfill`

# 1.2.1 (2017-07-06)
* **Updated** to Ember CLI 2.12.3 and Ember 2.12.x
* **Updated** ember-try config matrix with Ember LTS 2.4 and LTS 2.8
* **Updated** travis.yml build matrix to run Ember LTS 2.4, LTS 2.8 and default (Ember LTS 2.12)

# 1.2.0 (2017-05-16)
**Added** support for static properties (`tagName`, `elementId`), [`concatenatedProperties`](https://www.emberjs.com/api/classes/Ember.Component.html#property_concatenatedProperties) (`classNames`, ...) and [`mergedProperties`](https://www.emberjs.com/api/classes/Ember.Component.html#property_mergedProperties)

# 1.1.5 (2017-05-10)
* **Updated** the secure auth tokens for `.travis.yml`


# 1.1.4
* **Updated** the travis scripts used for bumping and publishing

# 1.1.3
* **Fixed** build by disable dependency snapshot which is causing build to fail and not publish.
Fixes from: https://github.com/ciena-blueplanet/ember-spread/pull/23
* **Updated** to use latest pr-bumper with support for `none`
* **Updated** `sinon-chai` to come from npm instead of bower
* **Updated** `chai-query` to come from npm instead of bower
* **Updated** `ember-cli-code-coverage` to version `0.3.5` until resolution of: https://github.com/kategengler/ember-cli-code-coverage/issues/75


# 1.1.2

* **Added** pull request template for Github.
* **Added** better reporter for test runs.
* **Added** Firefox to CI build to help ensure we run into no Firefox specific issues.
* **Added** additional `ember-prop-types` config to make sure no errors slip through the cracks.

# 1.1.1

* **Upgraded** to test against Ember 2.11.


# 1.1.0

* **Added** additional builds to CI to make sure addon works with latest versions of Ember.
* **Removed** files from npm package that aren't necessary (all of the various config files).
* **Updated** dependencies to latest versions.


# 1.0.0

* Dynamic spread is now driven via `spreadOptions=(hash source=(hash object=... property=...))`
* Added tests

# 0.0.8

* Demo advanced options (action binding, computed property chains)

# 0.0.7

* `till` -> `to`

# 0.0.6

* `till` -> `to`

# 0.0.5

* Adding a repo, description and author to the package.json

# 0.0.4

* Updates to travis/dummy env to try to get the demo working

# 0.0.3

* Changed the baseURL for the demo

# 0.0.2

* Adding travis files for demo and coverage publishing

# 0.0.1

* Removing jshint from the npm depedencies

