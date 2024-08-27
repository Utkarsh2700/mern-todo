"use client";
import { Box, Drawer, IconButton } from "@mui/material";
import React, { useState } from "react";
import EditTodo from "./EditTodo";

function BottomDrawer({ selectedTodo, onSaveTodo, onChangeNewTodo }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <div className="flex lg:hidden">
      <IconButton onClick={() => setIsDrawerOpen(true)}>
        <p className="bg-green-200 text-green-900 text-center font-semibold px-2 rounded-md fixed top-[20%] left-[50%]">
          Filter
        </p>
      </IconButton>
      <Drawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box
          mt={8}
          p={2}
          gap={3}
          width={"100%"}
          textAlign={"center"}
          role="presentation"
          sx={{ display: "flex", flexDirection: "column" }}
          className="w-[250px] sm:w-[450px] md:w-[550px]"
        >
          <h1>Sidebar</h1>
          {/* <Sidebar /> */}
          <EditTodo
            selectedTodo={selectedTodo}
            onSaveTodo={onSaveTodo}
            onChangeNewTodo={onChangeNewTodo}
          />
        </Box>
      </Drawer>
    </div>
  );
}

export default BottomDrawer;
