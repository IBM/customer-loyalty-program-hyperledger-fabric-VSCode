//export module
module.exports = {

  /*
   * Calculate total points collected
   * @param {Object} usePointsTransactions Object with all UsePoints transactions
   */
  totalPointsCollected: function(usePointsTransactions) {
    //loop through and add all points from the transactions
    var totalPointsCollected = 0;
    for (var i = 0; i < usePointsTransactions.length; i++) {
      totalPointsCollected = totalPointsCollected + usePointsTransactions[i].points;
    }
    return totalPointsCollected;
  },

  /*
   * Calculate total points given
   * @param {Object} usePointsTransactions Object with all EarnPoints transactions
   */
  totalPointsGiven: function(earnPointsTransactions) {
    //loop through and add all points from the transactions
    var totalPointsGiven = 0;
    for (var i = 0; i < earnPointsTransactions.length; i++) {
      totalPointsGiven = totalPointsGiven + earnPointsTransactions[i].points;
    }
    return totalPointsGiven;
  }

}
