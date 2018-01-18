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
from flask import Flask, render_template, request, redirect, session, abort
# [END imports]

# [START create_app]
app = Flask(__name__, static_folder='app')
app.secret_key = 'ognibokod'
# [END create_app]

@app.route('/', methods=['GET'])
def redirect_ui_root():
    redirect_to_index = redirect("/bingo/index.html")
    response = app.make_response(redirect_to_index)
    response.set_cookie('XSRF-TOKEN',generate_csrf_token(),expires=0,path='/')
    return response

@app.route('/bingo/', methods=['GET'])
def redirect_ui_bingo():
    return redirect("/bingo/index.html")

# [START form]
@app.route('/form')
def form():
    return render_template('form.html')
# [END form]

# [START submitted]
@app.route('/submitted', methods=['POST'])
def submitted_form():
    name = request.form['name']
    email = request.form['email']
    site = request.form['site_url']
    comments = request.form['comments']

    # [END submitted]
    # [START render_template]
    return render_template(
        'submitted_form.html',
        name=name,
        email=email,
        site=site,
        comments=comments)
    # [END render_template]


@app.route('/hello', methods=['POST'])
def api_hello():
    return "hello"

@app.errorhandler(403)
@app.errorhandler(500)
def server_error(e):
    logging.exception(e)
    return 'an error occurred.', e.code

@app.before_request
def csrf_protect():
    if request.method == "POST":
        token = session.pop('_csrf_token', None)
        if not token or token != request.form.get('_csrf_token'):
            abort(403)

def generate_csrf_token():
    if '_csrf_token' not in session:
        session['_csrf_token'] = value=str(uuid.uuid4())
    return session['_csrf_token']
# [END app]
