import { Link } from 'react-router-dom';
import classes from './header.module.css';

const Header = () => {
  console.log('Header component rendered'); // Add this to debug
  const user = { name: "Faiyaz" };
  const cart = { totalCount: 10 };

  const logout = () => {
    console.log("Logout clicked!");
  };
  const dashboard = () =>{
    return(
      <div>
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard</p>
      </div>
    )
  }

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        {/* <Link to="/" className={classes.logo}> */}
          My Medicine!
        {/* </Link> */}
        <nav>
          <ul>
            {user ? (
              <li className={classes.menu_container}>
                {/* <Link to="/profile">{user.name}</Link> */}
                {user.name}
                <div className={classes.menu}>
                  {/* <Link to="/profile">Profile</Link>
                  <Link to="/orders">Orders</Link> */}
                  <a onClick={logout}>Logout</a>
                  <Link to="/dashboard">Profile</Link>
                  <Link to="/register">Reg</Link>

                </div>
              </li>
            ) : (
              <li>
                {/* <Link to="/login">Login</Link> */}
              </li>
            )}
            <li>
              {/* <Link to="/cart"> */}
                Cart
                {cart.totalCount > 0 && <span>({cart.totalCount})</span>}
              {/* </Link> */}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
