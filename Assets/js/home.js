// extend Date with a function called getMonthName() that returns the name of the month
Date.prototype.getMonthName = function() {
  switch (this.getMonth()) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
  }
}

let data = fetch('https://api.github.com/repos/WatchTubeTeam/WatchTube/releases/latest');
data = data.then(data => data.json());
data.then(data => {
  if (data.message) {
    document.getElementById("versions-title").innerHTML = `GitHub API Unavailable`;
    let element = document.getElementById("versions")
    let left = element.children[0]
    left.children[0].innerHTML = "?"
    left.children[1].innerHTML = "We don't know the release date"
  } else {
    let element = document.getElementById("versions")
    let left = element.children[0]
    let right = element.children[1]
    left.children[0].innerHTML = data.tag_name
    // parse date and turn it into MM DD, YYYY
    let date = new Date(data.published_at)
    let month = date.getMonthName()
    let day = date.getDate()
    let year = date.getFullYear()
    left.children[1].innerHTML = `${month} ${day}, ${year}`
    let notes = right.children[0]
    let body = data.body.split("\r\n")
    notes.innerHTML = ""
    for (let bulletPoint of body) {
      notes.innerHTML = notes.innerHTML + `<li>${bulletPoint}</li>`
    }
  }
});
