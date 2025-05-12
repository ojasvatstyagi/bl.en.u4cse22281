import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  CssBaseline,
  Container,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Navbar from "./components/Navbar";
import StockSelectionPage from "./pages/StockSelectionPage";
import StockAnalysisPage from "./pages/StockAnalysisPage";
import CorrelationPage from "./pages/CorrelationPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8D6E63",
    },
    secondary: {
      main: "#689F38",
    },
    background: {
      default: "#FAF9F6",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#4E342E",
      secondary: "#757575",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/" element={<StockSelectionPage />} />
            <Route path="/stock/:ticker" element={<StockAnalysisPage />} />
            <Route path="/correlation" element={<CorrelationPage />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
