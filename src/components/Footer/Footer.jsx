import { Linkedin, Twitter, GitHub } from "react-feather";

const Footer = () => {
  return (
    <div className=" w-full  bg-blue-300 ">
      <footer className="p-4 text-center flex justify-evenly ">
        <div>
          <p className="font-thin font-sans w-max text-center">
            © Samir Khanal. All Rights Reserved
          </p>
        </div>
        <div className="flex gap-3">
          <span className="font-thin font-sans w-max text-center">
            Contact:
          </span>
          <a
            href="https://www.linkedin.com/in/samir-khanal-713b68281/"
            target="_blank"
          >
            <Linkedin className="text-blue-600" />
          </a>
          <a href="https://github.com/Samir-codes-123" target="_blank">
            <GitHub />
          </a>
          <a href="https://x.com/SamirKh56782671" target="_blank">
            <Twitter className="text-blue-600" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
