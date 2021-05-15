// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyBk878Crirn_MxBeoo8iWpIw5h2ynZWii0",
  authDomain: "hello-fb708.firebaseapp.com",
  databaseURL:
    "https://hello-fb708-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "hello-fb708",
  storageBucket: "hello-fb708.appspot.com",
  messagingSenderId: "1097012674188",
  appId: "1:1097012674188:web:936852cc39b5667e5f85a9",
  measurementId: "G-TPHCJTE793",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
var db = firebase.firestore();

/*

-------------------------------------------------------------
The beginning of login.html 

*/

function signIn() {
  var email = document.getElementById("email");
  var password = document.getElementById("password");

  const promise = auth.signInWithEmailAndPassword(email.value, password.value);
  promise.catch((e) => alert(e.message));

  // take a user to a new page
  auth.onAuthStateChanged(function (user) {
    if (user) {
      location.href = "../bilim/bilim.html";
      //is signed in
    } else {
      //no user signed in
    }
  });
}

/*

The end of login.html

-----------------------------------------------------------------------------------------------------------

Beginning of add.html

*/

function save() {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      var myUserId = user.uid;
      var docRef = db.collection("users").doc(myUserId);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            var category = doc.data().bilimcat;
            var categoryName = doc.data().bilimcatName;

            var color = document.getElementById("color").value;
            var cost = parseInt(document.getElementById("cost").value);
            var description = document.getElementById("description").value;
            var icon = document.getElementById("icon").value;
            var name = document.getElementById("name").value;
            var ownerUid = user.uid;
            var myPhoneNumber = document.getElementById("phoneNumber").value;
            var phoneNumber = [myPhoneNumber];
            var myOptionalPhoneNumber,
              phoneElement = document.getElementById("optionalPhoneNumber");

            if (phoneElement != "") {
              myOptionalPhoneNumber = phoneElement.value;
              phoneNumber.push(myOptionalPhoneNumber);
            }

            var rating = 5;
            var testCount = 0;
            var videoCount = 0;
            var views = 0;

            db.collection("bilim")
              .add({
                addMatCount: 0,
                category: category,
                categoryName: categoryName,
                color: color,
                cost: cost,
                date: firebase.firestore.FieldValue.serverTimestamp(),
                description: description,
                icon: icon,
                likes: 0,
                name: name,
                ownerUid: ownerUid,
                phoneNumber: phoneNumber,
                rating: rating,
                testCount: testCount,
                videoCount: videoCount,
                views: views,
              })
              .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
              })
              .catch((error) => {
                console.error("Error adding document: ", error);
              });

            alert("Saved");
          }
        })
        .catch((error) => {
          console.log("Error getting document: ", error);
        });

      //is signed in
    }
  });
}

/*

The end of add.html

-----------------------------------------------------------------------------------------------------------

The beginning of update.html

*/

function update() {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      var selectedCourse = document.getElementById("course").value;

      var color = document.getElementById("updateColor").value;
      var cost = parseInt(document.getElementById("updateCost").value);

      var date = new Date().toLocaleString().replace(",", "");
      var description = document.getElementById("updateDescription").value;
      var icon = document.getElementById("updateIcon").value;
      var name = document.getElementById("updateName").value;
      var ownerUid = user.uid;
      var myPhoneNumber = document.getElementById("updatePhoneNumber").value;
      var phoneNumber = [myPhoneNumber];
      var myOptionalPhoneNumber,
        phoneElement = document.getElementById("updateOptionalPhoneNumber");

      if (phoneElement != "") {
        myOptionalPhoneNumber = phoneElement.value;
        phoneNumber.push(myOptionalPhoneNumber);
      }

      db.collection("bilim").doc(selectedCourse).set({
        color: color,
        cost: cost,
        date: date,
        description: description,
        icon: icon,
        likes: 0,
        name: name,
        ownerUid: ownerUid,
        phoneNumber: phoneNumber,
      });

      alert("Updated");
    }
  });
}

function generateForUpdate() {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      var userUid = user.uid;
      db.collection("bilim")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data().ownerUid === userUid) {
              array.push(doc.data().name);
              arrayId.push(doc.id);
            }
          });

          var valuesName = array;
          var valuesId = arrayId;

          var select = document.createElement("select");
          select.name = "course";
          select.id = "course";
          var count = 0;

          for (const val of valuesName) {
            var option = document.createElement("option");
            option.value = valuesId[count];
            count += 1;
            option.text = val.charAt(0).toUpperCase() + val.slice(1);
            select.appendChild(option);
          }

          var label = document.createElement("label");

          label.innerHTML = "Выберите курс: ";
          label.htmlFor = "courses";

          document
            .getElementById("container")
            .appendChild(label)
            .appendChild(select);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }

    createButtonForUpdate();
  });
}

function fillUpdate() {
  var selectedCourse = document.getElementById("course").value;
  var docRef = db.collection("bilim").doc(selectedCourse);

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        // console.log("Document data:", doc.data());

        var color = doc.data().color;
        var cost = doc.data().cost;
        var description = doc.data().description;
        var icon = doc.data().icon;
        var name = doc.data().name;
        var phoneNumber = doc.data().phoneNumber[0];
        var optionalPhoneNumber = doc.data().phoneNumber[1];

        document.getElementById("updateColor").value = color;
        document.getElementById("updateCost").value = cost;
        document.getElementById("updateDescription").value = description;
        document.getElementById("updateIcon").value = icon;
        document.getElementById("updateName").value = name;
        document.getElementById("updatePhoneNumber").value = phoneNumber;
        document.getElementById("updateOptionalPhoneNumber").value =
          optionalPhoneNumber;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

function createButtonForUpdate() {
  var chooseButton = document.createElement("BUTTON");
  var chooseButtonText = document.createTextNode("Выбрать");
  chooseButton.appendChild(chooseButtonText);
  document.body.appendChild(chooseButton);

  document.getElementById("chooseButton").appendChild(chooseButton);
}

/*
The end of update.html

-----------------------------------------------------------------------------------------------------------

The beginnning of delete.html
*/
function deleteElement() {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      var selectedCourse = document.getElementById("course").value;
      // alert(selectedCourse)

      db.collection("bilim")
        .doc(selectedCourse)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
          goToDelete();
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });

      //user did not signed in
    }
  });
}

/* 
The end of delete.html

-----------------------------------------------------------------------------------------------------------

Buttons
*/

function goToAdd() {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      location.href = "./add.html";
      //is signed in
    } else {
      //no user signed in
    }
  });
}

function goToEdit() {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      location.href = "./update.html";
      //is signed in
    } else {
      //no user signed in
    }
  });
}

function goToDelete() {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      location.href = "./delete.html";
      //is signed in
    } else {
      //no user signed in
    }
  });
}

function goToAddVideo() {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      location.href = "./addVideo.html";
    }
  });
}

function goToAddTest() {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      location.href = "./addTest.html";
    }
  });
}

function goToAddQuestions() {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      location.href = "./addQuestions.html";
    }
  });
}

function signOut() {
  auth.signOut();
  location.href = "../login/login.html";
}

//The end of buttons section -------------------------------------------------------------------------

// edit mn delete degenderge generator

var myData;
var array = [];
var arrayId = [];

function generate() {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      var userUid = user.uid;
      db.collection("bilim")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data().ownerUid === userUid) {
              array.push(doc.data().name);
              arrayId.push(doc.id);
            }
          });

          var valuesName = array;
          var valuesId = arrayId;

          var select = document.createElement("select");
          select.name = "course";
          select.id = "course";
          var count = 0;

          for (const val of valuesName) {
            var option = document.createElement("option");
            option.value = valuesId[count];
            count += 1;
            option.text = val.charAt(0).toUpperCase() + val.slice(1);
            select.appendChild(option);
          }

          var label = document.createElement("label");

          label.innerHTML = "Выберите курс: ";
          label.htmlFor = "courses";

          document
            .getElementById("container")
            .appendChild(label)
            .appendChild(select);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  });
}

// Edit in JSFiddle

/*
addVideo.html beginning 
*/

function addVideo() {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      userUid = user.uid;
      var selectedCourse = document.getElementById("course").value;
      var cost = document.getElementById("cost").value;
      switch (cost) {
        case "0":
          cost = 0;
          break;
        case "1":
          cost = 1;
          break;
        default:
          alert("Something is wrong");
      }

      var description = document.getElementById("description").value;
      var name = document.getElementById("name").value;
      var thumbnail = document.getElementById("thumbnail").value;
      var videoUrl = document.getElementById("videoUrl").value;

      db.collection("bilim").doc(selectedCourse).collection("video").add({
        available: cost,
        description: description,
        name: name,
        order: 1,
        thumbnail: thumbnail,
        videoUrl: videoUrl,
      });
    }
  });
}

/*
addVideo.html end -------------------------------------------------------------------------------------------------------
*/

//addTest.html beginning  -----------------------------------------------------------------------------------------------

function addTest() {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      var selectedCourse,
        element = document.getElementById("course");
      if (element != null) {
        selectedCourse = element.value;

        var description = document.getElementById("description").value;
        var icon = document.getElementById("icon").value;
        var id = parseInt(document.getElementById("id").value);
        var name = document.getElementById("name").value;

        db.collection("bilim").doc(selectedCourse).collection("tests").add({
          description: description,
          icon: icon,
          id: id,
          name: name,
          questions: 0,
        });

        alert("Тест добавлен");
      } else {
        alert(
          "Вы не выбрали курс, пожалуйста, выберите курс нажав на кнопку: Выбрать курс чтобы добавить тест"
        );
      }
    }
  });
}

//addQuestion.html beginning ----------------------------------------------------------------------------------------

function addQuestion() {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      var selectedCourse,
        element = document.getElementById("course");
      if (element != null) {
        selectedCourse = element.value;

        var testId,
          e = document.getElementById("qCourse");
        if (e != null) {
          testId = e.value;
          var questionNumber = document.getElementById("questionNumber").value;
          var answer = parseInt(document.getElementById("answer").value);

          var description = document.getElementById("description").value;
          var photo = document.getElementById("photo").value;
          var question = document.getElementById("question").value;
          var varA = document.getElementById("varA").value;
          var varB = document.getElementById("varB").value;
          var varC = document.getElementById("varC").value;
          var varD = document.getElementById("varD").value;
          var varE = document.getElementById("varE").value;

          db.collection("bilim")
            .doc(selectedCourse)
            .collection("tests")
            .doc(testId)
            .collection("questions")
            .doc(questionNumber)
            .set({
              answer: answer,
              question: question,
              varA: varA,
              varB: varB,
              varC: varC,
              varD: varD,
              varE: varE,
            });

            alert("Добавлено ")
        }
      }
    }
  });
}

var qArray = [];
var qArrayId = [];

function generateForTest() {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      var selectedCourse = document.getElementById("course").value;

      var userUid = user.uid;
      db.collection("bilim")
        .doc(selectedCourse)
        .collection("tests")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            qArray.push(doc.data().name);
            qArrayId.push(doc.id);
          });
          var qValuesName = qArray;
          var qValuesId = qArrayId;

          var select = document.createElement("select");
          select.name = "qCourse";
          select.id = "qCourse";
          var count = 0;

          for (const val of qValuesName) {
            var option = document.createElement("option");
            option.value = qValuesId[count];
            count += 1;
            option.text = val.charAt(0).toUpperCase() + val.slice(1);
            select.appendChild(option);
          }
          var label = document.createElement("label");

          label.innerHTML = "Выберите тест: ";
          label.htmlFor = "qCourse";

          document
            .getElementById("testContainer")
            .appendChild(label)
            .appendChild(select);
        });
    }
  });
}

//addQuestion.html end ----------------------------------------------------------------------------------------

/*

Read data example ---------------------------------------------------------------------------------------------------
*/
function getMyData() {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      var myUserId = user.uid;
      var docRef = db.collection("users").doc(myUserId);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log(doc.data().bilimcatName);
          }
        })
        .catch((error) => {
          console.log("Error getting document: ", error);
        });
    }
  });
}

function getMultiData() {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      var userUid = user.uid;
      db.collection("bilim")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data().ownerUid === userUid) {
              console.log(doc.data().name);
            }
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  });
}

// generate button confirmation ---------------------------------------------------------------------

function confirmation() {
  var deleteButton = document.createElement("BUTTON");
  var deleteButtonText = document.createTextNode("Удалить");

  var myH1 = document.createElement("h5");
  var myH1Text = document.createTextNode(
    "Вы уверены что хотите удалить этот курс?"
  );

  myH1.appendChild(myH1Text);

  var cancelButton = document.createElement("BUTTON");
  var cancelButtonText = document.createTextNode("Отмена");

  deleteButton.setAttribute("style", "color:red;font-size:23px;margin:1rem");
  cancelButton.setAttribute("style", "color:red;font-size:23px;margin:1rem");

  deleteButton.appendChild(deleteButtonText);
  document.body.appendChild(deleteButton);

  cancelButton.appendChild(cancelButtonText);
  document.body.appendChild(cancelButton);

  document.getElementById("myH1").appendChild(myH1);
  document.getElementById("deleteButton").appendChild(deleteButton);
  document.getElementById("cancelButton").appendChild(cancelButton);
}

// add subcollection to the existing collection

/*
Draft
Draft
Draft
Draft
Draft
Draft
Draft
*/
