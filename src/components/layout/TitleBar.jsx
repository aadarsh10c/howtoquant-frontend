import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import logo from '../../assets/img/logo.png';

import '../../assets/css/TitleBar.css';

export default function TitleBar() {
  const { user } = useContext(UserContext);

  return (
    <header className='green-bckgr py-2'>
      <div className='decorative-strips py-1'>
        <div className=' green-bckgr  d-flex py-2 ps-2 pe-4 justify-content-between align-items-center'>
          <div className='ps-1 d-flex align-items-center '>
            <Link to='/'>
              <img className='logo py-2 px-4' src={logo} alt='logo'></img>{' '}
            </Link>
          </div>
          <div>
            <p className='small user-context'>User: {user.username}</p>
            <p className='small user-context'>Org: {user.organisation}</p>
            <p className='small user-context'>Version: {user.version}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
