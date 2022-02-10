import { useFormik } from "formik";
import * as Yup from "yup";

function validate(values) {
  const errors = {};

  if (!values.department) {
    errors.department = "Department is required.";
  }
  if (!values.message) {
    errors.message = "Message is required.";
  }
  if (!values.agreedToTerms) {
    errors.agreedToTerms = "You must agree to the terms and conditions.";
  }
  return errors;
}

function ContactUsForm() {
  const formik = useFormik({
    initialValues: {
      department: "",
      message: "",
      agreedToTerms: false,
    },
    // validate,
    validationSchema: Yup.object({
      department: Yup.string().required("Department is required"),
      message: Yup.string().required("Message is required"),
      agreedToTerms: Yup.boolean()
        .required("The terms and conditions must be accepted.")
        .oneOf([true], "The terms and conditions must be accepted."),
    }),
    onSubmit: (values) => {
      console.log("submitting", JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <select
        name="department"
        value={formik.values.department}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      >
        <option value="">Select...</option>
        <option value="hr">Human Resources</option>
        <option value="pr">Public Relations</option>
        <option value="support">Support</option>
      </select>
      <br />
      {formik.touched.department && formik.errors.department && (
        <p className="alert">{formik.errors.department}</p>
      )}
      <br />
      <textarea
        name="message"
        value={formik.values.message}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        cols="30"
        rows="10"
      />
      <br />
      {formik.touched.message && formik.errors.message && (
        <p className="alert">{formik.errors.message}</p>
      )}
      <input
        type="checkbox"
        name="agreedToTerms"
        checked={formik.values.agreedToTerms}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      I agree to the terms and conditions.
      <br />
      {formik.touched.agreedToTerms && formik.errors.agreedToTerms && (
        <p className="alert">{formik.errors.agreedToTerms}</p>
      )}
      <button type="submit">Send</button>
      <pre>{JSON.stringify(formik.errors, null, 2)}</pre>
      <pre>{JSON.stringify(formik.values, null, 2)}</pre>
    </form>
  );
}

export default ContactUsForm;
