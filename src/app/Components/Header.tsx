import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
// @ts-ignore
import logo from "../assets/logo_black.png";
import "./header.scss";
import React from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/useCart";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Shop", href: "/products" },
  { name: "Policies", href: "/policies" },
  { name: "Support", href: "/support" },
  { name: "Blog", href: "/blog" },
];

function classNames(...classes: Array<string | boolean | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const { totalItems } = useCart();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <nav className="relative bg-indigo-500 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10 border rounded-3xl m-4">
      <div className="w-full px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-start">
            <div className="flex shrink-0 items-center">
              <img
                src={logo}
                alt="PharmaWarehouse logo"
                className="h-17 w-17 object-contain"
              />
              <h3 className="text-white font-bold">PharmaWarehouse</h3>
            </div>
          </div>

          <div className="hidden sm:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    "rounded-md px-3 py-2 text-sm font-medium text-white",
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="ml-auto flex items-center pr-2 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full p-1 text-white focus:outline-2 focus:outline-offset-2 focus:outline-white"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
            </button>

            <div className="ml-3 flex items-center gap-4">
              <Link to="/checkout" className="relative text-white">
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full w-5 h-5 flex items-center justify-center ">
                    {totalItems}
                  </span>
                )}
              </Link>

              {isLoggedIn ? (
                <Link
                  to="/login"
                  className="text-indigo-500 bg-gray-100 rounded-2xl px-3 py-1 flex items-center gap-2"
                >
                  Profile <AiOutlineUser />
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-indigo-500 bg-gray-100 rounded-2xl px-3 py-1 flex items-center gap-2"
                  >
                    Log in <AiOutlineUser />
                  </Link>
                  <Link
                    to="/register"
                    className="bg-white text-indigo-500 rounded-2xl px-3 py-1"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
