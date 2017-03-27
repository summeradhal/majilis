simpsonsApp.controller('forumCtrl', function ($scope) {
 
  	$scope.user={};
 $scope.submitName=function (){


 		console.log($scope.user);
 		
 	
	 };

	$scope.submitChat=function(){
		console.log($scope.user.chatText)
	}
});