import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { withRouter } from "react-router-dom";
import "./todo.css";

class ProductForm extends React.Component {
  render() {
    return (
      <Formik
        initialValues={{
          name: '',
        }}
        validate={values => {
          let errors = {};
          if (!values.name) {
            errors.name = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          this.props.saveName(values).then(name => {
            setSubmitting(false);

            if (name) {
              const url = `/todo`;
              this.props.history.push(url);
            }
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field className="input_item" type="text" name="name" />
              <ErrorMessage name="name" component="div" />
            </div>
          </Form>
        )}
      </Formik>
    );
  }
}

export default withRouter(ProductForm);
