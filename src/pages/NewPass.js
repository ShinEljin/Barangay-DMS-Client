import { Link } from "react-router-dom";

function NewPass() {
  return (
    <div className="bg-main-bg bg-cover h-screen flex justify-end h-desktop">
      <div className="flex justify-between absolute w-full font-montserrat tracking-wide z-10 p-8">
        <div className="flex items-center font-semibold">
          <img
            className="h-20 | md:h-24"
            src="./images/Barangay_Seal.png"
            alt="Barangay_Seal"
          />
          <span className="invisible md:visible font-montserrat ml-3 text-xl">
            BARANGAY <br />
            MANAGEMENT <br />
            SYSTEM
          </span>
        </div>
        <img
          className="h-20 | md:h-24"
          src="./images/Manila_Seal.png"
          alt="Manila_Seal"
        />
      </div>

      <div className="bg-main-low-opacity flex flex-col w-full h-desktop | md:justify-center md:w-[32rem] md:rounded-l-3xl">
        <div className="flex flex-col relative top-48 | md:top-0">
          <span className="font-montserrat mx-auto text-3xl font-semibold mb-5 text-center">
            CREATE NEW PASSWORD
          </span>
          <div className="mx-auto w-3/5 text-center mb-9">
            <p className="font-light">
              Your new password must be different from previos used passwords
            </p>
          </div>
          <form action="" className="w-4/5 mx-auto">
            <div className="w-full font-extralight font-poppins">
              <label htmlFor="password">Password</label>
              <br />
              <input
                className="w-full h-11 rounded-lg border-0 p-3 mb-2 text-black font-light"
                type="password"
              />
              <br />
              <label htmlFor="password">Confirm Password</label>
              <br />
              <input
                className="w-full h-11 rounded-lg border-0 p-3 mb-2 text-black font-light"
                type="password"
              />
              <br />
            </div>
            <div className="flex justify-start pb-20">
              <p className="font-extralight text-red-500">
                <a href="#!">Both passwords must match</a>
              </p>
            </div>

            <button
              type="submit"
              className="rounded-xl border-0 block h-10 w-52 bg-main-red text-white text-2xl mx-auto font-semibold font-poppins hover:bg-white hover:text-main-red"
            >
              <Link to="/">Reset</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewPass;
