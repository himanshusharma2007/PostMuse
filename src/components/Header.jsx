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
    <List>
      {navItems.map((item) => (
        <ListItem
          button
          key={item.title}
          component={Link}
          to={item.path}
          onClick={toggleDrawer(false)}
          selected={isCurrentPath(item.path)}
        >
          <ListItemText primary={item.title} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <header className="fixed h-[12vh] w-full mx-auto px-8 bg-gray-900 py-6 flex justify-between items-center z-40">
      <motion.h1
        className="text-3xl font-bold"
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
                    ? " border-b-2  border-b-purple-600"
                    : "hover:text-purple-400"
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
          <BiMenu />
        </IconButton>
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          {drawerList}
        </Drawer>
      </div>
    </header>
  );
};

export default Header;
