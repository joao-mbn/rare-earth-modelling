
from flask import Flask, jsonify, request, render_template
import imp
import os

filename = 'projetoFinal.py'
path = 'projetoFinal/'
full_path = os.path.join(path, filename)
projetoFinal = imp.load_source(filename, full_path)

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def hello():
    return str(projetoFinal.casDy)
    # POST request
    if request.method == 'POST':
        print('Incoming..')
        print(request.get_json())  # parse as JSON
        return 'OK', 200

    # GET request
    else:
        message = {'greeting': 'Hello from Flask!'}
        return jsonify(message)  # serialize and use JSON headers


@app.route('/test')
def test_page():
    # look inside `templates` and serve `index.html`
    return render_template('index.html')
