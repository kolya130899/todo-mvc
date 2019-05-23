import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { saveNewProduct } from "../../ducks/products";

class NewProduct extends React.Component {
  render() {
    return (
      <div>
        <h1>New product</h1>

        <Formik
          initialValues={{ name: "", description: "" }}
          validate={values => {
            let errors = {};
            if (!values.name) {
              errors.name = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            this.props.saveNewProduct(values).then(product => {
              setSubmitting(false);

              if (product) {
                const url = `/products/${product.id}`;
                this.props.history.push(url);
              }
            });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <label>name</label>
                <Field type="text" name="name" />
                <ErrorMessage name="name" component="div" />
              </div>

              <div>
                <label>description</label>
                <Field type="text" name="description" />
                <ErrorMessage name="description" component="div" />
              </div>

              <div>
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default connect(
  null,
  {
    saveNewProduct
  }
)(withRouter(NewProduct));
