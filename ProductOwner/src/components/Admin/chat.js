import "./../../css/chat.css";
import { IoSend } from "react-icons/io5";
import io from "socket.io-client";
import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import api from "./../../config.service";
import convertDate from "../function";
const socket = io.connect("http://localhost:4100");

var FirstDay = [
  {
    ok: true,
    user: {
      TypeUser: 1,
      user: {
        _id: "6229e096223ecaaf508f186c",
        company_name: "Lay's",
        company_email: "feres.zareb@gmail.com",
        logo_url:
          "http://res.cloudinary.com/dduhpdqv3/image/upload/v1646829662/E-Market/Images/kvrnarr7cueomlrvc153.png",
        country: "Tunisia",
        city: "Mannouba",
        state: "Tunis",
        zip_code: 1110,
        address: "num10 rue42222",
        professional_phone_number: 55666333,
        creation_date: "2018-10-15T00:00:00.000Z",
        tax_ID_number: "d54qsd5454qsg4545f54",
        tax_ID_card: "url000000000000000000000",
        owner_ID_type: "CIN",
        owner_ID: "423115164978979979856789",
        RNE_number: 165,
        createdAt: "2022-03-10T11:27:18.161Z",
        updatedAt: "2022-03-16T17:52:19.131Z",
        __v: 0,
      },
    },
    otherUser: {
      TypeUser: 0,
      user: {
        _id: "62441ca1703cea1d20c58fa4",
        firstname: "med",
        lastname: "zerai",
        email: "mohamed0zerai@gmail.com",
        profile_img:
          "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0=",
        birth_date: "2022-03-30T09:02:20.670Z",
        country: "country",
        city: "city",
        state: "state",
        zip_code: "0000",
        address: "address",
        numTel: 55663322,
        createdAt: "2022-03-30T09:02:25.136Z",
        updatedAt: "2022-03-30T09:02:55.046Z",
        __v: 0,
      },
    },
    message: [
      {
        _id: "6245e501ce86640dc575c8a6",
        content: "salut",
        fromId: "62441ca1703cea1d20c58fa4",
        createdAt: "2022-03-31T17:29:37.079Z",
        updatedAt: "2022-03-31T17:29:37.079Z",
        __v: 0,
        roomId: "6245f9be29350928f6b5c752",
      },
    ],
  },
  {
    ok: false,
    user: {
      TypeUser: 1,
      user: {
        _id: "6229e096223ecaaf508f186c",
        company_name: "Lay's",
        company_email: "feres.zareb@gmail.com",
        logo_url:
          "http://res.cloudinary.com/dduhpdqv3/image/upload/v1646829662/E-Market/Images/kvrnarr7cueomlrvc153.png",
        country: "Tunisia",
        city: "Mannouba",
        state: "Tunis",
        zip_code: 1110,
        address: "num10 rue42222",
        professional_phone_number: 55666333,
        creation_date: "2018-10-15T00:00:00.000Z",
        tax_ID_number: "d54qsd5454qsg4545f54",
        tax_ID_card: "url000000000000000000000",
        owner_ID_type: "CIN",
        owner_ID: "423115164978979979856789",
        RNE_number: 165,
        createdAt: "2022-03-10T11:27:18.161Z",
        updatedAt: "2022-03-16T17:52:19.131Z",
        __v: 0,
      },
    },
    otherUser: {
      TypeUser: 1,
      user: {
        _id: "6229e10d223ecaaf508f1875",
        company_name: "MAcdo",
        company_email: "mohamed.zerai@istic.ucar.tn",
        logo_url:
          "http://res.cloudinary.com/dduhpdqv3/image/upload/v1646911695/E-Market/Images/tmpo6anktbvlgmnlosor.png",
        country: "Tunisia",
        city: "Mannouba",
        state: "Tunis",
        zip_code: 1010,
        address: "num10 rue42222",
        professional_phone_number: 55686333,
        creation_date: "2018-10-15T00:00:00.000Z",
        tax_ID_number: "d54qsd5454qsg4545f54",
        tax_ID_card: "url000000000000000000000",
        owner_ID_type: "CIN",
        owner_ID: "423115164978979979856789",
        RNE_number: 165,
        createdAt: "2022-03-10T11:29:17.417Z",
        updatedAt: "2022-03-29T15:35:18.147Z",
        __v: 0,
      },
    },
    message: [
      {
        _id: "6245f8a18c849da4b2504d9f",
        content: "salut from po",
        fromId: "6229e10d223ecaaf508f1875",
        roomId: "6245f568f858efbeb7e388d4",
        createdAt: "2022-03-31T18:53:21.129Z",
        updatedAt: "2022-03-31T18:53:21.129Z",
        __v: 0,
      },
    ],
  },
];

const Chat = () => {
  const [showCharge, setshowCharge] = useState(false);
  const [room, setRoom] = useState("");

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: localStorage.getItem("access_token"),
        message: currentMessage,
        time: convertDate(new Date().toISOString()),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };
  const sound = new Audio(
    "https://chat-engine-assets.s3.amazonaws.com/click.mp3"
  );
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [
        ...list,
        {
          isUser: true,
          message: data.message,
          time: data.time,
        },
      ]);
      sound.play();
    });
  }, [socket]);

  const [UserToChat, setUserToChat] = useState({});
  const changeUser = (item) => {
    if (item.id !== room) {
      setshowCharge(true);
      socket.emit("leave_room", room);
      setRoom(item.id);
      if (item.user.TypeUser === 1) {
        setUserToChat(item.user.user);
      }
      if (item.user.TypeUser === 0) {
        setUserToChat(item.user.user);
      }
      getChatConversation(item.id);

      socket.emit("join_room", item.id);
      setshowCharge(false);
    }
  };
  const getChatConversation = async (idRoom) => {
    api.post("/Chat", { roomId: idRoom }).then((res) => {
      let newConversation = [];
      for (var i = 0; i < res.data.length; i++) {
        newConversation.push({
          isUser: res.data[i].isUser1,
          message: res.data[i].content,
          time: convertDate(res.data[i].createdAt),
        });
      }
      setMessageList((list) => newConversation);
    });
  };
  //begin api getAllConversationRooms
  const [data, setData] = useState([]);
  const retrieveData = async () => {
    const response = await api.get("/room/disc");
    console.log(response.data);
    return response.data;
  };
  useEffect(() => {
    const getAllRooms = async () => {
      const newData = await retrieveData();
      if (newData) setData(newData);
    };
    getAllRooms();
  }, []);
  //end api getAllConversationRooms
  return (
    <div className="container-lg mt-5 mb-5 max-width-1000 bg-white shadow">
      <div className="row">
        <div className="col-4 chatLeft">
          <div className="chatLeftTitle">Chat</div>
          <ul>
            {data.map((item, key) => {
              return (
                <li
                  className={item.id === room ? "d-flex bg-grey" : "d-flex"}
                  key={key}
                  name="djdj"
                  onClick={() => {
                    changeUser(item);
                  }}
                >
                  <div
                    className="chatLeftPicture d-felx"
                    style={{
                      backgroundImage: "url(" + item.user.user.img + ")",
                    }}
                  ></div>
                  <div className="chatLeftNameUser d-flex">
                    {item.user.user.name}
                  </div>
                </li>
              );
            })}
          </ul>
          {data.length === 0 ? (
            <p className="text-center">No Room to show</p>
          ) : (
            ""
          )}
        </div>
        <div className="col-8 chatRight">
          {showCharge ? (
            <div className="loading">
              <div class="spinner-border text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="chatRightTitle">
                <div className="d-flex">
                  <div
                    className="chatRightPicture d-felx"
                    style={{
                      backgroundImage: "url(" + UserToChat.img + ")",
                    }}
                  ></div>
                  <div className="chatRightNameUser d-flex">
                    {UserToChat.name}
                  </div>
                </div>
              </div>
              <ScrollToBottom className="chatBox">
                {messageList.map((messageContent) => {
                  return messageContent.isUser === true ? (
                    <div className="receiveMessage mb-3">
                      <div className="d-flex">
                        <div
                          className="chatboxPicture d-felx"
                          style={{
                            backgroundImage: "url(" + UserToChat.img + ")",
                          }}
                        ></div>
                        <div className="d-flex MessageDisplay">
                          <div className="MessageContent messageReceiveColor">
                            {messageContent.message}
                          </div>
                        </div>
                      </div>
                      <p className="dateOfMessahe px-4">
                        {messageContent.time}
                      </p>
                    </div>
                  ) : (
                    <div className="sendMessage mb-3">
                      <div className="">
                        <div className="d-flex MessageDisplay w-100">
                          <div className="MessageContent messageSendColor m-auto me-0">
                            {messageContent.message}
                          </div>
                        </div>
                        <p className="text-end dateOfMessahe">
                          {messageContent.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </ScrollToBottom>
              <div className="messageBox">
                <form onSubmit={sendMessage}>
                  <input
                    className="sendMessageInput"
                    type="text"
                    placeholder="Enter message ..."
                    name="message"
                    autoComplete="off"
                    value={currentMessage}
                    onChange={(event) => {
                      setCurrentMessage(event.target.value);
                    }}
                  />
                  <button
                    className="btn btn-orange sendMessageBtn"
                    type="submit"
                  >
                    <IoSend />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
