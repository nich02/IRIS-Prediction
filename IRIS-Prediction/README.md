# Iris Lens: Iris Flower Classifier

A Flask app and static GitHub Pages demo that classify iris flowers from sepal
and petal measurements. The Pages demo runs the trained random forest directly
in the browser; it does not need a Flask server.

## Run locally

```bash
cd IRIS-Prediction
pip install -r requirements.txt
python app.py
```

Open <http://127.0.0.1:5000>.

## GitHub Pages

Every push to `main` that changes the app page, browser classifier, model data,
or Pages workflow deploys the static demo. Once the workflow completes, open
<https://nich02.github.io/IRIS-Prediction/>.
The Pages demo makes predictions in the browser; it does not send measurements
to a server.

To export the current trained model for browser use, run
`python export_model.py` from this directory and commit the updated
`static/model.json`.