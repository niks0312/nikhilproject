import React, { useEffect, useState } from "react";
import Board from "../Components/Board/Board";

import "./kanban.css";
import Editable from "../Components/Editabled/Editable";
import { useNavigate } from "react-router-dom";

function Kanban() {
  const boards = [
    { name: "backlog", id: 1, cards: [] },
    { name: "to do", id: 2, cards: [] },
    { name: "ongoing", id: 3, cards: [] },
    { name: "done", id: 4, cards: [] },
  ];
  const navigate = useNavigate();
  const allboards = localStorage.getItem("statusboard");
  const user = localStorage.getItem("user");
  const users = localStorage.getItem("users");
  const [statusboard, setStatusboard] = useState(
    JSON.parse(allboards) || boards
  );
  useEffect(() => {
    if (users === undefined || users === null) {
      navigate("/register");
    } else if (
      users !== undefined &&
      users !== null &&
      user !== undefined &&
      user !== null
    ) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);
  // const [boards, setBoards] = useState(
  //   JSON.parse(localStorage.getItem("prac-kanban")) || []
  // );

  const [targetCard, setTargetCard] = useState({
    bid: "",
    cid: "",
  });

  // const addboardHandler = (name) => {
  //   const tempBoards = [...boards];
  //   tempBoards.push({
  //     id: Date.now() + Math.random() * 2,
  //     title: name,
  //     cards: [],
  //   });
  //   setBoards(tempBoards);
  // };

  // const removeBoard = (id) => {
  //   const index = boards.findIndex((item) => item.id === id);
  //   if (index < 0) return;

  //   const tempBoards = [...boards];
  //   tempBoards.splice(index, 1);
  //   setBoards(tempBoards);
  // };

  const addCardHandler = (id, title) => {
    const allboards = localStorage.getItem("statusboard");
    const index = JSON.parse(allboards)?.findIndex((item) => item.id === id);
    console.log(index);
    if (index < 0) return;
    let localboards = JSON.parse(allboards);
    const tempBoards = localboards;
    console.log(tempBoards);
    tempBoards[index].cards.push({
      id: Date.now() + Math.random() * 2,
      title,
      labels: [],
      date: "",
      tasks: [],
    });
    localStorage.setItem("statusboard", JSON.stringify(tempBoards));
    setStatusboard(tempBoards);
  };

  const removeCard = (bid, cid) => {
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...statusboard];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    cards.splice(cardIndex, 1);
    setStatusboard(tempBoards);
  };

  const dragEnded = (bid, cid) => {
    let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex;
    s_boardIndex = statusboard.findIndex((item) => item.id === bid);
    if (s_boardIndex < 0) return;

    s_cardIndex = statusboard[s_boardIndex]?.cards?.findIndex(
      (item) => item.id === cid
    );
    if (s_cardIndex < 0) return;

    t_boardIndex = statusboard.findIndex((item) => item.id === targetCard.bid);
    if (t_boardIndex < 0) return;

    t_cardIndex = statusboard[t_boardIndex]?.cards?.findIndex(
      (item) => item.id === targetCard.cid
    );
    if (t_cardIndex < 0) return;

    const tempBoards = [...statusboard];
    const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
    tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
    tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, sourceCard);
    setStatusboard(tempBoards);

    setTargetCard({
      bid: "",
      cid: "",
    });
  };

  const dragEntered = (bid, cid) => {
    if (targetCard.cid === cid) return;
    setTargetCard({
      bid,
      cid,
    });
  };

  const updateCard = (bid, cid, card) => {
    const index = statusboard.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...statusboard];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    tempBoards[index].cards[cardIndex] = card;

    setStatusboard(tempBoards);
  };

  useEffect(() => {
    localStorage.setItem("statusboard", JSON.stringify(statusboard));
  }, [statusboard]);

  return (
    <div className="kanban">
      <div className="kanban_nav">
        <h1>Kanban Board</h1>
      </div>
      {console.log("allboards", JSON.parse(allboards))}
      <div className="kanban_boards_container">
        <div className="kanban_boards">
          {statusboard?.length > 0 &&
            statusboard?.map((item) => (
              <Board
                key={item.id}
                board={item}
                addCard={addCardHandler}
                // removeBoard={() => removeBoard(item.id)}
                removeCard={removeCard}
                dragEnded={dragEnded}
                dragEntered={dragEntered}
                updateCard={updateCard}
              />
            ))}

          {/* <div className="kanban_boards_last"> */}
          {/* <Editable
              displayClass="kanban_boards_add-board"
              editClass="kanban_boards_add-board_edit"
              placeholder="Enter Board Name"
              text="Add Board"
              buttonText="Add Board"
              // onSubmit={addboardHandler}
            /> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default Kanban;
