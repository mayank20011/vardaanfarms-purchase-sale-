import { purchasingFrom } from "./PurchaseData";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
const Purchase = () => {
  const [loading, setLoading] = useState(false);
  const [fat, setFat] = useState();
  const [clr, setClr] = useState();
  const [snf, setSnf] = useState(0);

  const calculateSNF = () => {
    const snfValue = clr / 4 + (fat / 100) * 0.2 + 0.66;
    setSnf(snfValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (
      formData.get("purchasingFrom") == "" ||
      formData.get("volume") == 0 ||
      fat == 0 ||
      snf == 0 ||
      clr == 0
    ) {
      toast.error("All Fields are required");
    } else {
      setLoading(true);
      const payload = {
        sheetName: formData.get("purchasingFrom"),
        data: {
          Date: new Date().toLocaleDateString(),
          Volume: formData.get("volume"),
          Fat: fat,
          SNF: snf,
          CLR: clr,
        },
      };
      console.log(payload);
      axios
        .post(
          "https://script.google.com/a/macros/vardaanfarms.com/s/AKfycby2SLfUiE18UprM9Ms5SGjWTQSthCfxM6MXkjjcDg6kzXGrgaxlORf01r-1wUlNz6TV/exec",
          payload
        )
        .then((res) => {
          console.log(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.name);
          setLoading(false);
        });
    }
  };
  return (
    <div className="p-6 min-h-screen flex items-center justify-center">
      <ToastContainer />
      <form
        className="max-w-[500px] min-w-[300px] w-4/5 p-6 border rounded-2xl flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-semibold  text-center">Purchasing Form</h1>
        <div className="flex flex-col gap-1">
          <label htmlFor="purchasingFrom">Purchasing From</label>
          <select
            name="purchasingFrom"
            id="listOfVendors"
            className="bg-slate-200 p-2 px-4 rounded-sm outline-none"
            required
          >
            {purchasingFrom.map((user) => (
              <option value={user.name} key={user.name}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="volume">Enter Milk Volume (ltrs):</label>
          <input
            name="volume"
            type="number"
            min="0"
            step="any"
            placeholder="Enter Volume of Milk You are Purchasing ..."
            className="bg-slate-200 p-2 px-4 rounded-sm outline-none"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="fat">Enter Fat (%) :</label>
          <input
            name="fat"
            type="number"
            min="0"
            max="10"
            step="any"
            placeholder="Fat Percent in milk is  ..."
            className="bg-slate-200 p-2 px-4 rounded-sm outline-none"
            required
            value={fat}
            onChange={(e) => {
              setFat(e.target.value);
              calculateSNF();
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="clr">Enter CLR Value :</label>
          <input
            name="clr"
            type="number"
            min="0"
            step="any"
            placeholder="What is the CLR value of milk ..."
            className="bg-slate-200 p-2 px-4 rounded-sm outline-none"
            required
            value={clr}
            onChange={(e) => {
              setClr(e.target.value);
              calculateSNF();
            }}
          />
        </div>
        <p>
          {`SNF Value is: `}{" "}
          <span className="p-2 bg-red-600 px-4 font-semibold rounded-lg">
            {snf}
          </span>
        </p>
        <button
          type="submit"
          className={`px-4 py-2  text-white rounded-2xl hover:scale-95 transition font-semibold ${
            loading
              ? "bg-slate-200 cursor-not-allowed"
              : "bg-orange-400 cursor-pointer"
          }`}
          disabled={loading}
        >
          {loading ? (
            <p className="p-3 w-fit border-2 mx-auto rounded-full border-black border-t-0 border-l-0 animate-spin"></p>
          ) : (
            <p>Submit</p>
          )}
        </button>
      </form>
    </div>
  );
};

export default Purchase;
