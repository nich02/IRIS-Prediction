(function (global) {
  "use strict";

  function predict(features, model) {
    if (features.length !== model.mean.length || features.some((value) => !Number.isFinite(value))) {
      throw new Error("Enter four valid flower measurements.");
    }

    const scaled = features.map((value, index) => (value - model.mean[index]) / model.scale[index]);
    const totals = model.classes.map(() => 0);

    for (const tree of model.trees) {
      let node = 0;
      while (tree.left[node] !== -1) {
        const branch = scaled[tree.feature[node]] <= tree.threshold[node] ? tree.left : tree.right;
        node = branch[node];
      }

      tree.values[node].forEach((value, index) => {
        totals[index] += value;
      });
    }

    let bestClass = 0;
    for (let index = 1; index < totals.length; index += 1) {
      if (totals[index] > totals[bestClass]) {
        bestClass = index;
      }
    }
    return model.classes[bestClass];
  }

  global.IrisClassifier = { predict };
})(globalThis);
