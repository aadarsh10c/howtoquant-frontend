import { useState } from 'react';

import NavSection from './NavSection';

import '../../assets/css/NavPane.css';

export default function NavPane(props) {
  const { categories } = props;

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let content = (
    <>
      {categories.map((item, index) => {
        return <NavSection key={index} section={item} />;
      })}
    </>
  );

  if (isLoading) {
    content = <Loading />;
  }

  if (error !== null) {
    content = <Error errorCode={error.response.status} />;
  }

  return (
    <aside className='d-flex flex-column align-items-stretch green-bckgr p-1'>
      {content}
    </aside>
  );
}
