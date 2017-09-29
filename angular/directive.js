//Books,House,Character custom directives

myApp.directive('booksData', function() {
  return {
    restrict: "E",
    templateUrl: "views/bookCard.html",
  }
});

myApp.directive('housesData', function() {
  return {
    restrict: "E",
    templateUrl: "views/houseCard.html",
  }
});
myApp.directive('charactersData', function() {
  return {
    restrict: "E",
    templateUrl: "views/charCard.html",
  }
});

