import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import Loader from "../Loader/Loader";

import { db } from "../../../firebase.config";

import AvatarNone from "../../assets/imgs/avatar-default.svg";
import ArrowUp from "../../assets/imgs/arrow-up.svg";
import Checkmark from "../../assets/imgs/checkmark.svg";

function SupportChat({ supportChat }) {
  const currentUser = useSelector(state => state.auth.currentUser);
  
  const [chatMessages, setChatMessages] = useState(null);
  const [isInp, setIsInp] = useState("");

  const scrollDownRef = useRef();

  const chatMessagesRef = db
  .collection("chat")
  .doc(currentUser.id.toString())
  .collection("messages");

  useEffect(() => {
    chatMessagesRef.orderBy("time").onSnapshot(snap => {
      if (!snap.empty) {
        const messages = snap.docs.reduce((accum, curr) => [...accum, curr.data()], []);
        setChatMessages(messages);
      }
      else setChatMessages([]);
    })
  }, []);

  useEffect(() => {
    if (scrollDownRef.current.scrollTo) {
      scrollDownRef.current.scrollTo({
        top: scrollDownRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
    else {
      scrollDownRef.current.scrollTop = scrollDownRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const sendUserMessage = async (term) => {
    const messages = await chatMessagesRef.get();
    const message = {
      read: false,
      receiver: 0,
      sender: currentUser.id,
      text: term,
      time: new Date()
    };

    if (messages.empty) {
      const userMessage = {
        lastMessage: message.text,
        lastMessageDate: message.time,
        lastMessageRead: message.read,
        lastMessageSender: currentUser.id,
        uid: currentUser.id.toString(),
        user: null,
        userId: currentUser.id
      }

      db
      .collection("chat")
      .doc(currentUser.id.toString())
      .set(userMessage);
    }
    chatMessagesRef.add(message);
    setIsInp("");
  }

  return (
    <div className="support-chat w-4/5 shadow-[0_10px_19px_0_rgba(204,_204,_204,_.4)] mx-auto">
      
      <div className="support-chat-head text-main p-3 border-b-[1px]">
        <div className="head-info flex items-center gap-x-3">
          <div className="head-info-img relative">
            <img className="w-14 h-14 rounded-full object-contain" src={AvatarNone} />
            <div className="w-3 h-3 rounded-full absolute top-2 right-1 bg-green-600 animate-pulse"></div>
          </div>
          <div className="head-info-text">
            <h3 className="font-medium">{supportChat[0]}</h3>
            <span className="text-main-bright">{supportChat[1]}</span>
          </div>
        </div>
      </div>

      <div
        className="support-chat-content h-72 overflow-y-auto p-3"
        ref={scrollDownRef}
      >
        {
          chatMessages ?
          chatMessages.map((message, idx) => {
            if (message.sender === 0) {
              return (
                <div key={idx} className="support-messages my-2 bg-main-bright px-3 py-2 w-max rounded-lg flex gap-x-1 items-end text-white">
                  <span>{message.text}</span>
                  <span
                      className="text-[.75rem] text-[#e1e1e1]">
                        {(new Date(message.time.seconds * 1000)).toLocaleString("ru-RU", {hour: "2-digit", minute: "2-digit"})}
                    </span>
                </div>
              )
            }
            else {
              return (
                <div key={idx} className="user-messages my-2 bg-main-bright px-3 py-2 w-max rounded-lg mr-0 ml-auto flex gap-x-1 items-end text-white">
                  <span>{message.text}</span> 
                  <span
                    className="text-[.75rem] text-[#e1e1e1]">
                      {(new Date(message.time.seconds * 1000)).toLocaleString("ru-RU", {hour: "2-digit", minute: "2-digit"})}
                  </span>
                  <img className="w-3 h-3" src={Checkmark} />
                  {
                    message.read &&
                    <img className="w-3 h-3 -ml-3" src={Checkmark} />
                  }
                </div>
              )
            }
          })
          :
          <div className="flex justify-center items-center h-full">
            <Loader />
          </div>
        }
        
      </div>

      <div className="support-chat-footer border-t-[1px]">
        <div className="footer-inp flex justify-between items-center relative">
          <input
            value={isInp}
            onChange={(e) => setIsInp(e.target.value)}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                sendUserMessage(isInp);
              }
            }}
            className="w-full p-5 outline-none"
            type="text"
            placeholder={supportChat[2]} />
          <button
            onClick={() => sendUserMessage(isInp)}
            disabled={!isInp}
            className="w-10 h-10 rounded-full bg-main absolute right-3 disabled:opacity-30">
            <img className="w-6 h-6 mx-auto" src={ArrowUp} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SupportChat;
