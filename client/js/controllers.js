app.controller('SLController', ['$scope', 'userService', '$location',
  function($scope, userService, $location){
    $scope.view = {};
    $scope.view.showSignupForm = true;
    $scope.view.showLoginForm = false;
   
    $scope.resetAlert = function(){
      $scope.view.sErrors = null;
      $scope.view.lErrors = null;
    };

    $scope.toggleForm = function(){
      $scope.view.showSignupForm = !$scope.view.showSignupForm;
      $scope.view.showLoginForm = !$scope.view.showLoginForm;
      $scope.resetAlert();
    };

    $scope.signup = function(newUser){
      userService.signup(newUser).then(function(data){
        userService.setCurrentUser(data);
        $location.path("/photos");
        if (data.status===400){
          $scope.view.sErrors = data.data;
        }
        $scope.newUser = {};
      });
    };

    $scope.login = function(user){
      userService.login(user).then(function(data){
        userService.setCurrentUser(data);
        $location.path("/photos");
        if (data.status===400){
          $scope.view.lErrors = data.data;
        }
        $scope.user = {};
      });
    };
  }
]);

app.controller('PhotosController', 
  ['$scope', '$location', 'userService', 'currentUser', 'photos', 'photoService',
  function($scope, $location, userService, currentUser, photos, photoService){

    $scope.view = {};
    $scope.view.showPhotoForm = false;
    $scope.view.pErrors = null;
    
    $scope.currentUser = currentUser;
    $scope.photos = photos;

    $scope.toggleForm = function(){
      $scope.view.showPhotoForm = !$scope.view.showPhotoForm;
      $scope.newPhoto = {};
      $scope.newPhoto.username = currentUser.username;
    };

    $scope.logout = function(){
      userService.logout();
      $location.path("/home");
    };

    $scope.post = function(newPhoto){
      if (newPhoto.username === currentUser.username) {
        photoService.postPhoto(newPhoto).then(function(photo){
          if (photo.message === "Photo validation failed") {
            $scope.view.pErrors = "Title, Photo Url, Description can't be blank.";
          } else {
            $scope.newPhoto = {};
            $scope.photos.push(photo);
            $scope.view.showPhotoForm = false;
          }
        });
      } else {
        $scope.view.pErrors = "You cannot post as another user.";
      }
    };

    $scope.resetAlert = function(){
      $scope.view.pErrors = null;
    };

  }
]);













