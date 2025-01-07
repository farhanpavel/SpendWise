import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import "../../styles/Home.css";

export default function Footer() {
  return (
    <div>
      <footer>
        <div className="footer-container">
          <div className="footer-logo-section">
            <div>
              <Image
                src={"/images/Logo.png"}
                width={50}
                height={30}
                alt="Logo"
              />
            </div>
            <div>
              <h1>+016168121212</h1>
              <h1>farhanpavel3@gmail.com</h1>
            </div>
          </div>

          <div className="footer-nav">
            <h1>Main Navigation</h1>
            <ul>
              <li>
                <Link href="">Home</Link>
              </li>
              <li>
                <Link href="">Profile</Link>
              </li>
              <li>
                <Link href="">Dashboard</Link>
              </li>
            </ul>
          </div>

          <div className="footer-info">
            <h1>Information</h1>
            <ul>
              <li>
                <Link href="">Spend</Link>
              </li>
              <li>
                <Link href="">Track</Link>
              </li>
              <li>
                <Link href="">Alert</Link>
              </li>
            </ul>
          </div>

          <div className="footer-links">
            <h1>Quick Links</h1>
            <ul>
              <li>
                <Link href="">Login</Link>
              </li>
              <li>
                <Link href="">Reset Password</Link>
              </li>
              <li>
                <Link href="">FAQ</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-social">
          <ul>
            <li>
              <Link href="">
                <FaFacebook />
              </Link>
            </li>
            <li>
              <Link href="">
                <FiInstagram />
              </Link>
            </li>
            <li>
              <Link href="">
                <FaTwitter />
              </Link>
            </li>
            <li>
              <Link href="">
                <FaYoutube />
              </Link>
            </li>
            <li>
              <Link href="">
                <FaLinkedin />
              </Link>
            </li>
          </ul>
        </div>
      </footer>

      <div className="bottom-footer">
        <div>
          <h1>Copyright © 2025 | SpendWise, All rights reserved.</h1>
        </div>
        <div>
          <ul>
            <li>
              <Link href="">Terms & Conditions</Link>
            </li>
            <li>
              <Link href="">Privacy Policy</Link>
            </li>
            <li>
              <Link href="">Cookie Policy</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
