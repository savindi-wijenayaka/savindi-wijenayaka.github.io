---
title: "GitHub Actions: Pushing Artifacts to any Repository"
slug: "github-actions-pushing-artifacts-to-any-repository"
date: "2024-08-15"
excerpt: "Add & Commit simplified with examples."
tags: []
source: "medium"
mediumUrl: "https://medium.com/@savindi-wijenayaka/github-actions-pushing-artifacts-to-any-repository-44e302fa24ba"
featured: true
readingTime: 11
convertedAt: "2026-04-27T02:49:59Z"
coverImage: "/assets/blog/github-actions-pushing-artifacts-to-any-repository.jpg"
---

I could not help but noticed no one really gives a good “how-to” on this topics, especially in the point of view of a new GitHub action user. So let me help you cut through the noise and get straight to the best approach.

### GitHub Actions

> GitHub Actions is a continuous integration and continuous delivery (CI/CD) platform that allows you to automate your build, test, and deployment pipeline. You can create workflows that build and test every pull request to your repository, or deploy merged pull requests to production. — GitHub

### Example usecase

Let’s say you are writing your CV in LaTeX using Overleaf or locally. Every time you push your commit to your main branch, you need to:

1. Compile your LaTeX file
2. Create a PDF from it
3. Upload it to the same repository

because your personal website is accessing this `your-name-cv.pdf` when someone tries to view your résumé. In other words, this automated workflow ensures your personal website always displays the latest version of your CV.

### How to upload to the current repository

#### Using a single job

If you want to do this in the simplest possible way, the following code will do the trick.

```yaml
name: Compile and comit LaTeX document
on:
  push:
    branches:
      - 'main'
    paths-ignore:
      - '**.pdf'
  workflow_dispatch:
permissions:
  contents: write
jobs:
  compile_latex_and_commit:
    name: Compile latex to pdf and commit
    runs-on: ubuntu-latest
    steps:
      - name: Set up Git repository
        uses: actions/checkout@v4
        with:
          ref: main
      - name: Compile LaTeX document
        uses: xu-cheng/latex-action@v3
        with:
          root_file: main.tex
      - name: Add and commit to main
        run: |
          git config --global user.name 'Latex Workflow Bot'
          git config --global user.email 'bot@savindi-wijenayaka.github.io'
          git add main.pdf
          git commit -m "[Bot] Update PDF"
          git push
```

Since we do this with a single job, which means the PDF file created by the job resides in our default working directory (accessible via default variable `$GITHUB_WORKSPACE`) of the runner for steps. For example, it could look like `/home/runner/work/my-repo-name/my-repo-name`.

Lets talk about 3 main sections from above workflow first.

- ***on***: this specifies when to run the workflow. In my case, I used two triggers. Firstly, I made it run on `push` to the `main branch`. During the push, it also filters out the push triggers that only contain updates to my PDF file. I have used filepath pattern matching in here, but you could also use the exact name. Secondly I used `workflow_dispatch`. This provides me with a button in my workflow run that I could use to manually run this workflow if needed. You could omit this, but I found this helpful sometimes. There are plenty of other [action triggers](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows) available for you to choose from.
- [***permissions***](https://docs.github.com/en/actions/using-jobs/assigning-permissions-to-jobs): since we are committing to the repository, we need `write` permission to `contents`. Write automatically contains `read` permission, so you don’t need to specify that. You can also just give this permission to the job instead of the whole workflow.
- ***jobs***: Here, I used a single job named `compile_latex_and_commit`, so I could keep the workflow simpler. However, in usual scenarios, this is an array containing multiple different jobs.

Inside a single job, we could have multiple steps. These steps could be anything from shell scripts to out-of-the-box “actions”. Action is a set of steps that could collectively address a known usecase, like checking out a repository, uploading an artifact, downloading an artifact, etc. Think of it as a method in a library, if you are familiar with Python-like languages. Whenever possible, use them to avoid reinventing the wheel. Some actions are written and released by [GitHub itself](https://github.com/actions). Others are written by developers like you and me, for things they found important. You can find these in GitHub Marketplace (for free). In the code above, `actions/checkout@v4` is a GitHub-provided action, while `xu-cheng/latex-action@v3` is a third-party action. Refer to their documentation (linked) for more fine-grained customizations if needed.

- ***actions/checkout@v4***: This action checks out your repository under `$GITHUB_WORKSPACE` by default, so your workflow can access it. I have used only the main branch by specifying the `ref` property. However, if you have any previous steps, keep in mind that the **checkout action will automatically clean the destination you specified to avoid conflicts**. You can either use `clean` property to disable this or use `path` property to specify a path to clone, relative to `$GITHUB_WORKSPACE`, to avoid the loss of data from previous workflow steps. I personally prefer the latter.
- ***xu-cheng/latex-action@v3***: This marketplace action will compile a LaTeX file and produce a PDF file with the same name, by default. You can alter the name of the produced file by using the `arg` property, but for the sake of simplicity, I did not include it in the above code.
- ***Add and commit step***: Now that we have our PDF, we just need to add it to the repository and commit it. This is simple and similar to what you will do in the terminal when you add and commit a file to git. While there are existing marketplace actions for this, I opted to use simple bash commands.

#### Using multiple jobs

However, oftentimes, you would not access the PDF, or as a matter of fact, any “artifact” (images, build files, static sites, etc.) you created, within the same job. This is why uploading it to the workflow helps. This also facilitates you with manually downloading it from the action interface, under the respective run of the workflow (Keep in mind that GitHub has a time limit on keeping the artifacts).

```yaml
name: Compile and comit LaTeX document
on:
  push:
    branches:
      - 'main'
    paths-ignore:
      - '**.pdf'
  workflow_dispatch:
permissions:
  contents: write
jobs:
  compile_latex:
    name: Compile latex to pdf
    runs-on: ubuntu-latest
    steps:
      - name: Set up Git repository
        uses: actions/checkout@v4
        with:
          ref: main
      - name: Compile LaTeX document
        uses: xu-cheng/latex-action@v3
        with:
          pre_compile: "tlmgr update --self && tlmgr update pdfx"
          root_file: main.tex
          args: -pdf -file-line-error -halt-on-error -interaction=nonstopmode -jobname=${{ vars.SAVING_FILENAME }}
      - name: Upload PDF file
        uses: actions/upload-artifact@v4
        with:
          name: latex-pdf
          path: ${{ vars.SAVING_FILENAME }}.pdf
          overwrite: true
          if-no-files-found: error
  commit_current_repo:
    name: Add and commit to current repository
    runs-on: ubuntu-latest
    needs: compile_latex
    steps:
    - name: Checkout main branch
      uses: actions/checkout@v4
      with:
        ref: main
    - name: Download artifact
      uses: actions/download-artifact@v4
      with:
        name: latex-pdf
    - name: Test downloaded artifact
      run: ls -R
    - name: Add and commit to main
      run: |
        git config --global user.name 'Latex Workflow Bot'
        git config --global user.email 'bot@savindi-wijenayaka.github.io'
        git add ${{ vars.SAVING_FILENAME }}.pdf
        git commit -m "[Bot] Update PDF"
        git push
```

Let's talk about (only) the additional code in here.

- ***needs***: First thing you will notice is that this has 2 jobs. The second one has `needs` property that enforces it to run only after the first step, and given that the first one succeeded.
- ***actions/upload-artifact@v4***: GitHub provided action to upload folders or files (artifacts) specified under `path` property to our workflow as a zip file (current version, v4, limits the output artifact type to zip files only, which means even though you upload a .pdf, you will see a .zip in the action interface), with the name specified by `name` property.
- [***actions/download-artifact@v4***](https://github.com/actions/download-artifact): GitHub provided action to download an artifact(s) previously uploaded through the upload-artifact action and unzip it, into your `$GITHUB_WORKSPACE` by default. The download destination can be altered using `path` property. The required artifact name could be specified using `name`, in the case of multiple artifacts.
- ***checkout before download***: ensure that the checkout action would not clear the downloaded artifact, as we discussed in the previous section.
- ***Optional: vars.SAVING\_FILENAME***: In the previous section, I mentioned we could give a custom name to the generated file. Instead of hardcoding that name, I am using a (repo-wide) configuration variable to do so (more information: [GitHub docs](https://docs.github.com/en/actions/learn-github-actions/variables#creating-configuration-variables-for-a-repository). I’m using this in a personal repository; however, in production systems, I wouldn’t recommend doing this, as there would not be change logs in this way when the variable name is changed.) I pass this name to the `xu-cheng/latex-action@v3` action using their `args` property, along with other necessary arguments, to set that name to the generated file. If you have multiple files, you could use a prefix or suffix (refer to [latexmk -jobname](https://texdoc.org/serve/latexmk.pdf/0) for more details).

### How to upload to another repository (public or private)

The main thing here is ***you need write access even if it's a public repository*** (this is something I misunderstood when I was younger, hence the emphasis). We can do this by using a PAT (Personal Access Token). The process to create one is pretty straightforward, and elaborated in [GitHub docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token) (fine-grained PAT recommended unless using beta is a problem, else traditional one would work the same). Then, similar to configurable variables, you could add the PAT to the repository using the GUI (refer to [GitHub docs](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository)).

After that, the process is similar to what we discussed in adding to the current repository. The only exception is, we should use this secret when we check out the repository we want to commit to, and we should focus on not cloning everything to our `$GITHUB_WORKSPACE` directory, to avoid overrides and conflicts. The workflow below with the single job would work for both private and public repositories.

```yaml
name: Compile and commit LaTeX document
on:
  push:
    branches:
      - 'main'
    paths-ignore:
      - '**.pdf'
permissions:
  contents: write
jobs:
  compile_latex_and_commit:
    name: Compile and commit LaTeX as PDF
    runs-on: ubuntu-latest
    steps:
      - name: Set up Git repository
        uses: actions/checkout@v4
        with:
          ref: main
          path: current-repo
      - name: Compile LaTeX document
        uses: xu-cheng/latex-action@v3
        with:
          root_file: main.tex
          args: -pdf -file-line-error -halt-on-error -interaction=nonstopmode -jobname=${{ vars.SAVING_FILENAME }}
          working_directory: current-repo
      - name: Set up Git repository to push
        uses: actions/checkout@v4
        with:
          repository: savindi-wijenayaka/test-private-repo
          ref: main
          path: private-repo
          token: ${{secrets.TEMP_ACCESS}}
      - name: Add and commit to main
        run: |
          cd private-repo
          mv $GITHUB_WORKSPACE/current-repo/${{ vars.SAVING_FILENAME }}.pdf .
          git config --global user.name 'workflow-bot'
          git config --global user.email 'workflow-bot@savindi-wijenayaka.github.io'
          git add ${{ vars.SAVING_FILENAME }}.pdf
          git commit -m "[Bot] Update PDF"
          git push
```

Notice how I added the `path` property to both checkout actions. This will clone each repository to that path. Next in the `xu-cheng/latex-action@v3`, I added an extra property`working_directory`, which specifies where this job should run. This saves me from navigating to `current-repo`, however, you might have a different use case and therefore, might require to navigate to `current-repo` to create your artifact.

In the second checkout, since we are accessing the repository to write, we need to give our newly created PAT, which we added to our repository, instead of the default token (`TEMP_ACCESS` is the name I gave to the secret when adding PAT to the repository via GUI). The final tweak is to navigate to the second repository and move the created files from the first repository root to the second.

You can do this in two jobs, similar to committing to the current repository. I would not go into details since I know you could figure it out by now, if you read the article up to this point. But if by any chance you faced an error or don’t understand the logic behind a step, leave a comment below and I will help out.

### Bonus: Push to multiple repositories, using matrix strategy

The [matrix strategy](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs) allows you to run multiple workflows in parallel**.** Each workflow will be executed with arguments that you define in the matrix configuration. This strategy is capable of handling complex cases than ours, where we need a combination of arguments.

For the fun of it, let's push to three different repositories: current, private, and public.

```yaml
name: Compile and publish LaTeX document
on:
  push:
    branches:
      - 'main'
    paths-ignore:
      - '**.pdf'
  workflow_dispatch:
permissions:
  contents: write
jobs:
  compile_latex:
    name: Compile latex to pdf
    runs-on: ubuntu-latest
    steps:
      - name: Set up Git repository
        uses: actions/checkout@v4
      - name: Compile LaTeX document
        uses: xu-cheng/latex-action@v3
        with:
          root_file: main.tex
          args: -pdf -file-line-error -halt-on-error -interaction=nonstopmode -jobname=${{ vars.SAVING_FILENAME }}
      - name: Upload PDF file
        uses: actions/upload-artifact@v4
        with:
          name: latex-pdf
          path: ${{ vars.SAVING_FILENAME }}.pdf
          overwrite: true
          if-no-files-found: error
  commit_current_repo:
    strategy:
      matrix:
        repo_details:
          - name: ${{ github.repository }}
            path: current-repo
          - name: savindi-wijenayaka/temp-public-repo
            path: public-repo
            secret_name: REPO_WRITE_ACCESS
          - name: savindi-wijenayaka/temp-private-repo
            path: private-repo
            secret_name: REPO_WRITE_ACCESS
    name: Add and commit to multiple repositories
    runs-on: ubuntu-latest
    needs: compile_latex
    steps:
    - name: Checkout main branch
      env:
        repo_token: ${{ (matrix.repo_details.secret_name) && (secrets[matrix.repo_details.secret_name]) || (github.token) }}
      uses: actions/checkout@v4
      with:
        repository: ${{ matrix.repo_details.name }}
        ref: main
        path: ${{ matrix.repo_details.path }}
        token: ${{ env.repo_token }}
    - name: Download artifact
      uses: actions/download-artifact@v4
      with:
        name: latex-pdf
    - name: Test downloaded artifact
      run: ls -R
    - name: Add and commit to main
      run: |
        cd ${{ matrix.repo_details.path }}
        mv $GITHUB_WORKSPACE/${{ vars.SAVING_FILENAME }}.pdf .
        git config --global user.name 'workflow-bot'
        git config --global user.email 'workflow-bot@savindi-wijenayaka.github.io'
        git add ${{ vars.SAVING_FILENAME }}.pdf
        git commit -m "Update CV"
        git push
```

One thing to mention regarding the above code: `secrets` cannot be directly accessed within the `matrix` context. Hence workaround is used by setting a step-specific environment variable in the checkout step, by evaluating the condition if the `secret_name` was set.

I thought this would be one of my bite-sized articles, but ended up diving a bit deeper 😅. Well, sometimes good topics need more words. Anyway, as usual, if anything is unclear, please feel free to ask in the comments section.

See you soon in another article! Happy coding! 👩🏾‍💻
