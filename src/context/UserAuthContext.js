import { useContext, createContext, useEffect, useState } from "react";
import { AuthErrorCodes, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword,signOut } from 'firebase/auth';
import { auth, db } from "../firebase.config";
import { doc, setDoc,getDoc } from "firebase/firestore";

const userContext = createContext();
export const useAuth = () => { return useContext(userContext) }

const UserAuthContext = ({ children }) => {
  const [error, setError] = useState("");
  const [currentuser, setCurrentUser] = useState(null);
  const [userName, setUsername]=useState("");
  const [userDataFetched, setUserDataFetched] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setCurrentUser(user);
      }
    });
        return () => unsubscribe();
  }, []);

  const SignIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        handleError(error.code);
    }
};

const handleError = (errorCode) => {
  switch (errorCode) {
      case AuthErrorCodes.INVALID_EMAIL:
          setError('Invalid email address');
          break;
      case AuthErrorCodes.WRONG_PASSWORD:
          setError('Invalid password');
          break;
      case AuthErrorCodes.USER_NOT_FOUND:
          setError('User not found');
          break;
      default:
          setError('An error occurred');
          break;
  }
};



  const SignUp = async (email, password, FullName) => {
    setError("");
    createUserWithEmailAndPassword(auth, email, password).then(
      async (result) => {
        try {
          const userData = {
            Name: FullName,
            Email: email
          }

          const ref = doc(db, "userinfo", result.user.uid)
          const docRef = await setDoc(ref, { userData })
          alert("Welcome new user created successfully")
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    ).catch(err => {
      if (err.code === "auth/email-already-in-use") {
        setError("Email already in use. Try another email.");
      } else if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
        setError("Password must be at least 6 characters long.");
      } else {
        setError(err.message);
      }
    });
  }


  const getUserData = async (userId) => {
    try {
      const docRef = doc(db, "userinfo", userId);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        // Document data exists, return it
        return docSnap.data().userData;
      } else {
        // Document doesn't exist
        console.log("No such document!");
        return null;
      }
    } catch (e) {
      console.error("Error getting document: ", e);
      return null;
    }
  };

const handleLogin = (user) => {
  if (user) {
    // User is logged in, set userId in localStorage
    localStorage.setItem('userId', user.uid);
  } else {
    // User is not logged in, clear userId from localStorage
    localStorage.removeItem('userId');
  }
};


handleLogin(currentuser);
  const getuserId = localStorage.getItem('userId');
  

  const getUserDataOnce = (userId) => {
    if (!userDataFetched) {
        getUserData(userId).then(userData => {
            if (userData) {
                setUsername(userData);
                localStorage.setItem('name', userData.Name);
                setUserDataFetched(true); // Set to true after fetching once
            } else {
                console.log("User data not found!");
            }
        });
    }
};

useEffect(() => {
  if (currentuser) {
      const userId = localStorage.getItem('userId');
      getUserDataOnce(userId);
  }
}, [currentuser]);



    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('userId');
            localStorage.removeItem('name');
            setUserDataFetched("");
        } catch (error) {
            console.error('Error signing out:', error.message);
        }
    };


  const value = {
    userName,
    handleLogout,
    SignIn,
    SignUp,
    error,
    currentuser
  };



  return (
    <userContext.Provider value={value}>
      {children}
    </userContext.Provider>
  );
}

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export default UserAuthContext;
