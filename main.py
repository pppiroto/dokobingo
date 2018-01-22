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

def redirect_ui_index_with_crsftoken():
    response = app.make_response(redirect("/bingo/index.html"))
    response.set_cookie('XSRF-TOKEN', value=generate_csrf_token()) 
    return response

@app.route('/', methods=['GET'])
def redirect_ui_root():
    return redirect_ui_index_with_crsftoken()

@app.route('/bingo/<sub>', methods=['GET'])
def redirect_ui_bingo(sub):
    return redirect_ui_index_with_crsftoken()

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


@app.route('/api/hello', methods=['POST'])
def api_hello():
    print '%s' % (request.json)

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
        if not token or token != request.headers.get('X-XSRF-TOKEN'):
            abort(403)

def generate_csrf_token():
    if '_csrf_token' not in session:
        session['_csrf_token'] = str(uuid.uuid4())
    return session['_csrf_token']
# [END app]
