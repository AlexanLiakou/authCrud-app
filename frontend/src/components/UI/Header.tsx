import { useEffect, useState } from "react";
import {FaBars, FaSignInAlt, FaSignOutAlt, FaTimes, FaUser} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {RootState, AppDispatch } from "../../app/store";
import { reset, logout } from "../../features/auth/authSlice";
import MenuButton from "./Buttons/MenuButton";

const Header = () => {

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {user} = useSelector((state : RootState) => state.auth);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 550);
    if (window.innerWidth >= 550) setMenuOpen(false);
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return(
    <header className='flex justify-between items-center border-b border-b-solid border-b-[#e6e6e6] mb-[60px] px-[20px]'>
      <div className='logo'>
        <h1><Link to='/'>GoalSetter</Link></h1>
      </div>
      
      {/* Desktop menu */}

      {!isMobile && (
        <ul className="flex gap-5 items-center">
             { user ? (
                  <li className='ml-[20px]'>
                  <button className="flex items-center hover:text-[#777] cursor-pointer" onClick={onLogout}>
                    <FaSignOutAlt className='mr-[5px]'/> Log Out
                  </button>
                  </li>
                ) : (
                  <>
                    <li className='ml-[20px]'>
                      <Link className="flex items-center hover:text-[#777]" to="/login">
                        <FaSignInAlt className='mr-[5px]'/> Login
                      </Link>
                    </li>
                    <li className='ml-[20px]'>
                      <Link className="flex items-center hover:text-[#777]" to="/register">
                        <FaUser className='mr-[5px]'/> Register
                      </Link>
                    </li>
                  </>
                )
              }
        </ul>
      )}

      {/* Mobile menu button */}

      {isMobile && !menuOpen && (
        <MenuButton onClick={toggleMenu}>
          <FaBars/>
        </MenuButton>
      )}

      {/* Mobile menu dropdown */}

      {isMobile && menuOpen && (
        <div className="p-[20px] bg-[white] absolute top-[0] left-[0] h-[100%] w-[100%] z-[9999]">
          <div className="flex justify-end mb-[50px]">
            <MenuButton onClick={toggleMenu}>
              <FaTimes/>
            </MenuButton>
          </div>
          <ul className="flex flex-col items-center gap-[5px]">
              { user ? (
                  <li className='ml-[20px]'>
                    <button className="flex items-center cursor-pointer" onClick={onLogout}>
                      <FaSignOutAlt className='mr-[5px]'/> Log Out
                    </button>
                  </li>
                ) : (
                  <>
                    <li className="p-4">
                      <Link className="flex items-center" to="/login">
                        <FaSignInAlt className='mr-[5px]'/> Login
                      </Link>
                    </li>
                    <li className="p-4">
                      <Link className="flex items-center" to="/register">
                        <FaUser className='mr-[5px]'/> Register
                      </Link>
                    </li>
                  </>
                )
              }
          </ul>
        </div>
      )}
    </header>
  )
};

export default Header;