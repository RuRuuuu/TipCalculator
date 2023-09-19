import React, { useState } from "react";
// import imge1 from "../assets/images/image1.svg";
// import Det from "./Det";
import { details } from "./Details";
function Tip() {
  const [initialFriends, setInitialFriends] = useState(details);
  const [showAddFriends, setShowAddFriends] = useState(false);
  const [select, setSelect] = useState(null);

  function clickIt() {
    setShowAddFriends(!showAddFriends);
  }

  function handleAddNewFriends(friends) {
    setInitialFriends(
      (previous) => [
        ...previous,
        friends,
      ] /*this means we are spreading the previous(detaials) to
        a new array (friends) we will pass in later as a parameter */
    );

    setShowAddFriends(false);
  }

  function handleSeletedFriend(friend) {
    setSelect(friend);
  }

  return (
    <div className="flex-div">
      <div className="flex-div2">
        <FriendsList
          friendss={initialFriends}
          onSelect={handleSeletedFriend}
          select={select}
          showAddfriends={setShowAddFriends}
        />
        <div className="shift">
          <Button onclicky={clickIt}>
            {showAddFriends ? "Close" : "Add Friends"}
          </Button>
        </div>
        {showAddFriends && (
          <FormAddFriend handleAddNewFriends={handleAddNewFriends} />
        )}
      </div>
      <div className="div-flex3">{select && <SplitBill select={select} />}</div>
    </div>
  );
}

export default Tip;

function FriendsList({ friendss, onSelect, select, showAddfriends }) {
  return (
    <div>
      <ul className="ull">
        {friendss.map((friends) => {
          return (
            <div
              // className={select.id === friends.id ? "selectedx" : null}
              key={friends.id}
              style={{ padding: ".7rem", borderRadius: "1rem" }}
            >
              <li className="flex">
                <img src={friends.image} alt="" />
                <div className="flex2">
                  <h3>{friends.name}</h3>
                  {friends.balance > 0 && (
                    <p className="par">
                      you owe {friends.name} {""}
                      {friends.balance}
                    </p>
                  )}
                  {friends.balance < 0 && (
                    <p className="par1">
                      {friends.name} owes you {""}
                      {friends.balance}
                    </p>
                  )}
                  {friends.balance === 0 && (
                    <p>
                      you and {friends.name} are even
                      {/* {friends.balance} */}
                    </p>
                  )}
                </div>
                <button
                  className="btn"
                  onClick={() => {
                    onSelect(friends);
                    showAddfriends(false);
                  }}
                >
                  Select
                </button>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
function Button({ children, onclicky }) {
  return (
    <button className="btn" onClick={onclicky}>
      {children}
    </button>
  );
}

function FormAddFriend({ handleAddNewFriends }) {
  const [name, setName] = useState("");
  const [imagee, setImagee] = useState("https://i.paravatar.cc/48");

  let handleChange = (e) => {
    setName(e.target.value);
  };
  let handleChangeImage = (e) => {
    setImagee(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(name);
    // console.log(imagee);

    const newFriend = {
      id: crypto.randomUUID(), //randon Id generator
      name,
      imagee,
      balance: 0,
    };

    handleAddNewFriends(
      newFriend
    ); /*so we are calling this function which updates the
    initialFriends using setInitialFriends then we passing in the new object gotten
     from the values of inputs, the randomID and the balance of 0 as the parameter(friends)
     that the initialfriends(previous or details) will spread into.
     note see the handleAddNewFriend function to understand*/

    setName("");
  }

  return (
    <form action="" onSubmit={handleSubmit} className="addform">
      <label htmlFor="" className="labelx">
        Friend name
      </label>
      <input
        type="text"
        className="inputx"
        value={name}
        onChange={handleChange}
      />
      <br />
      <br />
      <label className="labelx">Image url</label>
      <input
        type="text"
        className="inputx"
        value={imagee}
        onChange={handleChangeImage}
      />
      <br />
      <br />

      <Button>Add</Button>
    </form>
  );
}

function SplitBill({ select }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  const paidByFriend = bill ? bill - paidByUser : "";
  return (
    <form className="form2">
      <h2>Split a bill with {select.name}</h2>
      <label className="labelx">Bill value</label>
      <input
        value={bill}
        type="text"
        className="inputx"
        onChange={(e) => {
          setBill(e.target.value);
        }}
      />
      <br /> <br />
      <label className="labelx">Your expenses</label>
      <input
        type="text"
        value={paidByUser}
        className="inputx"
        onChange={(e) => {
          setPaidByUser(e.target.value);
        }}
      />
      <br /> <br />
      <label className="labelx"> {select.name} expenses</label>
      <input type="text" className="inputx" disabled value={paidByFriend} />
      <br /> <br />
      <label className="labelx">Who is paying</label>
      <select
        name=""
        id=""
        className="selecty"
        onChange={(e) => {
          setWhoIsPaying(e.target.value);
        }}
        value={whoIsPaying}
      >
        <option value="user" className="you">
          You
        </option>
        <option value="friend">{select.name}</option>
      </select>
      <br /> <br />
      <Button>Split bill</Button>
    </form>
  );
}
