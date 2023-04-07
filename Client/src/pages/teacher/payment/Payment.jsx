import { React, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Divider,
} from "@mui/material";
import GooglePayButton from "@google-pay/button-react";
import { plans } from "../../../common/Data";
import { SnackbarDisplay } from "../../../components";

const Payment = () => {
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({ title: "", price: 0 });
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: "",
    type: "success",
    vertical: "top",
    horizontal: "right",
  });

  const paymentRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: "CARD",
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["MASTERCARD", "VISA"],
        },
        tokenizationSpecification: {
          type: "PAYMENT_GATEWAY",
          parameters: {
            gateway: "example",
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: "12345678901234567890",
      merchantName: "Demo Merchant",
    },
    transactionInfo: {
      totalPriceStatus: "FINAL",
      totalPriceLabel: "Total",
      totalPrice: selectedPlan.price.toString(),
      currencyCode: "INR",
      countryCode: "IN",
    },
    shippingAddressRequired: false,
    callbackIntents: ["PAYMENT_AUTHORIZATION"],
  };

  const handleClickOpen = (title, price) => {
    setSelectedPlan({ title, price });
    setOpen(true);
  };

  const handleClose = () => {
    setSnackbarData({
      ...snackbarData,
      open: true,
      message: "payment Aborted",
      type: "error",
    });
    setOpen(false);
  };

  const handlePayment = (paymentData) => {
    console.log(paymentData);
    setSnackbarData({
      ...snackbarData,
      open: true,
      message: "payment Successfull",
      type: "success",
    });
    setOpen(false);
  };

  const displayPlans = (plan) => {
    return (
      <>
        <Box key={plan.title} sx={{ gap: 3, minWidth: "45%" }}>
          <h2>{plan.title}</h2>
          <p style={{ textAlign: "justify", textJustify: "inter-word" }}>
            {plan.description}
          </p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>Total Price: ₹{plan.price}</p>
            <p>Quiz tokens: {plan.points}</p>
            <Button
              variant="contained"
              onClick={() => handleClickOpen(plan.title, plan.price)}
            >
              Buy Now
            </Button>
          </div>
        </Box>
        <Divider sx={{ margin: "10px 0" }} />
        {plan.addOns &&
          plan.addOns.map((addon) => {
            return (
              <Box key={addon.title} sx={{ gap: 3, minWidth: "45%" }}>
                <h2>{addon.title}</h2>
                <p style={{ textAlign: "justify", textJustify: "inter-word" }}>
                  {addon.description}
                </p>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>Total Price: ₹{addon.price}</p>
                  <Button
                    variant="contained"
                    onClick={() => handleClickOpen(addon.title, addon.price)}
                  >
                    Buy Now
                  </Button>
                </div>
              </Box>
            );
          })}
      </>
    );
  };

  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between">
      <Box>
        {plans.map((plan) => (
          <Box key={plan.price}>{displayPlans(plan)}</Box>
        ))}
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Subscription</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to subscribe to {selectedPlan.title} your
            total price is {selectedPlan.price}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <GooglePayButton
            environment="TEST"
            paymentRequest={paymentRequest}
            buttonType="plain"
            onLoadPaymentData={(paymentReq) => {
              console.log("load payment data", paymentReq);
            }}
            onPaymentAuthorized={(paymentData) => {
              handlePayment(paymentData);
              return {
                transactionState: "SUCCESS",
              };
            }}
          />
          {/* <Button onClick={handlePayment}>Subscribe</Button> */}
        </DialogActions>
      </Dialog>
      <SnackbarDisplay
        snackbarData={snackbarData}
        setSnackbarData={setSnackbarData}
      />
    </Box>
  );
};

export default Payment;
