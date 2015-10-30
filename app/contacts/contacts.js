angular.module('myContacts.contacts',['ngRoute','firebase','ui.bootstrap'])

.config(['$routeProvider',function($routeProvider){
	$routeProvider.
		when('/contacts',{
			templateUrl:'contacts/contacts.html',
			controller:'ContactsCtrl'
		});
}])

.controller('ContactsCtrl',['$scope','$http','$firebaseArray','$uibModal',function($scope,$http,$firebaseArray,$uibModal){
	
	var dbRef = new Firebase('https://mycontacts-angula.firebaseio.com/');
	
	$scope.contacts = $firebaseArray(dbRef);

	
	
	if($scope.contacts.length>0){
		showEditDelete = true;
	}
	
	$scope.addUser = function(){
		$scope.contacts.$add({
			name:$scope.name,
			email:$scope.email,
			company:$scope.company
		});
		
		$scope.addNewUser = false;
		$scope.showModal = false;
	};
	
	//$scope.showForm = function(){
	//	$scope.addNewUser = true;
	//};
	
	$scope.animationsEnabled = true;

  $scope.showForm = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceController',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      //$log.info('Modal dismissed at: ' + new Date());
    });
  };
}]);

angular.module('myContacts.contacts').controller('ModalInstanceController', function ($scope, $uibModalInstance, items) {

  

  $scope.ok = function () {
    $uibModalInstance.close("close");
	console.log($scope.name);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});