import React from "react";
import { Formik, Form } from "formik";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import {
  type FormValues,
  ValidationSchema,
  initialFormValues,
  usStates,
  paymentTermsOptions,
} from "~/server/helpers/formUtils";
import DistributorInfo from "./DistributorInfo";
import PaymentTermsField from "../common/PaymentTermsField";
import Modal from "../common/Modal";
import { ButtonWithProps } from "../common/Button";
import styled from "styled-components";

const ModalButton = styled(ButtonWithProps)`
  margin-top: 1.5rem;
  margin-right: 0.25rem;
  float: inline-end;
`;

interface DistributorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DistributorModal: React.FC<DistributorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const newDistributor = api.distributor.createDistributor.useMutation();

  const handleSubmit = (values: FormValues) => {
    newDistributor.mutate(
      {
        name: values.name,
        email: values.email,
        address: values.address,
        city: values.city,
        state: values.state,
        postalCode: values.postalCode,
        paymentTerms: values.paymentTerms,
      },
      {
        onSuccess: () => {
          onClose();
        },
        onError: (error) => {
          console.error("Error creating distributor:", error);
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Distributor">
      <Formik<FormValues>
        initialValues={initialFormValues}
        validationSchema={zodResolver(ValidationSchema)}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, errors, touched }) => (
          <Form>
            <DistributorInfo
              values={values}
              handleChange={handleChange}
              distributors={[]}
              usStates={usStates}
              errors={errors}
              touched={touched}
            />
            <PaymentTermsField
              paymentTerms={values.paymentTerms}
              setPaymentTerms={(value) => handleChange("paymentTerms")(value)}
              paymentTermsOptions={paymentTermsOptions}
            />
            <ModalButton type="submit">Save Distributor</ModalButton>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default DistributorModal;
