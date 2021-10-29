function route(){
    let hashTag = window.location.hash;
    let pageID = hashTag.replace("#/","");
    //pageID holds page name

    if(!pageID){
        MODEL.changePage("home");

    }else{
        MODEL.changePage(pageID);

    }

}
function initFirebase(){
    firebase
    .auth()
    .onAuthStateChanged(function(user){
        if(user){
            
            $("#logOut").css("display","block");
            $("#login").css("display","none");

            $("#recipe").css("display","block");
            $("#recipe-mobile").css("display","block");


            $("#logOut-mobile").css("display","block");
            $("#login-mobile").css("display","none");

            //console.log("user detected");
        }else{
            $("#login").css("display","block");
            $("#logOut").css("display","none");

            $("#logOut-mobile").css("display","none");
            $("#login-mobile").css("display","block");

            $("#recipe").css("display","none");
            $("#recipe-mobile").css("display","none");
            //console.log("user not there");
        }
    })

}
function createUser(){
    let fName = $("#fName").val();
    let lName = $("#lName").val();
    let email = $("#email").val();
    let password = $("#pw").val();

    firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {

    $("#fName").val("");
    $("#lName").val("");
    $("#email").val("");
    $("#pw").val("");
    var user = userCredential.user;
    Swal.fire({
        background: "#ffd666",
        title: "Account Created",
        text: 'you have been logged in.',
        confirmButtonColor: '#A7E8BD'

      })

    //console.log("account created")
    
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    Swal.fire({
        background: "#ffd666",
        title: "Error",
        text: 'There has been an unexpected error in account creation',
        confirmButtonColor: '#F25C54'

      })
  });


//console.log("milkd");
}

function logInUser(){
    let email = $("#email-li").val();
    let password = $("#pw-li").val();
    
   // console.log("login");
    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    $("#email-li").val("");
    $("#pw-li").val("");
    var user = userCredential.user;
    Swal.fire({
        icon: 'success',
        text: "You have successfully logged in.",
        background: "#ffd666" ,
        confirmButtonColor: '#A7E8BD'
      })
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    Swal.fire({
        background: "#ffd666",
        title: "Error",
        text: 'There has been an unexpected error in Login.',
        confirmButtonColor: '#F25C54'

      })
  });

}
function signOut(){

    Swal.fire({
        text: "Are you sure you want to log out?",
        icon: 'warning',
        background: "#ffd666" ,
        showCancelButton: true,
        confirmButtonColor: '#A7E8BD',
        cancelButtonColor: '#F25C54',
        confirmButtonText: 'Yes, logout',
        customClass: {
            container: 'popup-back',
            popup: 'popup',
            header: 'head',

        }

      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            background: "#ffd666",
            text: 'You have been logged out.',
            confirmButtonColor: '#A7E8BD'

          })
          firebase.auth().signOut().then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
          
        }
      })

}

function initlistener(){
    $(window).on("hashchange",route);
//when the hamburger menu is clicked, display the mobile nav
    $("nav .fa-bars").click(function(){
        //console.log("nice")
        $(".mobile-nav").css("display", "flex");
        $(".mobile-nav").css("animation", "nav-in 1s");
    });

    //when the background of a mobile nav is clicked, remove it
    $("body").on("click", ".mobile-nav", function(e) {
        $(".mobile-nav").css("animation", "nav-out 1s");
        setTimeout(() => {
            $(".mobile-nav").css("display", "none");
        }, 1000);
    });
    $("div#logIn").click(function(){createUser();});


    route();
}
function underlineActivePage(){
    $(".nav-buttons a").click(function(){
        $("a.active").removeClass("active");
        $(this).addClass("active");
    });
    $(".mobile-nav a").click(function(){
        $("a.active").removeClass("active");
        $(this).addClass("active");
    });
    
}




$(document).ready(function(){
    try{
        initFirebase();
        initlistener();
        underlineActivePage();
        
        let app = firebase.app();
    }catch{
        console.log("gwa");
    }
    
})