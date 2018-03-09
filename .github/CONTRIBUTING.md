# Contribution Guidelines
Like all great open-source software, contributions from the community are welcome.
In order to maintain consistency, we ask contributors to follow the following guidelines.

## CLA
Coming Soon

## Pull Requests
We use [`pr-bumper`](github.com/ciena-blueplanet/pr-bumper) in our projects, so every pull request should include a
comment about what kind of change is being provided (think [`semver`](semver.org)). The [`README`](github.com/ciena-blueplanet/pr-bumper/blob/master/README.md#pull-requests) from `pr-bumper` has more details,
but the gist of it is you need to include a directive in your pull request description that tells `pr-bumper` whether
the change is `#major#`, `#minor#`, `#patch#` or `#none#`.

It is also encouraged (soon to be required) to include a `# CHANGELOG` section in the pull request description.
Everything underneath this section will be prepended to the `CHANGELOG.md` in the repository when the pull-request
is merged under a section with the new version number that was created as a result of the merged pull request.

## Linting
We lint all the things.

### `.js` files
We use an extension of [`standard`](standardjs.com), so if your editor can run `eslint`, you should be all set.

### `.scss` files
We use `sass-lint` with nearly default rules (except `smacss` property order)

### `.hbs` files
We use `ember-cli-template-lint`
