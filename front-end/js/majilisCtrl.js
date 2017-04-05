var majilisApp=angular.module('majilisApp',['ngRoute','ui.bootstrap','ngAnimate','ngTouch','ngStorage']);

majilisApp.controller('majilisCtrl',function($scope,$http,$route, $routeParams, $location){

    console.log("hello");

});


majilisApp.config(function($routeProvider,$locationProvider){
    $routeProvider.when('/',{
        templateUrl:'views/landing.html',
        controller:'landingCtrl'
    })
    $routeProvider.when('/clubs',{
        templateUrl:'views/club.html',
        controller:'clubsCtrl'
    })
    $routeProvider.when('/clubProfile/:clubName',{
        templateUrl:'views/club-profile.html',
        controller:'clubProfileCtrl'
    })
    $routeProvider.when('/clubCreate',{
        templateUrl:'views/club-create.html',
        controller:'clubCreateCtrl'
    })
    $routeProvider.when('/login',{
        templateUrl:'views/login.html',
        controller:'loginCtrl'
    })
    $routeProvider.when('/register',{
        templateUrl:'views/registration.html',
        controller:'registerCtrl'
    })
    $routeProvider.when('/forum',{
        templateUrl:'views/forum.html',
        controller:'forumCtrl'
    })
    $routeProvider.when('/createThread',{
        templateUrl:'views/thread-create.html',
        controller:'createThreadCtrl'
    })
    $routeProvider.when('/forum-page',{
        templateUrl:'views/forum-page.html',
        controller:'forumPageCtrl'
    })

    $routeProvider.when('/profile/:username',{
        templateUrl:'views/profile.html',
        controller:'profileCtrl'
    })


        .otherwise({
            redirectTo:'/'
        });


}) //end routes

majilisApp.controller('landingCtrl',function($scope,$http,$route, $routeParams, $location){

    console.log("hi");

})


majilisApp.controller('clubsCtrl',function($scope,$http,$route, $routeParams, $location,$rootScope,$localStorage){
    console.log("club controller");
    var url = "http://localhost:3000";
    $scope.submitClubProfile=function(clubName){
        console.log(clubName);
        $localStorage.clubName=clubName;
        console.log($localStorage.clubName);

    }
    $http.get(url + '/clubInfo',{

    })
        .then(function success(rspns) {

            $scope.clubs = rspns.data;


        }, function fail(rspns) {
            return rspns;

        })

})

majilisApp.controller('clubCreateCtrl',function($scope,$http,$route, $routeParams, $location,clubCreation,$localStorage,$rootScope){

    console.log("clubcreate");
    $scope.club={};
    $scope.club.username=$localStorage.username;
    console.log($localStorage.username);
    $scope.clubCreate=function(){
        console.log("club create button works");
        console.log($scope.club.name);
        clubCreation.clubCreationService($scope.club);
    }




})

majilisApp.controller('clubProfileCtrl',function($scope,$http,$route, $routeParams, $location,$localStorage){
    var url = "http://localhost:3000";
    console.log("club profile");
    $scope.clubProfileTabs= {
        about:true,
        forum:false,
        media:false
    } ;


    $scope.clubProfileTabs=function(tab){

        switch(tab){

            case 'about':

                $scope.clubProfileTabs.about=true;
                $scope.clubProfileTabs.forum=false;
                $scope.clubProfileTabs.media=false;


                break;
            case 'forum':

                $scope.clubProfileTabs.about=false;
                $scope.clubProfileTabs.forum=true;
                $scope.clubProfileTabs.media=false;


                break;
            case 'media':
                $scope.clubProfileTabs.about=false;
                $scope.clubProfileTabs.forum=false;
                $scope.clubProfileTabsmedia=true;

                break;
        }
    }
    console.log("hihi "+$localStorage.clubName);
    var clubNameHere=$localStorage.clubName;
    $http.post(url + '/clubProfileInfo',{
        clubName:clubNameHere
    })
        .then(function success(rspns) {

            $scope.clubs = rspns.data;


        }, function fail(rspns) {
            return rspns;

        })

})

majilisApp.controller('loginCtrl', function($scope, $http,$localStorage,$rootScope,$location,$routeParams) {
    var url = "http://localhost:3000";
    $scope.user={};
    $scope.login = function() {
        console.log($scope.user.username);
        console.log($scope.user.password);
        $localStorage.username=$scope.user.username;
        $http.post(url + '/login', {

            user: $scope.user

        }).then(function success(rspns) {
            if (rspns.data.failure == 'noToken' || rspns.data.failure == 'badPass'){
                console.log("oh vey")
            }else if(rspns.data.success=="userFound"){
                console.log(rspns);
                $localStorage.token = rspns.data.token;
                $localStorage.user = rspns.data.docs.username;
                $rootScope.logged=true;
                console.log(rspns.data.docs.username);
                console.log($localStorage.user);

                //where there is main, put dash
                console.log('Tab dash')
                var expDate = new Date();
                expDate.setDate(expDate.getTime() + (30 * 60000));
                // $cookies.put('token',response.data.token);

                console.log(rspns)
                $location.path('/clubs');

            }
        }, function failure(rspns) {
            console.log("AJAX failed")
            console.log("Your log in failed summer")
            console.log(rspns);
            $location.path('/login');
        });
    };

})

majilisApp.controller('registerCtrl',function($scope,$http,$route, $routeParams, $location){


    var url = "http://localhost:3000";
    $scope.user = {};
    $scope.confirm = {};


    $scope.register = function() {

        console.log($scope.user);
        console.log($scope.confirm);

            console.log("Password match");
            $http.post(url + '/register', {
                user: $scope.user
            }).then(function success(rspns) {
                console.log(rspns);
                $location.path('/login');
            }, function fail(rspns) {
                console.log("error")
            });

    };

})

majilisApp.controller('forumCtrl',function($scope,$http,$route, $routeParams, $location,$localStorage){


    console.log("hi");

})

majilisApp.controller('createThreadCtrl',function($scope,$http,$route, $routeParams, $location,thread,$localStorage){
    $scope.thread = {};
    $scope.thread.username = $localStorage.username;
    $scope.submitNewThread = function() {
        console.log($scope.thread);
        thread.threadService($scope.thread);
    };
    console.log("create thread  page");

})
majilisApp.controller('forumPageCtrl',function($scope,$http,$route, $routeParams, $location){

    console.log("forum page");

})

majilisApp.controller('clubCtrl',function($scope,$http,$route, $routeParams, $location){

    console.log("hi");

})


// SERVICES
    //create a club
    .service('clubCreation',function($http,$localStorage){

        this.clubCreationService=function(club){
            var url = "http://localhost:3000";

            console.log(club);
            console.log("Hit me up mofo");

            $http.post(url + '/clubCreate',{

                club:club

            })
                .then(function succeess(rspns) {
                    return rspns;
                    $location.path('/');

                }, function fail(rspns) {
                    return rspns;

                })

        }

    })

    //create a new thread
    .service('thread',function($http,$localStorage){

        this.threadService=function(thread){
            var url = "http://localhost:3000";

            console.log(thread);
            console.log("thread");

            $http.post(url + '/thread',{

                thread:thread

            })
                .then(function succeess(rspns) {
                    return rspns;
                    $location.path('/');

                }, function fail(rspns) {
                    return rspns;

                })

        }

    })

    //discussion comments
    .service('discussionPosts',function($http,$localStorage){

        this.discussionPostsService=function(discussionPosts){
            var url = "http://localhost:3000";

            console.log(club);
            console.log("discussion");

            $http.post(url + '/discussionPosts',{

               discussionPosts:discussionPosts

            })
                .then(function succeess(rspns) {
                    return rspns;
                    $location.path('/');

                }, function fail(rspns) {
                    return rspns;

                })

        }

    })