import { useMutation, gql } from "@apollo/client";
import React, { useEffect, useState, } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container } from "reactstrap";
import { STORE_OTHER_USERS, STORE_USER_INFO } from "../../store/actions/types";
import { LOAD_USER_MUTATION } from "../Auth/Login";
import { useSelector, } from 'react-redux';
import Left from "./Chat/Containers/Left";
import Right from "./Chat/Containers/Right";

import Header from "./Header";
