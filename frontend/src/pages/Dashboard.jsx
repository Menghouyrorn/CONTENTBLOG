import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashUser from "../components/DashUser";
import DashComments from "../components/DashComments";
import DashboardComp from "../components/DashboardComp";

const Dashboard = () => {

  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    setTab(tabFromUrl)
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar*/}
        <DashSidebar />
      </div>
      {/* Profile */}
      {tab === 'profile' && <DashProfile />}
      {/* posts*/}
      {tab === 'posts' && <DashPosts />}
      {/* Users*/}
      {tab === 'users' && <DashUser />}
      {/* Comments*/}
      {tab === 'comments' && <DashComments />}
      {/* Dashboard comp*/}
      {tab === 'dash' && <DashboardComp />}
    </div>
  )
}

export default Dashboard