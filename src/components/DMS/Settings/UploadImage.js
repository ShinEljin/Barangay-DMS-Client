function UploadImage({
  signatureTitle,
  signatureRole,
  setSignatureRole,
  inputID,
}) {
  return (
    <div className="text-center mb-5">
      <div className="flex items-center justify-center flex-col">
        <div className="text-left font-bold px-5 pb-1">{signatureTitle}</div>
        <div className="relative w-[90%] h-[15rem]">
          <label
            htmlFor={inputID}
            className="hover:opacity-60 hover:cursor-pointer transition-all duration-300 relative group border flex w-[100%] h-[100%] items-center justify-center"
          >
            <img
              alt="Upload"
              className="w-3/5 mx-auto block"
              src={
                signatureRole
                  ? URL.createObjectURL(signatureRole)
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl7uBtezW2vkX89SVAORNkfbuZTaZQM_u2cg&usqp=CAU"
              }
            />

            <div className="absolute font-bold text-[2rem] opacity-0 group-hover:opacity-100  transition-all duration-200 underline">
              {signatureRole ? "Change File" : "Upload File"}
            </div>
          </label>
          <div
            className="absolute top-1 right-2 font-bold text-[1rem] transition-all duration-200 opacity-70 cursor-pointer"
            onClick={() => setSignatureRole(null)}
          >
            {signatureRole && "Remove"}
          </div>
        </div>

        <input
          id={inputID}
          type="file"
          name="myImage"
          className="hidden"
          onChange={(event) => {
            setSignatureRole(event.target.files[0]);
          }}
        />
      </div>
    </div>
  );
}

export default UploadImage;
