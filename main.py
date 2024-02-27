from flask import Flask, render_template
import os

app = Flask(__name__)

@app.route("/")
def root_route():
    return render_template('template.html', github_token=os.environ.get('GITHUB_TOKEN', ''))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)