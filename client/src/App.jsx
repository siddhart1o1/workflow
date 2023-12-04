import "./App.css";
import axios from "axios";
import PrivateRoute from "./Protected_routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Signup from "./components/auth_components/Signup";
import Home from "./components/dashboard/Home";
import Layout from "./components/Layout";
import Login from "./components/auth_components/Login";
import Topics from "./components/topics/Topics";
import Page_not_found from "./components/Page_not_found";
import Subtopics from "./components/topics/Subtopics";
import Add_que from "./components/interviewer_components/Add_que";
import Report from "./components/report/Report";
import Scoreboard from "./components/interviewer_components/Scoreboard";
import Chat from "./components/chat_components/ChatPage";
import Profile from "./components/profile_components/Profile";
import AddList from "./components/interviewer_components/AddLists";
import EditList from "./components/interviewer_components/EditLists";
import List_subtopic from "./components/interviewer_components/List_subtopic";
import New_topic_subtopic from "./components/interviewer_components/New_topic_subtopic";
import New_subtopic from "./components/interviewer_components/New_subtopic";
import EditForm from "./components/interviewer_components/EditForm";
import Blog from "./components/blog/Blog";
import BlogForm from "./components/blog/BlogForm";
import Unauthorized from "./components/Unauthorized";
import MyCalendar from "./components/calendar/Calender";
import Invite from "./components/interviewer_components/Invite";
import InviteForm from "./components/auth_components/InviteForm";
import { SocketProvider } from "./components/Context";
import LobbyScreen from "./components/video_components/Lobby";
import RoomPage from "./components/video_components/Room";

axios.defaults.baseURL = `${import.meta.env.VITE_BACKEND_URL}`;
axios.defaults.withCredentials = true;
function App() {
  return (
    <>
      <SocketProvider>
        <Router>
          <Routes>
            <Route path="/signup" index element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/invite-form" element={<InviteForm />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/room/:roomId" element={<RoomPage />} />
            <Route path="*" element={<Page_not_found />} />
            <Route element={<Layout />}>
              <Route path="/home" index element={<Home />} />
              <Route path="/blogs" element={<Blog />} />
              <Route path="/blog/form" element={<BlogForm />} />
              <Route path="/add" element={<AddList />} />
              <Route path="/add/:topic" element={<List_subtopic />} />
              <Route path="add/:topic/:subtopic" element={<Add_que />} />
              <Route path="/edit" element={<EditList />} />
              <Route path="/edit-form/:id" element={<EditForm />} />
              <Route path="/new" element={<New_topic_subtopic />} />
              <Route path="/new/:topic" element={<New_subtopic />} />
              <Route path="/invite" element={<Invite />} />
              <Route path="/:topic" element={<Topics />} />
              <Route path="/:topic/:subtopic" element={<Subtopics />} />
              <Route path="/scoreboard" element={<Scoreboard />} />
              <Route path="/report" element={<Report />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/calender" element={<MyCalendar />} />
              <Route path="/room" element={<LobbyScreen />} />
            </Route>
          </Routes>
        </Router>
      </SocketProvider>
    </>
  );
}

export default App;
