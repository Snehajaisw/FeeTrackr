import React from "react";
import "@fontsource/poppins"; 
import { motion } from "framer-motion";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  School as SchoolIcon,
  Paid as PaidIcon,
  BarChart as BarChartIcon,
  AccountBox as AccountBoxIcon,
  Dashboard as DashboardIcon,
  PersonAdd as PersonAddIcon,
  CurrencyRupee as CurrencyRupeeIcon,
  ExpandMore as ExpandMoreIcon,
  AccountBox,
  Dashboard,
  PersonAdd,
  CurrencyRupee,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "@fontsource/poppins";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ fontFamily: "Poppins, sans-serif" }}>
     
<Box
  sx={{
    py: 20,
    px: 2,
    textAlign: "center",
    background: "linear-gradient(to right, #E3F2FD, #FFFFFF)",
    borderRadius: 4,
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  }}
>
  {/* 🌀 Heading with Slide-In Animation */}
  <motion.div
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    <Typography variant="h2" sx={{ fontWeight: "bold", color: "#1976d2" }}>
      Run Your Tuition Like a Pro with FeeTrackr
    </Typography>
  </motion.div>

  {/* 🪄 Subtext with Delay & Lift */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3, duration: 1 }}
>
  <Typography
    variant="h6"
    sx={{
      mt: 2,
      mb: 4,
      color: "#455A64",
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 400,
      fontSize: "1.15rem",
      letterSpacing: "0.5px",
      lineHeight: 1.6,
    }}
  >
    From student records to payments, manage everything in one clean dashboard
  </Typography>
</motion.div>


  {/* 🚀 Button with Hover Scale Effect */}
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
    <Button
      variant="contained"
      sx={{
        borderRadius: "30px",
        px: 4,
        py: 1.5,
        fontWeight: "bold",
        backgroundColor: "#1976d2",
        color: "#fff",
        boxShadow: "0 6px 12px rgba(25,118,210,0.3)",
        "&:hover": {
          backgroundColor: "#1565c0",
        },
      }}
      onClick={() => navigate("/login")}
    >
      Get Started
    </Button>
  </motion.div>
</Box>
 {/* 📦 Features Section */}
<Box sx={{ py: 8, mt: 5 }}>
  <Typography variant="h4" align="center" sx={{ fontWeight: "bold", mb: 6 }}>
    Features That Make Teaching Effortless
  </Typography>

  <Grid container spacing={4} justifyContent="center">
    {[
      {
        icon: <SchoolIcon fontSize="large" sx={{ color: "#1976d2" ,fontFamily: "'Poppins', sans-serif"}} />,
        title: "Smart Payment Tracking",
        desc: "Easily monitor who has paid, who hasn’t, all in real-time.",
      },
      {
        icon: <PaidIcon fontSize="large" sx={{ color: "#1976d2" , fontFamily: "'Poppins', sans-serif",}} />,
        title: "Track Fees",
        desc: "Monitor monthly payments, reduce missed collections.",
      },
      {
        icon: <BarChartIcon fontSize="large" sx={{ color: "#1976d2", fontFamily: "'Poppins', sans-serif", }} />,
        title: "Centralized Student Records",
        desc: "Maintain organized profiles with student details and payment history—all in one place.",
      },
      {
        icon: <CloudUploadIcon fontSize="large" sx={{ color: "#1976d2", fontFamily: "'Poppins', sans-serif", }} />,
        title: "Secure & Cloud-Based Access",
        desc: "Access your tuition data anytime, anywhere — securely stored and backed up in the cloud.",
      },
    ].map((feature, index) => (
      <Grid item xs={12} sm={6} md={6} key={index}>
        <Card
          sx={{
            p: 4,
            height: "60%",
            maxWidth: 400,
            mx: "auto",
            textAlign: "center",
            border: "2px solid transparent",
            borderRadius: 4,
            transition: "all 0.3s ease",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            "&:hover": {
              borderColor: "#1976d2",
              boxShadow: "0 0 25px rgba(25,118,210,0.3)",
              transform: "translateY(-6px)",
            },
          }}
        >
          <Box sx={{ mb: 2 }}>{feature.icon}</Box>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              {feature.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#555",
                overflowWrap: "break-word",
                textAlign: "center",
              }}
            >
              {feature.desc}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
</Box>
      <Box sx={{ py: 8, mt: 5 }}>
  <Typography variant="h4" align="center" sx={{ fontWeight: "bold", mb: 6 }}>
    How It Works
  </Typography>

  <Grid container spacing={4} justifyContent="center">
    {[
      {
        icon: <AccountBoxIcon fontSize="large" sx={{ color: "#1976d2" }} />,
        title: "Create Account",
        desc: "Sign up for new user in seconds",
      },
      {
        icon: <DashboardIcon fontSize="large" sx={{ color: "#1976d2" }} />,
        title: "Access Dashboard",
        desc: "View all students at a glance.",
      },
      {
        icon: <PersonAddIcon fontSize="large" sx={{ color: "#1976d2" }} />,
        title: "Manage Students",
        desc: "Add and remove student records.",
      },
      {
        icon: <CurrencyRupeeIcon fontSize="large" sx={{ color: "#1976d2" }} />,
        title: "Track Fees",
        desc: "Monitor payments at a glance.",
      },
    ].map((step, i) => (
      <Grid item xs={12} sm={6} md={3} key={i}>
        <Card
          sx={{
            width: 200,
            height: 180,
            mx: "auto",
            textAlign: "center",
            p: 3,
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            transition: "transform 0.3s ease",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            "&:hover": {
              transform: "translateY(-6px)",
              boxShadow: "0 0 20px rgba(25, 118, 210, 0.3)",
            },
          }}
        >
          <Box sx={{ mt: 1 }}>{step.icon}</Box>
          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
            {step.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "#555" }}>
            {step.desc}
          </Typography>
        </Card>
      </Grid>
    ))}
  </Grid>
</Box>

      {/* ❓ FAQ Section */}
<Box sx={{ py: 10, mt: 5, px: { xs: 2, md: 6 } }}>
  <Typography
    variant="h4"
    align="center"
    sx={{ fontWeight: "bold", mb: 6, fontFamily: "Poppins, sans-serif", color: "#0D47A1" }}
  >
    Frequently Asked Questions
  </Typography>

  {[
    {
      question: " Is FeeTrackr free to use?",
      answer: "Yes, FeeTrackr is completely free for individual tutors and small coaching centers.",
    },
    {
      question: "Can I generate or export fee reports?",
      answer: "Coming soon! We're working on a feature that lets you export reports in Excel or PDF.",
    },
    {
      question: " How do I log in securely?",
      answer: "Use the username and password you created during sign-up. Make sure it's unique and secure.",
    },
    {
      question: " Can students see their own fee records?",
      answer: "Coming soon! We're working on this feature",
    },
    {
      question: " Do I need technical knowledge to use this?",
      answer: "Not at all. FeeTrackr is designed to be simple and user-friendly for everyone.",
    },
  ].map((faq, index) => (
    <Accordion key={index} sx={{ mb: 2, borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ fontWeight: 600, fontFamily: "Poppins, sans-serif", color: "#333" }}>
          {faq.question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography sx={{ fontFamily: "Poppins, sans-serif", color: "#555" }}>
          {faq.answer}
        </Typography>
      </AccordionDetails>
    </Accordion>
  ))}
</Box>

      {/* 🪞 Footer Section */}
      <Box sx={{ py:2, mt:20, bgcolor: "#f5f5f5", textAlign: "center" }}>
        <Typography variant="body2">© {new Date().getFullYear()} FeeTrackr</Typography>
        <Typography variant="caption">Built with 💙 by Sneha</Typography>
      </Box>
    </Container>
  );
}

export default LandingPage;