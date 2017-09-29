var myApp = angular.module('myApp', ['ngRoute']);
//main controller start
myApp.controller('mainController', ['$http', 'getinfo', function ($http, getinfo) {
    var main = this;
    var error = false;
    main.search = [];
    main.showbook = true;
    main.showhouse = true;
    main.showchar = true;
    main.data = [];

    var getbook = getinfo.getBooks(); //get all books 
    var getchar = getinfo.getCharacters(); //get all characters
    var gethouse = getinfo.getHouses(); // get all houses


    /*Checking Promises returned were successful or not */
    getbook.then(function (response) {
        var val = response.data;
        val.forEach(function (v, i) {
            v.dirtype = 'Book';
            v.urlid = i + 1;
            main.data.push(v);
        });
    }, function () {
        console.log('error');
        error = true;
    });

    getchar.then(function (response) {
        var val = response.data;
        val.forEach(function (v, i) {
            v.dirtype = 'Char';
            v.urlid = i + 1;
            main.data.push(v);
        });
    }, function () {
        console.log('error');
        error = true;
    });

    gethouse.then(function (response) {
        var val = response.data;
        val.forEach(function (v, i) {
            v.dirtype = 'House';
            v.urlid = i + 1;
            main.data.push(v);
        });
    }, function () {
        console.log('error');
        error = true;
    });

    if (!error) {
        main.bookcharhouse = main.data;
    }


}]); // controller end

//books controller start
myApp.controller('bookCtrl', ['$http', 'getinfo', '$routeParams', function ($http, getinfo, $routeParams) {
    var main = this;
    this.book = {};
    this.bookid = $routeParams.bookid;


    // get book details
    this.getBookFucntion = function () {
        getinfo.getBook(main.bookid).then(function successCallback(response) {
                main.book = response.data;
                console.log(main.book);
                if (main.book.povCharacters.length > 0 && main.book.povCharacters[0] != '') {
                    main.book.povchar = [];
                    main.book.povCharacters.forEach(function (v) {
                        getinfo.getmoreDetail(v)
                            .then(function (response) {
                                main.book.povchar.push(response.data.name);
                            }, function () {
                                console.log('error');
                            });
                    });
                }
            },
            function errorCallback(response) {
                alert("Error occurred. Check the console.");
                console.log(response);
            });
        return main.book;
    }; //function end
    main.getBookFucntion();


}]); // controller end

//characters controller start
myApp.controller('characterCtrl', ['$http', 'getinfo', '$routeParams', function ($http, getinfo, $routeParams) {
    var main = this;
    this.character = {};
    this.characterid = $routeParams.characterid;

    // get character details
    this.getCharacterFucntion = function () {
        getinfo.getCharacter(main.characterid).then(function successCallback(response) {
                main.character = response.data;
                console.log(main.character);
                if (main.character.father != undefined && main.character.father != '') {
                    getinfo.getmoreDetail(main.character.father)
                        .then(function (response) {
                            main.character.fatherName = response.data.name;
                        }, function () {
                            console.log('error');
                        });
                }
                if (main.character.mother != undefined && main.character.mother != '') {
                    getinfo.getmoreDetail(main.character.mother)
                        .then(function (response) {
                            main.character.motherName = response.data.name;
                        }, function () {
                            console.log('error');
                        });
                }

                if (main.character.spouse != undefined && main.character.spouse != '') {
                    getinfo.getmoreDetail(main.character.spouse)
                        .then(function (response) {
                            main.character.spouseName = response.data.name;
                        }, function () {
                            console.log('error');
                        });
                }

                if (main.character.books.length > 0 && main.character.books[0] != '') {
                    main.character.charbookNames = [];
                    main.character.books.forEach(function (v) {
                        getinfo.getmoreDetail(v)
                            .then(function (response) {
                                main.character.charbookNames.push(response.data.name);
                            }, function () {
                                console.log('error');
                            });
                    });
                }

            },
            function errorCallback(response) {
                alert("Error occurred. Check the console.");
                console.log(response);
            });
        return main.character;
    }; //function end
    main.getCharacterFucntion();

}]); // controller end

//House controller start
myApp.controller('houseCtrl', ['$http', 'getinfo', '$routeParams', function ($http, getinfo, $routeParams) {
    var main = this;
    this.house = {};
    this.houseid = $routeParams.houseid;
    //console.log("as",this.houseid);

    // get house details
    this.getHouseFucntion = function () {
        getinfo.getHouse(main.houseid).then(function successCallback(response) {
                //console.log(response.data);
                main.house = response.data;
                console.log(main.house);
                if (main.house.currentLord != undefined && main.house.currentLord != '') {
                    getinfo.getmoreDetail(main.house.currentLord)
                        .then(function (response) {
                            main.house.currentLordName = response.data.name;
                        }, function () {
                            console.log('error');
                        });
                }

                if (main.house.founder != undefined && main.house.founder != '') {
                    getinfo.getmoreDetail(main.house.founder)
                        .then(function (response) {
                            main.house.founderName = response.data.name;
                        }, function () {
                            console.log('error');
                        });
                }

                if (main.house.swornMembers.length > 0 && main.house.swornMembers[0] != '') {
                    main.house.swornMembersName = [];
                    main.house.swornMembers.forEach(function (v) {
                        getinfo.getmoreDetail(v)
                            .then(function (response) {
                                main.house.swornMembersName.push(response.data.name);
                            }, function () {
                                console.log('error');
                            });
                    });
                }
                console.log(main.house.heir);
                if (main.house.heir != undefined && main.house.heir != '') {


                    getinfo.getmoreDetail(main.house.heir)
                        .then(function (response) {
                            main.house.heirName = response.data.name;
                        }, function () {
                            console.log('error');
                        });

                }


            },
            function errorCallback(response) {
                alert("some error occurred. Check the console.");
                console.log(response);
            });
        return main.house;
    }; //function end
    main.getHouseFucntion();

}]); // controller end