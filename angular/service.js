//start service (to get details from given api)
myApp.service('getinfo', function($http) {

  var baseUrl = 'https://anapioficeandfire.com/api';


  this.getBooks = function() {
    return $http.get(baseUrl + '/books?pageSize=50');
  }
  this.getHouses = function(pagenox) {
    return $http.get(baseUrl + '/houses?pageSize=50')

  }
  this.getCharacters = function(pageno) {
    return $http.get(baseUrl + '/characters?pageSize=50')
  }
  this.getBook = function(bookid) {
    return $http.get(baseUrl + '/books/' + bookid)

  }

  this.getHouse = function(houseid) {
    return $http.get(baseUrl + '/houses/' + houseid)

  }

  this.getCharacter = function(characterid) {
    return $http.get(baseUrl + '/characters/' + characterid)

  }
  this.getmoreDetail = function (url) {
        return $http.get(url);
    }
    


}); //end this service