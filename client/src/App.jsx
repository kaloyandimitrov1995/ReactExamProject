import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import PrivateRoute from './components/guards/PrivateRoute.jsx';
import GuestRoute from './components/guards/GuestRoute.jsx';
import Home from './components/pages/Home.jsx';
import Login from './components/pages/Login.jsx';
import Register from './components/pages/Register.jsx';
import Contact from './components/pages/Contact.jsx';
import FAQ from './components/pages/FAQ.jsx';
import TopicCreate from './components/pages/TopicCreate.jsx';
import TopicDetails from './components/pages/TopicDetails.jsx';
import UserEdit from './components/pages/UserEdit.jsx';
import UserProfile from './components/pages/UserProfile.jsx';
import NotFound from './components/pages/NotFound.jsx';
import Sidebar from './components/layout/Sidebar.jsx';
import TopTopicsSidebar from './components/layout/TopTopicsSidebar.jsx';


export default function App() {
  return (
  <div className="app-container">
  <Header />

  <main className="layout">
    <Sidebar />
    <div className="content">
  <Routes>
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/topics/create" element={<TopicCreate />} />
            <Route path="/topics/:topicId" element={<TopicDetails />} />
            <Route path="/profile/edit" element={<UserEdit />} />
            <Route path="/users/:userId" element={<UserProfile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
    <TopTopicsSidebar /> 
  </main>

  <Footer />
</div>
  );
}


