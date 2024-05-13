# Pull request guidelines

> _nota bene_
>
> Open a pull-request even if your contribution is not ready yet! It can
> be discussed and improved collaboratively! You may prefix the title of
> your pull-request with "WIP: " to make it clear that it is not yet ready
> for merging. You can also create draft PR if you want to discuss about the changes.

Before we merge a pull request, we check that it meets these guidelines:

1.  Please, write [commit messages that make sense](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html).
2.  Read more on how to write better commit messages [here](https://www.mediawiki.org/wiki/Gerrit/Commit_message_guidelines).
3.  Create a small PR with maximum 3 files and less than 300 lines of code if possible.
4.  Use good branch name and relevant prefixes.
    For e.g. `feature/my-feature`, `bug/fix-this-bug`,`WIP/work-in-progress` etc.
5.  [Rebase your branch](http://git-scm.com/book/en/Git-Branching-Rebasing) before submitting your pull request.
6.  Don't keep too many commits in a single PR. One may ask you to [squash your commits](http://gitready.com/advanced/2009/02/10/squashing-commits-with-rebase.html) too.
    This is used to "clean" your pull request before
    merging it (we don't want commits such as fix tests, fix 2, fix 3, etc.).
7.  While creating your pull request on GitHub, you **must** write a description
    which gives the context and/or explains why you are creating it.
8.  The pull request **should** include tests if possible.
9.  The Pull Request title on github should follow the commit message title.
10. If the pull request adds functionality, the docs **should** be updated.
11. _TravisCI_ and any other integration tests should be **green** :)

Thank you!
