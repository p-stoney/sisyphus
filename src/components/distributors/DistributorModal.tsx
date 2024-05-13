import React from "react";
import { useAuth } from "@clerk/nextjs";
import { Formik, Form } from "formik";
// import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import {
  type FormValues,
  baseValidationSchema as ValidationSchema,
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
  const { userId } = useAuth();

  const activeId = userId as string;

  const { data: businessId, isLoading: isBusinessIdLoading } =
    api.user.getBusinessId.useQuery({ userId: activeId });
  const newDistributor = api.distributor.createDistributor.useMutation();

  const handleSubmit = async (values: FormValues) => {
    if (!businessId) {
      console.error("Business ID not loaded");
      return;
    }

    try {
      await newDistributor.mutateAsync({
        ...values,
        businessId,
      });
      onClose();
    } catch (error) {
      console.error("Failed to create distributor", error);
    }
  };

  if (isBusinessIdLoading) return <div>Loading business details...</div>;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Distributor">
      <Formik
        initialValues={initialFormValues}
        validationSchema={ValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form>
            <DistributorInfo
              values={values}
              setFieldValue={setFieldValue}
              distributors={[]}
              usStates={usStates}
              errors={errors}
              touched={touched}
              isDropdown={false}
            />
            <PaymentTermsField
              paymentTerms={values.paymentTerms}
              setPaymentTerms={(value) =>
                setFieldValue("paymentTerms", Number(value), false)
              }
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
