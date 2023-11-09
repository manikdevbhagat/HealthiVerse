import TrainerAccount from "../../components/Dashboard/trainers/TrainerAccount";
import TrainerUpdateForm from "../../components/Dashboard/trainers/TrainerUpdateForm";

const TrainerProfile = () => {
  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-10">
          <TrainerAccount/>
          <div className="md:col-span-2 md:px-[30px]">
            <TrainerUpdateForm/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainerProfile;
