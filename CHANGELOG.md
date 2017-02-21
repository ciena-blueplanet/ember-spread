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

