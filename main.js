console.log("main.js file now loaded...");

// handles when the user submits a user name in the form
function handleSubmit() {
  $("#username-form").on("submit", e => {
    e.preventDefault();
    const username = $("#userid").val();
    if (username.length < 1) {
      $(".error").html("<h1>PLEASE ENTER A GITHUB USERNAME</h1>");
    }
    //passes the name the user gave to the getUserRepos function
    getUserRepos(username);
  });
}

// handles rendering the data on the DOM
function renderData(data) {
  return data.map(repo => {
    $(".repos").append(
      `<li class="repo"><b>${repo.name}</b>: <i><a href='${repo.html_url}' target='_blank'>${repo.html_url}</a></i></li>`
    );
  });
}

// takes the username and calls the Fetch function 
//and assuming everything went ok with the call it passes the data to the renderData function for rendering
function getUserRepos(username) {
  $(".repos").html("");
  const url = `https://api.github.com/users/${username}/repos`;
  const options = {
    headers: new Headers({
      // for security purposes this auth code no longer works
      Authorization: "9d4d257276deb682054b6a4084dd911ce96b2b5f",
      "Content-Type": "application/vnd.github.v3+json",
    }),
  };
  fetch(url, options)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        $(".error").html("<h1>User not found!</h1>");
        throw new Error(response.statusText);
      }
    })
    .then(data => renderData(data))
    .catch(err => console.log(err));
}

// immediately invokes the handlesubmit listener function
(() => handleSubmit())();
