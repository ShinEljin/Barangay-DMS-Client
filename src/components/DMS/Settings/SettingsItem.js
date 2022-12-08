import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function SettingsItem({ itemOpen, setItemOpen, text }) {
  return (
    <div
      onClick={() => setItemOpen(!itemOpen)}
      className="bg-white flex flex-row justify-between items-center mx-5 px-4 mb-4 rounded-xl max-w-sm hover:bg-[#0D89C77f] hover:cursor-pointer"
    >
      <div className="text-left text-2xl font-bold py-4">{text}</div>
      <KeyboardArrowRightIcon fontSize="large" />
    </div>
  );
}

export default SettingsItem;
