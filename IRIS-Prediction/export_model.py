import json
import pickle
from pathlib import Path


PROJECT_DIR = Path(__file__).resolve().parent


def main():
    with (PROJECT_DIR / "model.pkl").open("rb") as model_file:
        model_data = pickle.load(model_file)

    classifier = model_data["model"]
    scaler = model_data["scaler"]
    model_json = {
        "classes": classifier.classes_.tolist(),
        "mean": scaler.mean_.tolist(),
        "scale": scaler.scale_.tolist(),
        "trees": [
            {
                "left": tree.tree_.children_left.tolist(),
                "right": tree.tree_.children_right.tolist(),
                "feature": tree.tree_.feature.tolist(),
                "threshold": tree.tree_.threshold.tolist(),
                "values": tree.tree_.value[:, 0, :].tolist(),
            }
            for tree in classifier.estimators_
        ],
    }

    output_path = PROJECT_DIR / "static" / "model.json"
    output_path.parent.mkdir(exist_ok=True)
    with output_path.open("w", encoding="utf-8") as output_file:
        json.dump(model_json, output_file, separators=(",", ":"))
        output_file.write("\n")

    print(f"Exported {len(model_json['trees'])} trees to {output_path}")


if __name__ == "__main__":
    main()
