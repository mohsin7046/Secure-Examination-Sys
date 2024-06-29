import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';
import View from './View';

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');
  const [admin,setAdmin]= useState(false)
  

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/Api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        
      } else {
        navigate('/sign-in')
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(()=>{
    fetch('/Api/user/signin', {
      method: 'POST',
    })
  
    .then((res)=>res.json())
  .then((data)=>{
    console.log(data,userData);
    if(data.data.userType == "Admin" || data.data.userType == "Examiner"){
      setAdmin(true)
    }
  })
  })
  return (
    <Navbar className='flex justify-between items-center p-4 bg-white shadow-md md:px-8 '>
    <div className='flex items-center gap-4'>
      <Link to='/' className='text-xl font-bold'>
        SecureExam.com
      </Link>
      <div className='hidden md:flex gap-4'>
        <Link to='/' className={`hover:underline ${path === '/' && 'text-blue-600'}`}>
          Home
        </Link>
        {admin?<Link to='/view' className={`hover:underline ${path === '/view' && 'text-blue-600'}`}>
          View
        </Link>: <Link to='/upload' className={`hover:underline ${path === '/upload' && 'text-blue-600'}`}>
          Upload
        </Link>}
        
      </div>
    </div>

    <div className='flex items-center gap-4'>
      <Button
        className='w-12 h-10 hidden sm:flex items-center justify-center'
        color='gray'
        pill
        onClick={() => dispatch(toggleTheme())}
      >
        {theme === 'light' ? <FaSun /> : <FaMoon />}
      </Button>
      {currentUser ? (
        <Dropdown arrowIcon={false} inline label={<Avatar alt='user' img={currentUser.profilePicture} rounded />}>
          <Dropdown.Header>
            <span className='block text-sm'>@{currentUser.username}</span>
            <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
          </Dropdown.Header>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
        </Dropdown>
      ) : (
        <Link to='/sign-in'>
          <Button gradientDuoTone='purpleToBlue' outline className='text-black'>
            Sign In
          </Button>
        </Link>
      )}
      <Navbar.Toggle className='md:hidden' />
    </div>

    <Navbar.Collapse className='md:hidden'>
      <Navbar.Link active={path === '/'} as={'div'}>
        <Link to='/'>Home</Link>
      </Navbar.Link>
      <Navbar.Link active={path === '/upload'} as={'div'}>
        <Link to='/about'>Upload</Link>
      </Navbar.Link>
    </Navbar.Collapse>
  </Navbar>
  );
}
