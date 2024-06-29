import { Box, Container, Typography, Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import PhoneIcon from "@mui/icons-material/Phone";
import { useState, useEffect } from "react";

const HomePage = () => {
  const text = "Welcome to our Contact Management Website!";
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayText((prevText) => prevText + text[index]);
        setIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <Box
      sx={{
        margin: "20px",
        bgcolor: "#3f50b5",
        color: "#fff",
        py: { xs: 4, sm: 6 },
        textAlign: "center",
        backgroundImage: "linear-gradient(to bottom, #3f50b5, #757de8)",
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: 2,
          }}
        >
          <Box sx={{ flexShrink: 0, mb: { xs: 2, sm: 0 } }}>
            <IconButton
              sx={{
                bgcolor: "#fff",
                p: 2,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  bgcolor: "#f44336",
                  color: "#fff",
                  boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <PhoneIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              component="h1"
              variant="h4"
              sx={{ fontWeight: 700, mb: 2 }}
            >
              {displayText.split("").map((char, index) => (
                <span
                  key={index}
                  style={{ color: index % 2 === 0 ? "#fff" : "#f44336" }}
                >
                  {char}
                </span>
              ))}
            </Typography>
            <Typography
              component="p"
              variant="body1"
              sx={{ color: "#fff", mb: 2 }}
            >
              Imagine having all your contacts in one place, accessible anytime,
              anywhere. With our app, you can create, edit, and delete contacts
              with ease. Our intuitive interface makes it simple to stay on top
              of your contact list.
            </Typography>
            <Button
              component={Link}
              to="/contacts"
              size="large"
              variant="contained"
              sx={{ mt: 2 }}
            >
              Get Started
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
