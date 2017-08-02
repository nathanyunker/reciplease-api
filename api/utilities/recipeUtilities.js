const utilities = {

  checkRecipeIdValidity: function(err) {
    return err.name === "CastError" && err.kind ==="ObjectId" ? "Invalid Recipe ID" : "Unknown Service Error";
  }
};

module.exports = utilities;