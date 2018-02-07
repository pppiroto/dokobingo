# App Engine Standard Flask Tutorial App

[![Open in Cloud Shell][shell_img]][shell_link]

[shell_img]: http://gstatic.com/cloudssh/images/open-btn.png
[shell_link]: https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/GoogleCloudPlatform/python-docs-samples&page=editor&open_in_editor=appengine/standard/flask/tutorial/README.md

This sample shows how to use [Flask](http://flask.pocoo.org/) to handle
requests, forms, templates, and static files on Google App Engine Standard.

Before running or deploying this application, install the dependencies using
[pip](http://pip.readthedocs.io/en/stable/):

    pip install -t lib -r requirements.txt

For more information, see the [App Engine Standard README](../../README.md)

# チュートリアル
https://cloud.google.com/appengine/docs/standard/python/getting-started/python-standard-env

# 実行手順
http://typea.info/blg/glob/2017/12/google-app-engine-flask-vs-code.html

ctrl + shift + p : ビルドタスクの実行
実行後デバッグビューからアタッチする

## git
git init

git config --global user.email "you@example.com"
git config --global user.name "Your Name

git add .
git commit -m "Initial commit"

git remote add origin https://github.com/pppiroto/dokobingo.git
git push -u origin master

git tag tagname
git push oring --tags

## GCloud
cd "C:\workspaces\dokobingo\dokobingo"
gcloud app deploy