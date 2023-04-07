import { React, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Payment = () => {
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleClickOpen = (plan) => {
    setSelectedPlan(plan);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddToCart = () => {
    // Logic for adding selectedPlan to cart
  };

  const handlePayment = () => {
    // Logic for initiating payment with selectedPlan
    // ...
    setOpen(false);
  };

  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between">
      <Box>
        <h2>Plan 1</h2>
        <p>Description of Plan 1</p>
        <Button variant="contained" onClick={() => handleClickOpen("Plan 1")}>
          Add to Cart
        </Button>
      </Box>
      <Box>
        <h2>Plan 2</h2>
        <p>Description of Plan 2</p>
        <Button variant="contained" onClick={() => handleClickOpen("Plan 2")}>
          Add to Cart
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Subscription</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to subscribe to {selectedPlan}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlePayment}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Payment;
