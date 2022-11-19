import { Link } from "react-router-dom";

function LoggedIn() {
  return (
    <div class="bg-main-bg bg-cover h-screen flex justify-end h-desktop">
      <div class="flex justify-between absolute w-full font-montserrat tracking-wide z-10 p-8">
        <div class="flex items-center font-semibold">
          <img
            class="h-20 | md:h-24"
            src="./images/Barangay_Seal.png"
            alt="Barangay_Seal"
          />
          <span class="invisible md:visible font-montserrat ml-3 text-xl">
            BARANGAY <br />
            MANAGEMENT <br />
            SYSTEM
          </span>
        </div>
        <img
          class="h-20 | md:h-24"
          src="./images/Manila_Seal.png"
          alt="Manila_Seal"
        />
      </div>

      <div class="bg-main-low-opacity flex flex-col w-full h-desktop | md:justify-center md:w-[32rem] md:rounded-l-3xl">
        <div class="flex flex-col relative top-60 | md:top-0">
          <span class="font-montserrat mx-auto text-5xl font-semibold mb-5 text-center">
            Logged in as
          </span>
          <p class="mx-auto font-light">email@gmail.com</p>
          <p class="mx-auto font-light text-main-red underline">
            <Link to="/">logout</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoggedIn;
