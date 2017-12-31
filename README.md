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

## 環境設定
### Python2.7 にパスを通す
 ％PYTHON_HOME%\Scripts
 ％PYTHON_HOME%
### pip 対象を確認
 C:\Users\hiroto>pip -V
 pip 9.0.1 from c:\programs\python27-32\lib\site-packages (python 2.7)
### virtualenv インストール
 C:\Users\hiroto>pip install virtualenv
 Collecting virtualenv
   Downloading virtualenv-15.1.0-py2.py3-none-any.whl (1.8MB)
     100% |################################| 1.8MB 459kB/s
 Installing collected packages: virtualenv
 Successfully installed virtualenv-15.1.0
### 仮想環境を作成
  -p PYTHON_EXE, --python=PYTHON_EXE
        The default is the
        interpreter that virtualenv was installed with
        (c:\programs\python27-32\python.exe) ｃ
  c:\workspaces\venv>py -2.7-32 -m virtualenv gaeflask      

### 仮想環境の有効化
 PS> . "C:\workspaces\venv\gaeflask\Scripts\activate.ps1"  

### 必要ライブラリの仮想環境へのインストール
 pip install -t lib -r requirements.txt

### 実行
 py -2.7-32 "C:\Programs\Google\Cloud SDK\google-cloud-sdk\bin\dev_appserver.py" app.yaml

### トラブルシュート
 https://github.com/pallets/click/issues/594

Traceback (most recent call last):
  File "C:\Programs\Google\Cloud SDK\google-cloud-sdk\platform\google_appengine\google\appengine\runtime\wsgi.py", line 240, in Handle
    handler = _config_handle.add_wsgi_middleware(self._LoadHandler())
  File "C:\Programs\Google\Cloud SDK\google-cloud-sdk\platform\google_appengine\google\appengine\runtime\wsgi.py", line 299, in _LoadHandler
    handler, path, err = LoadObject(self._handler)
  File "C:\Programs\Google\Cloud SDK\google-cloud-sdk\platform\google_appengine\google\appengine\runtime\wsgi.py", line 85, in LoadObject
    obj = __import__(path[0])
  File "C:\workspaces\gcp\dokobingo\main.py", line 19, in <module>
    from flask import Flask, render_template, request
ImportError: No module named flask

*appengine_config.py

import os
import sys
from google.appengine.ext import vendor
 
vendor.add('lib')

print os.environ.get('SERVER_SOFTWARE', '')

if os.environ.get('SERVER_SOFTWARE', '').startswith('Google App Engine'):
    sys.path.insert(0, 'lib.zip')
else:
    if os.name == 'nt':
        os.name = None
        sys.platform = ''
## デバッグ
https://code.visualstudio.com/docs/python/debugging
Google App Engine は自身で起動するため、VS Code デバッガは直接利用できない
代わりに、ptvsd を使用して、Google App Engine をVS Codeがデバッガをアタッチできる
モードで起動する。
1.ptvsd ダウンロード
  https://pypi.python.org/pypi/ptvsd
  
  VS 1.19.1
  Python 2.7 32bit 

  pytvsd 3.2.1,3.2.0,3.1.0 -> NG
         3.0.0 OK

2.作業ディレクトリへ展開するか、別のディレクトリに展開し、pydev_startup.py を作成(以下4.)し、path を編集 

3.task.json
dev_appserver.py のパスを指定
  {
      "version": "0.1.0",
      "command": "python",
      "isShellCommand": true,
      "showOutput": "always",
      "args": [
          "C:\\Programs\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\dev_appserver.py",
          "--python_startup_script=${workspaceFolder}/pydev_startup.py",
          "--automatic_restart=no",
          "--max_module_instances=default:1",
          "${workspaceFolder}/app.yaml"
      ]
  }
  → VENV適用方法がわからない
  py -2.7-32 "C:\Programs\Google\Cloud SDK\google-cloud-sdk\bin\dev_appserver.py" --python_startup_script=pydev_startup.py --automatic_restart=no --max_module_instances=default:1 app.yaml

4.pydev_startup.py の作成
バッグビューのトップバーにある歯車アイコンをクリックすると、VS Codeはワークスペースの.vscodeフォルダーの下にlaunch.jsonファイルを作成
        {
            "name": "Python: GEA(Attach)",
            "type": "python",
            "request": "attach",
            "localRoot": "${workspaceFolder}",
            "remoteRoot": "${workspaceFolder}",
            "port": 3000,
            "secret": "gae",
            "host": "localhost",
            "preLaunchTask": "python"
        },

## git
git init
git add .
git commit -m "Initial commit"

git remote add origin <repo-address>
git push -u origin master

