import React, { useEffect, useState } from "react";
import Messages from "../components/Messages/Messages";
import InputMessages from "../components/InputMessages/InputMessages";

const Room = () => {
  return (
    <div>
      <InputMessages />
      <Messages />
    </div>
  );
};

export default Room;
