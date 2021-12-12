import React, { useState, useEffect } from "react";
import { Spinner } from 'reactstrap'
import NoChatScreen from "../NoChatScreen";
import { useMutation, gql } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux"

/* Inbox Components */
import Header from "../Inbox/Header";
import InboxChats from "../Inbox/InboxChats";
import InboxInput from "../Inbox/InboxInput";

import { STORE_CHAT_MESSAGE, STORE_CHATS_MESSAGES, RESET_MSG_LOADING } from "../../../../store/actions/types";
