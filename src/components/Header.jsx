import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { BiMenu } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { RiMenu3Line } from "react-icons/ri";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { title: "Home", path: "/" },
    { title: "Create Post", path: "/create" },
    { title: "My Posts", path: "/my-posts" },
    { title: "About us", path: "/about" },
  ];

  const isCurrentPath = (path) => location.pathname === path;

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = (
    <div className="h-full bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">PostMuse</h2>
        <IconButton onClick={toggleDrawer(false)} className="text-white">
          <IoMdClose size={24} />
        </IconButton>
      </div>
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.title}
            component={Link}
            to={item.path}
            onClick={toggleDrawer(false)}
            selected={isCurrentPath(item.path)}
            className={`mb-2 rounded-lg transition-colors ${
              isCurrentPath(item.path)
                ? "bg-purple-600 text-white"
                : "hover:bg-gray-800"
            }`}
          >
            <ListItemText
              primary={item.title}
              className="py-2"
              primaryTypographyProps={{
                className: "text-lg font-medium",
              }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <header className="fixed h-[12vh] w-full mx-auto px-4 md:px-8 bg-gray-900 py-6 flex justify-between items-center z-40 top-0">
      <motion.h1
        className="text-3xl font-bold text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        PostMuse
      </motion.h1>
      <nav className="hidden md:block">
        <motion.ul
          className="flex space-x-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {navItems.map((item) => (
            <li key={item.title}>
              <Link
                to={item.path}
                className={`transition ${
                  isCurrentPath(item.path)
                    ? "text-white"
                    : "text-gray-300 hover:text-purple-400"
                }`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </motion.ul>
      </nav>
      <div className="md:hidden">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <RiMenu3Line className="text-white" size={24} />
        </IconButton>
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          PaperProps={{
            style: {
              width: "70%", // Adjust as needed
              maxWidth: "300px", // Maximum width
              backgroundColor: "transparent",
            },
          }}
        >
          {drawerList}
        </Drawer>
      </div>
    </header>
  );
};

export default Header;