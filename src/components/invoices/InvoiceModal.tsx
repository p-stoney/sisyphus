import React from "react";
import { Formik, Form, FieldArray } from "formik";
import { zodResolver } from "@hookform/resolvers/zod";
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
  const [distributorId, setDistributorId] = React.useState("");
  const newInvoice = api.invoice.createInvoice.useMutation();
  const {
    data: distributor,
    isLoading,
    isError,
  } = api.distributor.getById.useQuery(
    { distributorId },
    { enabled: !!distributorId },
  );

  const handleSubmit = (values: FormValues) => {
    if (!distributor) {
      console.error("Distributor details not loaded");
      return;
    }

    newInvoice.mutate(
      {
        distributorId: distributor.id,
        items: values.items || [],
        paymentTerms: values.paymentTerms,
        dateGenerated: values.dateGenerated || "",
      },
      {
        onSuccess: () => onClose(),
        onError: (error) => console.error("Error creating invoice:", error),
      },
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !distributor)
    return <div>Error loading distributor details.</div>;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Invoice">
      <Formik<FormValues>
        initialValues={initialFormValues}
        validationSchema={zodResolver(invoiceValidationSchema)}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, errors, touched }) => (
          <Form>
            <DistributorInfo
              values={values}
              handleChange={handleChange}
              distributors={[]}
              usStates={usStates}
              setDistributorId={setDistributorId}
              errors={errors}
              touched={touched}
            />
            <InvoiceDateTerms
              values={values}
              handleChange={handleChange}
              paymentTermsOptions={paymentTermsOptions}
              errors={errors}
              touched={touched}
            />
            <FieldArray
              name="items"
              render={(arrayHelpers) => (
                <ItemsList
                  values={values}
                  arrayHelpers={arrayHelpers}
                  handleChange={handleChange}
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
