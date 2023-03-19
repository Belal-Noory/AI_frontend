import SideDrawer from "../components/miscellaneous/SideDrawer";
import { UserState } from "../Context/UserProvider";
import ChatBody from "../components/ChatBody";
import ChatInput from "../components/ChatInput";
import { useMutation } from "react-query";
import { useState } from "react";
import "../App.css"
const Chatpage = () => {
  const { user } = UserState();
  const [chat, setChat] = useState([]);
  const mutation = useMutation({
    mutationFn: () => {
      return fetchResponse(chat,user.token);
    },
    onSuccess: (data) =>
      setChat((prev) => [
        ...prev,
        { sender: "ai", message: data.message.replace(/^\n\n/, "") },
      ]),
  });

  const sendMessage = async (message) => {
    await Promise.resolve(setChat((prev) => [...prev, message]));
    mutation.mutate();
  };

  const fetchResponse = async (chat, token) => {
    try {
      // after depoloyment you should change the fetch URL below
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          message: chat.map((message) => message.message).join(" \n ")
        })
      })

      const data = await response.json()
      return data
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <div className="bg-[#1A232E] h-screen py-6 relative sm:px-16 px-12 text-white overflow-hidden flex flex-col justify-between align-middle">
        {/* body */}
        <div className="h-[90%] overflow-auto w-full max-w-4xl min-w-[20rem] py-8 px-4 self-center scrollbar-thumb-slate-400 scrollbar-thin scrollbar-track-gray-tranparent scrollbar-thumb-rounded-md">
          <ChatBody chat={chat} />
        </div>

        {/* input */}
        <div className="w-full max-w-4xl min-w-[20rem] self-center">
          <ChatInput sendMessage={sendMessage} loading={mutation.isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Chatpage;
