import React, { useState, useEffect } from "react";
import HomeScreen from "./Components/HomeScreen";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import storage from "local-storage-fallback";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import SignUp from "./Components/AllSign/SignUp"
import SignIn from "./Components/AllSign/SignIn"
import OnboardingHome from "./Components/Onboarding/OnboardingHome";
import ScrolllBoarding from "./Components/Onboarding/ScrolllBoarding"

const GlobalStyled = createGlobalStyle`
body{
  background-color: ${({ theme }) =>
    theme.myTheme === "dark" ? "#212429" : "white"};
  color: ${({ theme }) => (theme.myTheme === "dark" ? "#edfafe" : "#091e42")};
}
`;

const App = () => {
  const storeThemeChoice = () => {
    const saveTheme = storage.getItem("toggle");
    return saveTheme ? JSON.parse(saveTheme) : { myTheme: "light" };
  };

  const [toggle, setToggle] = useState(storeThemeChoice);
  useEffect(() => {
    storage.setItem("toggle", JSON.stringify(toggle));
  }, [toggle]);

  return (
    <ThemeProvider theme={toggle}>
      <GlobalStyled />
      <Router>
        <Routes>
        <Route path="" element={  <HomeScreen
        bclr={() => {
          setToggle(
            toggle.myTheme === "dark" ? { myTheme: "y" } : { myTheme: "dark" }
          );
        }}
      />}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/onboard" element={<ScrolllBoarding/>}/>
        </Routes>
      </Router>
     
    </ThemeProvider>
  );
};

export default App;
