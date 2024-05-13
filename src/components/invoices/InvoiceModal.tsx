import React from "react";
import { useAuth } from "@clerk/nextjs";
import { Formik, Form, FieldArray } from "formik";
import { Grid } from "@mui/material";
// import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import {
  type FormValues,
  invoiceValidationSchema,
  initialFormValues,
  usStates,
  paymentTermsOptions,
} from "~/server/helpers/formUtils";
import DistributorInfo from "../distributors/DistributorInfo";
import InvoiceDateTerms from "./InvoiceDateTerms";
import PaymentTermsField from "../common/PaymentTermsField";
import ItemsList from "./InvoiceItemsList";
import Modal from "../common/Modal";
import { ButtonWithProps } from "../common/Button";
import styled from "styled-components";

const ModalButton = styled(ButtonWithProps)`
  margin-top: 1.5rem;
  margin-right: 0.25rem;
  float: inline-end;
`;

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ isOpen, onClose }) => {
  const { userId } = useAuth();
  const activeId = userId as string;

  const [distributorId, setDistributorId] = React.useState("");

  const newInvoice = api.invoice.createInvoice.useMutation();
  const { data: businessId, isLoading: isBusinessIdLoading } =
    api.user.getBusinessId.useQuery({ userId: activeId });

  const { data: distributors = [], isLoading: areDistributorsLoading } =
    api.distributor.getAll.useQuery({ userId: activeId });

  const handleSubmit = (values: FormValues) => {
    if (!businessId) {
      console.error("Business ID not loaded");
      return;
    }

    newInvoice.mutate(
      {
        ...values,
        distributorId: distributorId,
        businessId: businessId,
      },
      {
        onSuccess: () => onClose(),
        onError: (error) => console.error("Error creating invoice:", error),
      },
    );
  };

  if (isBusinessIdLoading || areDistributorsLoading)
    return <div>Loading...</div>;
  if (!businessId) return <div>Business ID not available.</div>;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Invoice">
      <Formik
        initialValues={initialFormValues}
        validationSchema={invoiceValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form>
            <DistributorInfo
              values={values}
              setFieldValue={setFieldValue}
              distributors={distributors}
              usStates={usStates}
              setDistributorId={setDistributorId}
              errors={errors}
              touched={touched}
              isDropdown={true}
            />
            <Grid container spacing={2} marginBottom=".75rem">
              <InvoiceDateTerms
                setFieldValue={(value) =>
                  setFieldValue("dateGenerated", Number(value), false)
                }
                errors={errors}
                touched={touched}
              />
              <PaymentTermsField
                paymentTerms={values.paymentTerms}
                setPaymentTerms={(value) =>
                  setFieldValue("paymentTerms", Number(value), false)
                }
                paymentTermsOptions={paymentTermsOptions}
              />
            </Grid>
            <FieldArray
              name="items"
              render={(arrayHelpers) => (
                <ItemsList
                  values={values}
                  arrayHelpers={arrayHelpers}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  touched={touched}
                />
              )}
            />
            <ModalButton type="submit">Save Invoice</ModalButton>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default InvoiceModal;
