//หน้าแรกแสดง movie แบบองค์รวม
import React from "react";
import Grid from "@mui/material/Grid";
import Item from "../components/Item";
import Container from "@mui/material/Container";

function Home({ data, handleAddToCart }) {
  return (
    <Container fixed className="mb-10">
      <h1 className="text-[4rem] text-[#e25450]">Movies</h1>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={11} sm={6} md={4} lg={3}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
