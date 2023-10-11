//การจัดการหน้า /cart
import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

function Cart({
  cartItems,
  addToCart,
  removeFromCart,
  clearCart
}) {
  const [showPopup, setShowPopup] = useState(false); // สถานะแสดง/ซ่อน popup
  const [countdown, setCountdown] = useState(60); // ระยะเวลาการนับถอยหลัง 1 นาที (60 วินาที)
  const navigate = useNavigate();
  const calculateTotal = (items) =>
    items.reduce((acc, item) => acc + item.amount * item.vote_count, 0);

  // เพิ่มฟังก์ชัน calculateDiscount โดยรับ cartItems และคำนวณส่วนลดตามเงื่อนไข
  const calculateDiscount = (cartItems) => {
    const totalItems = cartItems.reduce((acc, item) => acc + item.amount, 0);

    if (totalItems > 5) {
      return 0.2; // ลด 20%
    } else if (totalItems > 3) {
      return 0.1; // ลด 10%
    } else {
      return 0; // ไม่มีส่วนลด
    }
  };

  const discount = calculateDiscount(cartItems); // คำนวณส่วนลด
  const total = calculateTotal(cartItems); // คำนวณราคารวม

  const discountedTotal = total * (1 - discount); // คำนวณราคารวมหลังจากหักส่วนลด

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="relative">
      <h1 className="text-center text-[2rem]">Your Cart</h1>
      {cartItems && cartItems.length === 0 ? (
        <p className="text-center text-[#e25450]">No items in cart.</p>
      ) : (
        cartItems.map((item) => (
          <div className="flex flex-col items-center w-full" key={item.id}>
            <div className="flex flex-col w-[50%]">
              <h3 className="text-[#e25450]">{item.original_title}</h3>
              <div className="information">
                <p>Price: {item.vote_count} THB</p>
              </div>
              <div className="flex flex-row justify-between">
                <p>Total: {(item.amount * item.vote_count).toFixed(2)} THB</p>
                <div className="flex flex-row">
                  <RemoveCircleOutlineIcon
                    onClick={() => removeFromCart(item.id)}
                  />
                  <p className="mx-5">{item.amount}</p>
                  <AddCircleOutlineIcon onClick={() => addToCart(item)} />
                </div>
              </div>
            </div>
            <hr className="w-[50%] text-[black] my-3" />
          </div>
        ))
      )}

      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col w-[50%]">
          {discount === 0 && (
            <h1 className="text-[1.5rem] text-[#2e7d32]">
              Total: {total.toFixed(2)} THB
            </h1>
          )}
          {discount > 0 && (
            <div>
              <p className="text-[1rem] text-[#f49f43]">
                Discount: {discount * 100}%
              </p>
              <h1 className="text-[1.5rem] text-[#2e7d32]">
                Discounted Total: {discountedTotal.toFixed(2)} THB
              </h1>
            </div>
          )}
          <div className="flex sm:flex-row flex-col justify-between my-5 sm:gap-0 gap-3">
            <div className="flex sm:flex-row flex-col gap-3">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#ff9b00",
                  "&:hover": {
                    backgroundColor: "#e98f04",
                  },
                }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button variant="contained" color="error" onClick={clearCart}>
                Clear cart
              </Button>
            </div>
            {cartItems.length > 0 ? ( // เงื่อนไขเช็คว่ามีสินค้าในตระกร้าหรือไม่
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#2e7d32",
                  "&:hover": {
                    backgroundColor: "#225f25",
                  },
                }}
                onClick={() => {
                  setShowPopup(true); // แสดง popup เมื่อคลิกที่ "Check Out"
                  // เริ่มนับถอยหลัง
                  const countdownInterval = setInterval(() => {
                    setCountdown((prevCountdown) => prevCountdown - 1);
                  }, 1000); // นับถอยหลังทุก 1 วินาที

                  // ตั้งค่าให้ popup ปิดอัตโนมัติหลังจาก 1 นาที
                  setTimeout(() => {
                    setShowPopup(false); // ปิด popup
                    clearInterval(countdownInterval); // หยุดการนับถอยหลังเมื่อ popup ปิด
                  }, 60000);
                }}
              >
                Check Out
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#2e7d32",
                  "&:hover": {
                    backgroundColor: "#225f25",
                  },
                }}
                onClick={() =>
                  alert("No items in cart. Please add items before check out.")
                }
              >
                Check Out
              </Button>
            )}

            {showPopup && (
              <Alert
                severity="warning"
                className="absolute top-10 drop-shadow-2xl w-[50%]"
              >
                กรุณาโอนเงินไปที่ XX ภายในระยะเวลา{" "}
                <span className="text-red-500">{countdown}</span> วินาที
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
