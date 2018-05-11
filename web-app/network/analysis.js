


module.exports = {


    totalPointsCollected: function(usePointsTransactions) {
        var totalPointsCollected = 0;
        for (var i = 0; i < usePointsTransactions.length; i++) {
          totalPointsCollected = totalPointsCollected + usePointsTransactions[i].points;
        }
        return totalPointsCollected;
    },
      
    totalPointsGiven: function(earnPointsTransactions) {
        var totalPointsGiven = 0;
        for (var i = 0; i < earnPointsTransactions.length; i++) {
          totalPointsGiven = totalPointsGiven + earnPointsTransactions[i].points;
        }
        return totalPointsGiven;
    }
      

}