simpsonsApp.controller('charactersCtrl', function ($scope,$uibModal, $log, $document) {
 

 

$scope.characters=function(charName,pic){

  var chars={
  charInfo:[{name:charName,picture:pic}]
 };

$scope.cast=chars;
 console.log($scope.cast)
}
 
  // $scope.characters=chars;


});