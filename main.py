# -*- coding: utf-8 -*-
# Copyright 2016 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START app]
import logging
import uuid

# [START imports]
from flask import Flask, render_template, request, redirect, session, abort, jsonify, send_from_directory
import re
# [END imports]

CSRF_TOKEN = '_csrf_token'

# [START create_app]
app = Flask(__name__, static_folder='')
app.secret_key = 'ognibokod'
# [END create_app]

def redirect_ui_index_with_crsftoken():
    response = app.make_response(redirect("/bingo/index.html"))
    response.set_cookie('XSRF-TOKEN', value=generate_csrf()) 
    return response

@app.route('/', methods=['GET'])
def redirect_ui_root():
    return redirect_ui_index_with_crsftoken()

@app.route('/bingo/')
def get_app_root():
    return redirect_ui_index_with_crsftoken()

@app.route('/bingo/<path:path>')
def get_static_file(path):
    # https://stackoverflow.com/questions/20646822/how-to-serve-static-files-in-flask
    if re.match(r'(room)',path):
        return redirect_ui_index_with_crsftoken()
    else:
        return send_from_directory('bingo', path)

@app.route('/api/hello', methods=['POST'])
def api_hello():
    # http://conta.hatenablog.com/entry/2013/02/06/162829
    # Content-Type:application/json の場合、request.json が利用可能
    # app.logger.info(request.headers['Content-Type'])
    name = request.json['params']['name']

    return jsonify({"result":{"name":name}})

@app.errorhandler(403)
@app.errorhandler(500)
def server_error(e):
    logging.exception(e)
    return 'an error occurred.', e.code

@app.before_request
def csrf_protect():
    if request.method == "POST":
        token = session[CSRF_TOKEN]
        if not token or token != request.headers.get('X-XSRF-TOKEN'):
            abort(403)

def generate_csrf():
    if CSRF_TOKEN not in session:
        session[CSRF_TOKEN] = str(uuid.uuid4())
    return session[CSRF_TOKEN]
# [END app]

## [START form]
#@app.route('/form')
#def form():
#    return render_template('form.html')
## [END form]
#
## [START submitted]
#@app.route('/submitted', methods=['POST'])
#def submitted_form():
#    name = request.form['name']
#    email = request.form['email']
#    site = request.form['site_url']
#    comments = request.form['comments']
#
#    # [END submitted]
#    # [START render_template]
#    return render_template(
#        'submitted_form.html',
#        name=name,
#        email=email,
#        site=site,
#        comments=comments)
#    # [END render_template]