import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Container, CssBaseline } from "@mui/material";

const FormLayout: React.FC = ({ children }) => {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {children}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default FormLayout;
