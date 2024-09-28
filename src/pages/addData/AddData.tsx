import { ChangeEvent, useEffect, useState, FormEvent, useRef } from "react";
import "./addData.scss";
import LoadingBar from "@/components/LoadingBar/LoadingBar";
import InputField from "@/components/inputField/InputField";
import Toast from "@/components/toast/Toast";
import * as ACTIONS from "../../store/actions/action_types";
import { smoothScrollTo } from "@/interface/functions";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
const initialState = {
  title: "",
  firstName: "",
  lastName: "",
  Date: "",
  email: "",
  phoneNumber: "",
  partnershipAmount: "",
  givingsAmount: "",
};
const AddData = () => {
  const [toastType, setToastType] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useDispatch();
  // DEFINE FORM DATA
  // DELETE OPTIONS FIELD
  // UPDATE FORM DATA CORRECTLY
  // UPDATE THE VALIDATE ERRORRS
  // ENABLE PUT REQUEST
  // STYING

  // Sample data based on your backend requirements
  const [formData, setFormData] = useState(initialState);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateField = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title)
      newErrors.title = "Even the Lord had a title - please provide yours.";
    if (!formData.firstName)
      newErrors.firstName = "Just as God called people by name, what is yours?";
    if (!formData.lastName)
      newErrors.lastName = "The lineage matters - what is your surname?";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email =
        "As God sent messages to prophets, we need your email to reach you.";
    if (!formData.phoneNumber)
      newErrors.phoneNumber =
        "How will we call if the trumpet sounds? Please provide your number.";
    if (!formData.Date)
      newErrors.Date =
        "In the beginning, God set a date – please provide yours.";
    if (!formData.partnershipAmount)
      newErrors.partnershipAmount =
        "Remember the widow’s mite – select a partnership amount.";
    if (!formData.givingsAmount)
      newErrors.givingsAmount =
        "For where your treasure is, there your heart will be also";
    return newErrors;
  };

  const addition = (first: number, second: number) => {
    return first + second;
  };

  const handleSubmit = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const form = formRef.current;

    if (form === null) return; // Guard to ensure formRef.current is not null

    // TypeScript now knows `form` is not null, so `querySelector` is safe
    const firstInvalidField = form.querySelector(
      ":invalid"
    ) as HTMLElement | null;

    if (firstInvalidField) {
      smoothScrollTo(firstInvalidField, 500); // Slow scroll (1000ms)
      firstInvalidField.focus();
    }

    const validationErrors = validateField();
    setErrors(validationErrors);
    console.log(errors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);

      // Convert partnershipAmount and givingsAmount to numbers before addition
      const partnershipAmount =
        parseFloat(formData.partnershipAmount.toString()) || 0;
      const givingsAmount = parseFloat(formData.givingsAmount.toString()) || 0;

      const formDataToSend = {
        title: formData.title,
        firstName: formData.firstName,
        lastName: formData.lastName,
        Date: format(formData.Date, "yyyy-MM-dd"),
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        partnershipsTotal: partnershipAmount,
        givingsTotal: givingsAmount,
        total: addition(partnershipAmount, givingsAmount), // Corrected addition
      };

      console.log(formDataToSend);

      dispatch({
        type: ACTIONS.ADD_DATATABLE,
        payload: formDataToSend,
      });

      setTimeout(() => {
        setLoading(false);
        setToastType("success");
        setToastMessage("User Data Created");
        setFormData(initialState);
        setTimeout(() => {
          setToastType("");
        }, 3000);
      }, 1500);
    }
  };

  // Loading logic
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  if (loader) return <LoadingBar height="90vh" />;

  return (
    <div className="addDataContainer">
      <form ref={formRef} className="inputFieldContainer">
        <div>
          <InputField
            type="text"
            name="title"
            label="Title"
            placeholder="e.g Brother, Sister"
            required
            onChange={handleChange}
            value={formData.title}
          />
          <span className="error-message ">{errors.title}</span>
        </div>

        <div>
          <InputField
            type="text"
            name="firstName"
            label="First Name"
            placeholder="e.g David"
            required
            onChange={handleChange}
            value={formData.firstName}
          />
          <span className="error-message ">{errors.firstName}</span>
        </div>

        <div>
          <InputField
            type="text"
            name="lastName"
            label="Last Name"
            placeholder="e.g Maduabuchi"
            required
            onChange={handleChange}
            value={formData.lastName}
          />
          <span className="error-message ">{errors.lastName}</span>
        </div>

        <div>
          <InputField
            type="email"
            name="email"
            label="Email"
            placeholder="e.g example@gmail.com"
            required
            onChange={handleChange}
            value={formData.email}
          />
          <span className="error-message">{errors.email}</span>
        </div>

        <div>
          <InputField
            type="tel"
            name="phoneNumber"
            label="Phone Number"
            placeholder="08164413182"
            required
            onChange={handleChange}
            value={formData.phoneNumber}
          />
          <span className="error-message">{errors.phoneNumber}</span>
        </div>

        <div>
          <InputField
            type="date"
            name="Date"
            label="Date"
            required
            onChange={handleChange}
            value={formData.Date}
          />
          <span className="error-message">{errors.Date}</span>
        </div>
      </form>

      {/* Partnership Arms Section */}
      <div className="optionsFieldContainer">
        <h5 className="font-bold">Partnership Arms</h5>

        <div>
          <InputField
            type="number"
            name="partnershipAmount"
            label=""
            required
            placeholder="Amount(N)"
            onChange={handleChange}
            value={formData.partnershipAmount}
          />
          <span className="error-message">{errors.partnershipAmount}</span>
        </div>
      </div>

      {/* Givings Type Section */}
      <div className="optionsFieldContainer">
        <h5 className="font-bold">Givings Type</h5>

        <div>
          <InputField
            type="number"
            name="givingsAmount"
            label=""
            placeholder="Amount(N)"
            required
            onChange={handleChange}
            value={formData.givingsAmount}
          />
          <span className="error-message">{errors.givingsAmount}</span>
        </div>
      </div>
      {loading ? (
        <div className="buttonContainer">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="buttonContainer">
          <button
            onClick={() => {
              setErrors({});
              setFormData(initialState);
            }}
            className="cancel"
          >
            Clear
          </button>
          <button onClick={handleSubmit} className="save">
            Save
          </button>
        </div>
      )}
      {toastType !== "" && (
        <Toast
          type={toastType}
          successMessage={toastMessage}
          successSubmessage="Thank you for your time"
        />
      )}
    </div>
  );
};

export default AddData;
