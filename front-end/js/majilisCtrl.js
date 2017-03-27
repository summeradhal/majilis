var majilisApp=angular.module('majilisApp',['ngRoute','ui.bootstrap','ngAnimate','ngTouch']);

majilisApp.controller('majilisCtrl',function($scope,$http,$route, $routeParams, $location){

    console.log("hello");

})

majilisApp.config(function($routeProvider,$locationProvider){
    $routeProvider.when('/',{
        templateUrl:'views/landing.html',
        controller:'landingCtrl'
    })
    $routeProvider.when('/clubs',{
        templateUrl:'views/club.html',
        controller:'clubCtrl'
    })
    $routeProvider.when('/clubProfile',{
        templateUrl:'views/club-profile.html',
        controller:'clubProfileCtrl'
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
    $routeProvider.when('/forum-page',{
        templateUrl:'views/forum-page.html',
        controller:'forumPageCtrl'
    })

    $routeProvider.when('/profile',{
        templateUrl:'views/profile.html',
        controller:'profileCtrl'
    })


        .otherwise({
            redirectTo:'/'
        });


}) //end routes

majilisApp.controller('landingCtrl',function($scope,$http,$route, $routeParams, $location){

    console.log("hi");

});


majilisApp.controller('clubCtrl',function($scope,$http,$route, $routeParams, $location){

    console.log("hi");

});

majilisApp.controller('clubProfileCtrl',function($scope,$http,$route, $routeParams, $location){

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
});

majilisApp.controller('loginCtrl',function($scope,$http,$route, $routeParams, $location){

    console.log("hi");

});

majilisApp.controller('registerCtrl',function($scope,$http,$route, $routeParams, $location){

    console.log("hi");

});

majilisApp.controller('forumCtrl',function($scope,$http,$route, $routeParams, $location){

    console.log("hi");

});

majilisApp.controller('forumPageCtrl',function($scope,$http,$route, $routeParams, $location){

    console.log("forum page");

});

majilisApp.controller('clubCtrl',function($scope,$http,$route, $routeParams, $location){

    console.log("hi");

});