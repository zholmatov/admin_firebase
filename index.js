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
var database = firebase.database();

//Login page

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

function signOut() {
  auth.signOut();
  location.href = "../login/login.html";
}

// Initialize Firebase

//save method to save data into firebase database

function save() {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      var newPostKey = firebase.database().ref().child("bilim").push().key;
      var category = document.getElementById("category").value;
      var categoryName;
      switch (category) {
        case "11":
          category = 11;
          categoryName = "Secom";
          break;
        case "22":
          category = 22;
          categoryName = "ЖРТ";
          break;
        case "23":
          category = 23;
          categoryName = "Алгебра";
          break;
        case "24":
          category = 24;
          categoryName = "Русский язык";
          break;
        case "25":
          category = 25;
          categoryName = "Анлис тили";
          break;
        case "26":
          category = 26;
          categoryName = "Чет өлкөдө окуу";
          break;
        default:
          alert("wrong category!");
      }

      var color = document.getElementById("color").value;
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

      var date = new Date().toLocaleString().replace(",", "");
      var description = document.getElementById("description").value;
      var icon = document.getElementById("icon").value;
      var name = document.getElementById("name").value;
      var ownerUid = user.uid;
      var myPhoneNumber = document.getElementById("phoneNumber").value;
      var rating = 5;
      var testCount = 0;
      var videoCount = 0;
      var views = 0;

      database.ref("bilim/" + newPostKey).set({
        addMatCount: 0,
        category: category,
        categoryName: categoryName,
        color: color,
        cost: cost,
        date: date,
        description: description,
        icon: icon,
        id: newPostKey,
        likes: 0,
        name: name,
        ownerUid: ownerUid,
        phoneNumber: [myPhoneNumber],
        rating: rating,
        testCount: testCount,
        videoCount: videoCount,
        views: views,
      });

      alert("Saved");
      //is signed in
    } else {
      //no user signed in
    }
  });
}

//update selected course

function update() {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      var data;
      var postKey = document.getElementById("course").value;
      var myRef = database.ref("bilim/" + postKey);
      myRef.on("value", (snapshot) => {
        data = snapshot.val();
      });
      var category = document.getElementById("category").value;
      var categoryName;
      switch (category) {
        case "11":
          category = 11;
          categoryName = "Secom";
          break;
        case "22":
          category = 22;
          categoryName = "ЖРТ";
          break;
        case "23":
          category = 23;
          categoryName = "Алгебра";
          break;
        case "24":
          category = 24;
          categoryName = "Русский язык";
          break;
        case "25":
          category = 25;
          categoryName = "Анлис тили";
          break;
        case "26":
          category = 26;
          categoryName = "Чет өлкөдө окуу";
          break;
        default:
          alert("wrong category!");
      }

      var color = document.getElementById("color").value;
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

      var date = new Date().toLocaleString().replace(",", "");
      var description = document.getElementById("description").value;
      if (description === "") {
        description = data.description;
      }
      var icon = document.getElementById("icon").value;
      if (icon === "") {
        icon = data.icon;
      }
      var name = document.getElementById("name").value;
      if (name === "") {
        name = data.name;
      }
      var ownerUid = user.uid;
      var myPhoneNumber = document.getElementById("phoneNumber").value;
      var phoneArr = [myPhoneNumber];
      if (myPhoneNumber == "") {
        phoneArr = data.phoneNumber;
      }

      database.ref("bilim/" + postKey).update({
        addMatCount: 0,
        category: category,
        categoryName: categoryName,
        color: color,
        cost: cost,
        date: date,
        description: description,
        icon: icon,
        id: postKey,
        likes: 0,
        name: name,
        ownerUid: ownerUid,
        phoneNumber: phoneArr,
      });
      alert("Обновлено");

      location.href = "./edit.html";

      //is signed in
    } else {
      //no user signed in
    }
  });
}

//function to delete data
function deleteElement() {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      var selectedCourse = document.getElementById("course").value;

      database.ref("bilim/" + selectedCourse).remove();

      alert("Выбранный вами курс успешно удален");
      location.href = "./delete.html";
    } else {
      //user did not signed in
    }
  });
}

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
      location.href = "./edit.html";
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
      //is signed in
    } else {
      //no user signed in
    }
  });
}

function goToAddTest() {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      location.href = "./addTest.html";
      //is signed in
    } else {
      //no user signed in
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

function ObjectLength(object) {
  var length = 0;
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      ++length;
    }
  }
  return length;
}

// edit mn delete degenderge generator
var myData;
var array = [];
var arrayId = [];

function generate() {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      userUid = user.uid;
      var ref = database.ref("bilim");

      ref.on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          if (childSnapshot.val().ownerUid === userUid) {
            childSnapshot.val().name;
            array.push(childSnapshot.val().name);
            arrayId.push(childSnapshot.val().id);
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
      });

      //is signed in
    } else {
    }
  });
}

var qArray = [];
var qArrayId = [];

function generateTest() {
  var postKey,
    element = document.getElementById("course");
  if (element != null) {
    postKey = element.value;

    var ref = database.ref("bilim/" + postKey + "/tests");
    ref.on("value", function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        qArray.push(childSnapshot.val().name);
        qArrayId.push(childSnapshot.val().testId);
        console.log(qArrayId);
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

      label.innerHTML = "Выберите курс: ";
      label.htmlFor = "qCourse";

      document
        .getElementById("testContainer")
        .appendChild(label)
        .appendChild(select);
    });
    console.log(ref);
  }
}
// Edit in JSFiddle

function addVideo() {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      var postKey = document.getElementById("course").value;
      var newPostKey = firebase
        .database()
        .ref()
        .child("bilim/" + postKey)
        .push().key;

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

      database.ref("bilim/" + postKey + "/video/" + newPostKey).set({
        available: cost,
        description: description,
        id: newPostKey,
        name: name,
        order: 1,
        thumbnail: thumbnail,
        videoUrl: videoUrl,
      });
    }
  });
}

//addTest.html button onclick bolgondo

function addTest() {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      var postKey,
        element = document.getElementById("course");
      if (element != null) {
        postKey = element.value;
        var newPostKey = firebase
          .database()
          .ref()
          .child("bilim/" + postKey + "/tests")
          .push().key;

        var description = document.getElementById("description").value;
        var icon = document.getElementById("icon").value;
        var id = document.getElementById("id").value;
        var name = document.getElementById("name").value;

        database.ref("bilim/" + postKey + "/tests/" + newPostKey).set({
          description: description,
          icon: icon,
          id: id,
          testId: newPostKey,
          name: name,
          questions: 0,
        });

        alert("Тест добавлен");
      } else {
        alert(
          "Вы не выбрали курс, пожалуйста, выберите курс нажав на кнопку: Выбрать курс чтобы добавить тест"
        );
      }
      location.href = "./addTest.html";
    }
  });
}

//Add question onclick bolgondo

function addQuestion() {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      var postKey,
        element = document.getElementById("course");
      if (element != null) {
        postKey = element.value;

        var testId,
          e = document.getElementById("qCourse");
        if (e != null) {
          testId = e.value;
          var newPostKey = document.getElementById("questionNumber").value;

          var answer = parseInt(document.getElementById("answer").value);

          var description = document.getElementById("description").value;
          var photo = document.getElementById("photo").value;
          var question = document.getElementById("question").value;
          var varA = document.getElementById("varA").value;
          var varB = document.getElementById("varB").value;
          var varC = document.getElementById("varC").value;
          var varD = document.getElementById("varD").value;

          database
            .ref(
              "bilim/" +
                postKey +
                "/tests/" +
                testId +
                "/questions/" +
                newPostKey
            )
            .set({
              answer: answer,
              question: question,
              varA: varA,
              varB: varB,
              varC: varC,
              varD: varD,
            });
            goToAddQuestions();
        }
      }
    }
  });
}
