// Sample code from https://youtu.be/VgA4wCaxp-Q

// Sample data and Database object
const users = [
  {
    id: "b1",
    username: "Ben",
    gender: "male",
    friends: [
      {
        id: "2",
        username: "Ashleigh",
        gender: "female"
      },
      {
        id: "3",
        username: "Mike",
        gender: "male"
      },
      {
        id: "4",
        username: "Amy",
        gender: "female"
      },
    ]
  },
  {
    id: "m1",
    username: "Mark",
    gender: "male",
    friends: [
      {
        id: "b1",
        username: "Ben",
        gender: "male",
        friends: [
          {
            id: "2",
            username: "Ashleigh",
            gender: "female"
          },
          {
            id: "3",
            username: "Mike",
            gender: "male"
          },
          {
            id: "4",
            username: "Amy",
            gender: "female"
          },
        ]
      },
      {
        id: "b2",
        username: "Bill",
        gender: "male",
        friends: [
          {
            id: "2",
            username: "Bridget",
            gender: "female"
          },
          {
            id: "3",
            username: "Phil",
            gender: "male"
          },
          {
            id: "4",
            username: "Bonnie",
            gender: "female"
          },
        ]
      },
      {
        id: "j2",
        username: "Jennifer",
        gender: "female",
        friends: [
          {
            id: "6",
            username: "Samantha",
            gender: "female"
          },
          {
            id: "7",
            username: "Jessica",
            gender: "female"
          },
          {
            id: "4",
            username: "Amy",
            gender: "female"
          },
        ]
      },
    ]
  },
  {
    id: "j2",
    username: "Jolene",
    gender: "female",
    friends: [
      {
        id: "g1",
        username: "Greg",
        gender: "male",
        friends: [
          {
            id: "2",
            username: "Ashleigh",
            gender: "female"
          },
          {
            id: "3",
            username: "Mike",
            gender: "male"
          },
          {
            id: "4",
            username: "Amy",
            gender: "female"
          },
        ]
      },
      {
        id: "b2",
        username: "Bill",
        gender: "male",
        friends: [
          {
            id: "2",
            username: "Bridget",
            gender: "female"
          },
          {
            id: "3",
            username: "Phil",
            gender: "male"
          },
          {
            id: "4",
            username: "Bonnie",
            gender: "female"
          },
        ]
      },
      {
        id: "j2",
        username: "Jennifer",
        gender: "female",
        friends: [
          {
            id: "6",
            username: "Samantha",
            gender: "female"
          },
          {
            id: "7",
            username: "Jessica",
            gender: "female"
          },
          {
            id: "4",
            username: "Amy",
            gender: "female"
          },
        ]
      },
    ]
  }
]
const database = {
  fetch: function (username) {
    let matchedUsers = users.filter(user => user.username === username);
    if (matchedUsers.length > 0) {
      return matchedUsers[0];
    }
    return null;
  }
}

// Monads - function programming pattern

/*

  MONAD - 
  Design Pattern in which pipline implementation are abstracted by wrapping a value in a type

*/

// Maybe Monad Class
class Maybe {
  constructor(value, log) {
    this.value = value;
    this.log = log || [];
  }

  apply = function (func) {
    if (this.log.length > 0) {
      let cnt = this.log.length;
      console.log("apply() call number: " + cnt);
      console.log(this.log[cnt - 1]);
      console.log("\r\n");
    }
    if (this.value === null) {
      return this;
    }
    this.value = func(this.value);
    return new Maybe(this.value, this.log = [...this.log, JSON.stringify(this.value)]);
  }

  bind = function (func) {
    if (this.value === null) {
      return this;
    }
    this.value = func(this.value);
    return new Maybe(this.value);
  }

  extract = function () {
    return this.value;
  }


}







// EXAMPLE SCENARIO
/*

  let username = "Ben";
  let userObject = database.fetch(username);
  let userFriends = userObject.friends;
  let firstFriend = userFriends.first();
  let firstFriendGender = userFriends.gender;

  any one of the lines above could fail by being null
  and it being passed in to another function

*/

let username = "Ben";
let user = database.fetch(username);
let userFriends = user.friends;
let firstFriend = userFriends[0]
let firstFriendGender = firstFriend.gender;

console.log("Example scenario - No Monad - Fails if any step is null");
console.log(`First friend gender: ${firstFriendGender}`);
console.log("\r\n");



// USING THE MAYBE SCENARIO
/*

  let firstFriendGender = Maybe("Ben")
    .bind(database.fetch)
    .bind(user => user.friends)
    .bind(friends => friends.first())
    .bind(friend => friend.gender)

*/

let firstFriendGenderMaybeBind = new Maybe("steve")
  .bind(database.fetch)
  .bind(user => user.friends)
  .bind(friends => friends[0])
  .bind(friend => friend.gender)
  .extract();

console.log("Using the Maybe bind scenario - returns null if any bind() calls fail - doesn't blow up");
console.log(`The maybe bind first friend gender is ${firstFriendGenderMaybeBind} due to a bad username`);
console.log("\r\n");
console.log("Logging from using Maybe apply")
console.log("\r\n");

let firstFriendGenderMaybeApply = new Maybe("Mark")
  .apply(database.fetch)
  .apply(user => user.friends)
  .apply(friends => friends[0])
  .apply(friend => friend.gender)
  .extract();

console.log("Using the Maybe apply scenario - returns null if any apply() calls fail - doesn't blow up");
console.log(`The maybe apply first friend gender: ${firstFriendGenderMaybeApply}`);