import HowToVoteIcon from "@mui/icons-material/HowToVote";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ElderlyIcon from "@mui/icons-material/Elderly";

function Dashboard(props) {
  return (
    <div className="bg-light-gray">
      <div className="dashboard grid m-5 gap-5 grid-cols-1 | md:ml-[90px] md:grid-cols-2 | xl:ml-[350px] xl:grid-cols-3">
        <div className="bg-white flex-col px-10 py-2 rounded-2xl">
          <div className="flex justify-between">
            <div>
              <PeopleAltIcon sx={{ fontSize: 80 }} />
            </div>
            <div className="self-center font-medium text-xl">Population</div>
          </div>
          <div>
            <div className="w-[50%] bg-[#033AA9] text-white p-2 rounded-r-2xl">
              Male : 45
            </div>
            <div className="w-[80%] bg-[#CF1429] text-white p-2 mt-1 rounded-r-2xl">
              Female : 400
            </div>
          </div>
        </div>

        <div className="bg-white flex-col px-10 py-2 rounded-2xl">
          <div className="flex justify-between">
            <div>
              <HowToVoteIcon sx={{ fontSize: 80 }} />
            </div>
            <div className="self-center font-medium text-xl">
              Voters vs Non-voters
            </div>
          </div>
          <div>
            <div className="w-[90%] bg-[#033AA9] text-white p-2 rounded-r-2xl">
              Voters: 45
            </div>
            <div className="w-[70%] bg-[#CF1429] text-white p-2 mt-1 rounded-r-2xl">
              Non-voters: 400
            </div>
          </div>
        </div>

        <div className="bg-white flex-col px-10 py-2 rounded-2xl">
          <div className="flex justify-between">
            <div>
              <ElderlyIcon sx={{ fontSize: 80 }} />
            </div>
            <div className="self-center font-medium text-xl">
              Seniors and PWD
            </div>
          </div>
          <div>
            <div className="w-[50%] bg-[#033AA9] text-white p-2 rounded-r-2xl">
              Seniors : 45
            </div>
            <div className="w-[80%] bg-[#CF1429] text-white p-2 mt-1 rounded-r-2xl">
              PWD : 400
            </div>
          </div>
        </div>

        <div className="bg-white flex-col px-10 py-2 rounded-2xl">
          <h3 className="text-center font-medium text-xl mb-2">
            Barangay Officials
          </h3>

          <h5 className="font-medium text-sm leading-6">Punong Barangay</h5>
          <p className="text-center text-sm leading-6">Joecel Alberto</p>

          <h5 className="font-medium text-sm leading-6">Kagawad</h5>
          <p className="text-center text-sm leading-6">Stevenot De Leon</p>
          <p className="text-center text-sm leading-6v">Rodolfo Jose</p>
          <p className="text-center text-sm leading-6">Alfonso Demillo Jr.</p>
          <p className="text-center text-sm leading-6">Jhonny Fernandez</p>
          <p className="text-center text-sm leading-6">Camilo Mempin</p>
          <p className="text-center text-sm leading-6">Antonio Fabia</p>
          <p className="text-center text-sm leading-6">Benison Acaya</p>

          <h5 className="font-medium text-sm leading-6">SK Chairman</h5>
          <p className="text-center text-sm leading-6">Osmaleth Senangelo</p>

          <h5 className="font-medium text-sm leading-6">Treasurer</h5>
          <p className="text-center text-sm leading-6">Emilia Sevandra</p>

          <h5 className="font-medium text-sm leading-6">Secretary</h5>
          <p className="text-center text-sm leading-6">Regina Esber</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
