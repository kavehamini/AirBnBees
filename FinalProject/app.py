# Dependencies
import pandas as pd

from flask import (
    Flask,
    render_template,
    jsonify,
    json, 
    current_app as app,
    request,
    redirect)

app = Flask(__name__)




@app.route("/")
def home():
    return render_template("index.html")


@app.route("/model")
def model():
    neb_df = pd.read_csv("static/data/sub.csv", encoding="utf-8")
    nbh=neb_df['neighbourhood_cleansed'].unique()
    return render_template("form.html",test=nbh)

@app.route("/map")
def map():
    return render_template("map.html")
if __name__ == "__main__":
    app.run(debug=True)