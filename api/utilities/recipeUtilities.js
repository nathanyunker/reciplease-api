const utilities = {

  checkRecipeIdValidity: function(err) {
    return err.name === "CastError" && err.kind ==="ObjectId" ? "Invalid Recipe ID" : "Unknown Service Error";
  },

  checkRecipeValidity: function(errors) {
    let messages = [];

    const attributeKey = {
      calorieCount: 'Calorie Count',
      numberOfServings: 'Number of Servings',
      value: "Ingredient value"
    };

    for (let error in errors) {
      if (errors.hasOwnProperty(error)) {

        if (errors[error].name === "CastError") {
          messages.push(attributeKey[errors[error].path] + " cannot be \"" + errors[error].value
              + "\". Should be a " + errors[error].kind);
        } else {
          messages.push(errors[error].message || "Unknown Server Error");
        }
      }
    }

    return messages;
  },

  checkStatusCode: function(err) {
    return err.name === "CastError" || err.name ==="ValidationError" ? 400 : 500;
  }
};

module.exports = utilities;