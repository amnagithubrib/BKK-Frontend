// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../AuthContext';
// import { Typography, Container, Box, Button } from '@mui/material';
// import './LoginSignupPage.css';
// import crop from '../../assets/img/crop.jpg';
// import logo from '../../assets/img/logo.webp';
// import Input from '../../components/input';

// const LoginSignupPage = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
//   const [signupInfo, setSignupInfo] = useState({ name: '', email: '', password: '', address: '' });
//   const navigate = useNavigate();
//   const { setAuthToken } = useAuth();

//   const switchToSignup = () => {
//     setIsLogin(false);
//   };

//   const switchToLogin = () => {
//     setIsLogin(true);
//   };

//   const handleLoginChange = (e) => {
//     const { name, value } = e.target;
//     setLoginInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
//   };

//   const handleSignupChange = (e) => {
//     const { name, value } = e.target;
//     setSignupInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3001/loginpartners', loginInfo);
//       console.log('Login successful:', response.data);

//       if (response.data && response.data.token && response.data.partner) {
//         localStorage.setItem('token', response.data.token);
//         localStorage.setItem('partner', JSON.stringify(response.data.partner));
//         setAuthToken(response.data.token);
//         if (response.data.partner.role !== "admin") {
//           navigate("/dashboard");
//         } else if (response.data.partner.role === "admin") {
//           navigate("/create-partners");
//         }
//       } else {
//         console.error('Invalid login response:', response.data);
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//     } finally {
//       setLoginInfo({ email: '', password: '' });
//     }
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3001/registerPartners', signupInfo);
//       console.log('Signup successful:', response.data);
//       navigate("/"); 
//     } catch (error) {
//       console.error('Error during signup:', error);
//     } finally {
//       setSignupInfo({ name: '', email: '', password: '', address: '' });
//     }
//   };

//   return (
//     <div className="background-container" style={{ backgroundImage: `url(${crop})` }}>
//       <Container maxWidth="md">
//         <div className="m">
//           <Box display="flex" flexDirection="column" alignItems="center" mt={4} mb={4}>
//             <div className='logo-container'>
//               <img src={logo} alt="Logo" style={{ width: '20vh', marginBottom: '16px', paddingLeft: '2rem' }} />
//             </div>
//             <div className="form">
//               {isLogin ? (
//                 <>
//                   <Typography variant="h5" gutterBottom>Login</Typography>
//                   <form onSubmit={handleLogin}>
//                     <Input
//                       type="text"
//                       name="email"
//                       placeholder="Email"
//                       value={loginInfo.email}
//                       onChange={handleLoginChange}
//                     />
//                     <Input
//                       type="password"
//                       name="password"
//                       placeholder="Password"
//                       value={loginInfo.password}
//                       onChange={handleLoginChange}
//                     />
//                     <Button
//                       type="submit"
//                       variant="contained"
//                       fullWidth
//                       sx={{
//                         backgroundColor: '#fcb900',
//                         color: 'black',
//                         '&:hover': {
//                           backgroundColor: '#fcb900',
//                         },
//                       }}
//                     >
//                       <b>Login</b>
//                     </Button>
//                   </form>
//                   <Typography variant="body2" onClick={switchToSignup} className="switch-link">
//                     Don't have an account? Sign up
//                   </Typography>
//                 </>
//               ) : (
//                 <>
//                   <Typography variant="h5" gutterBottom>Signup</Typography>
//                   <form onSubmit={handleSignup}>
//                     <Input
//                       type="text"
//                       name="name"
//                       placeholder="Name"
//                       value={signupInfo.name}
//                       onChange={handleSignupChange}
//                     />
//                     <Input
//                       type="text"
//                       name="email"
//                       placeholder="Email"
//                       value={signupInfo.email}
//                       onChange={handleSignupChange}
//                     />
//                     <Input
//                       type="password"
//                       name="password"
//                       placeholder="Password"
//                       value={signupInfo.password}
//                       onChange={handleSignupChange}
//                     />
//                     <Input
//                       type="text"
//                       name="address"
//                       placeholder="Address"
//                       value={signupInfo.address}
//                       onChange={handleSignupChange}
//                     />
//                     <Button
//                       type="submit"
//                       variant="contained"
//                       fullWidth
//                       sx={{
//                         backgroundColor: '#fcb900',
//                         color: 'black',
//                         '&:hover': {
//                           backgroundColor: '#fcb900',
//                         },
//                       }}
//                     >
//                       <b>Signup</b>
//                     </Button>
//                   </form>
//                   <Typography variant="body2" onClick={switchToLogin} className="switch-link">
//                     Already have an account? Login
//                   </Typography>
//                 </>
//               )}
//             </div>
//           </Box>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default LoginSignupPage;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { Typography, Container, Box, Button } from '@mui/material';
import './LoginSignupPage.css';
import crop from '../../assets/img/crop.jpg';
import logo from '../../assets/img/logo.webp';
import Input from '../../components/input';

const LoginSignupPage = () => {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { setAuthToken } = useAuth();

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://192.168.12.144:3001/loginpartners', loginInfo);
      console.log('Login successful:', response.data);

      if (response.data && response.data.token && response.data.partner) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('partner', JSON.stringify(response.data.partner));
        setAuthToken(response.data.token);
        if (response.data.partner.role !== "admin") {
          navigate("/dashboard");
        } else if (response.data.partner.role === "admin") {
          navigate("/create-partners");
        }
      } else {
        console.error('Invalid login response:', response.data);
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setLoginInfo({ email: '', password: '' });
    }
  };

  return (
    <div className="background-container" style={{ backgroundImage: `url(${crop})` }}>
      <Container maxWidth="md">
        <div className="m">
          <Box display="flex" flexDirection="column" alignItems="center" mt={4} mb={4}>
            <div className='logo-container'>
              <img src={logo} alt="Logo" style={{ width: '20vh', marginBottom: '16px', paddingLeft: '2rem' }} />
            </div>
            <div className="form">
              <Typography variant="h5" gutterBottom>Login</Typography>
              <form onSubmit={handleLogin}>
                <Input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={loginInfo.email}
                  onChange={handleLoginChange}
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginInfo.password}
                  onChange={handleLoginChange}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: '#fcb900',
                    color: 'black',
                    '&:hover': {
                      backgroundColor: '#fcb900',
                    },
                  }}
                >
                  <b>Login</b>
                </Button>
              </form>
              <Typography variant="body2" className="switch-link">
                {/* Remove signup related text */}
              </Typography>
            </div>
          </Box>
        </div>
      </Container>
    </div>
  );
};

export default LoginSignupPage;
