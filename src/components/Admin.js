import { Link } from 'react-router-dom';
import Users from './Users';
import Header from './Header/Header';

const Admin = () => {
  return (
    <section>
      <Header />
      <Users />
      <br />
      <div className='flexGrow'>
        <Link to='/'>Home</Link>
      </div>
    </section>
  );
};

export default Admin;
