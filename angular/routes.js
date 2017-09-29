myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      // location of the template
      templateUrl: 'views/index-view.html'
  
    })
    .when('/list', {
      templateUrl: 'views/list.html',
      controller: 'mainController',
      controllerAs: 'main'
    })  
    .when('/book/:bookid', {
      templateUrl: 'views/bookDetails.html',
      controller: 'bookCtrl',
      controllerAs: 'currentBook'
    })           
    .when('/house/:houseid', {
      templateUrl: 'views/houseDetails.html',
      controller: 'houseCtrl',
      controllerAs: 'currentHouse'
    })  
    .when('/character/:characterid', {
      templateUrl: 'views/charDetails.html',
      controller: 'characterCtrl',
      controllerAs: 'currentCharacter'
    })      
    .otherwise({
      //redirectTo:'/' //we have a better option
      template: '<div class="notFound"><h1>404 page not found</h1><hr><a href="#/" class="btn btn-primary btn-primary"><span class="glyphicon glyphicon-home"></span> Go To HomePage</a></div>'
    });
}]);