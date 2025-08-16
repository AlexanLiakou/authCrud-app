import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";

const Dashboard = () => {

  const navigate = useNavigate();
  const {user} = useSelector((state:RootState) => state.auth);

  useEffect(() => {

    if(!user) {
      navigate('/login')
    }

  }, [user, navigate]);

  return (
    <>Dashboard</>
  )
}

export default Dashboard;