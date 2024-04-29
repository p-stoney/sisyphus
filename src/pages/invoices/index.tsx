import { useState, useMemo } from "react";
import { api, type RouterOutputs } from "~/utils/api";
import type { IFilterCriteria, FilterOption } from "~/types";
import MainContent from "~/components/common/MainContent";
import { List } from "~/components/common/List";
import InvoiceHeader from "~/components/invoices/InvoiceHeader";
import InvoiceItem from "~/components/invoices/InvoiceItem";
import InvoiceModal from "~/components/invoices/InvoiceModal";

type Invoice = RouterOutputs["invoice"]["getAll"][number];

const InvoicesPage = () => {
  const { data } = api.invoice.getAll.useQuery();

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const handleNewInvoiceClick = () => setModalOpen(true);

  const [filterCriteria, setFilterCriteria] = useState<IFilterCriteria>({
    paid: undefined,
    pending: undefined,
    distributorName: undefined,
    id: undefined,
  });

  const pendingInvoicesCount = data?.filter(
    (invoice) => invoice.status === "UNPAID",
  ).length;

  const handleFilterChange = (newCriteria: IFilterCriteria) => {
    setFilterCriteria(newCriteria);
  };

  const filterOptions: FilterOption[] = [
    { value: "true", label: "Paid" },
    { value: "false", label: "Pending" },
  ];

  const filteredInvoices = useMemo(() => {
    return (
      data?.filter((invoice) => {
        const matchesStatus =
          filterCriteria.paid !== undefined
            ? (filterCriteria.paid && invoice.status === "PAID") ||
              (!filterCriteria.paid && invoice.status === "UNPAID")
            : true;
        const matchesDistributor = filterCriteria.distributorName
          ? invoice.distributor.name
              .toLowerCase()
              .includes(filterCriteria.distributorName.toLowerCase())
          : true;
        const matchesId = filterCriteria.id
          ? invoice.id.includes(filterCriteria.id)
          : true;

        return matchesStatus && matchesDistributor && matchesId;
      }) || []
    );
  }, [data, filterCriteria]);

  return (
    <MainContent>
      <InvoiceHeader
        pendingInvoiceCount={pendingInvoicesCount}
        onNewInvoiceClick={handleNewInvoiceClick}
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
        filterCriteria={filterCriteria}
      />
      <List
        data={filteredInvoices}
        renderItem={(invoice: Invoice) => (
          <InvoiceItem
            key={invoice.id}
            id={invoice.id}
            paymentDueDate={invoice.dueBy.toISOString().slice(0, 10)}
            distributorName={invoice.distributor.name}
            amountDue={invoice.totalDue}
            status={invoice.isPaid ? "PAID" : "UNPAID"}
          />
        )}
      />
      <InvoiceModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </MainContent>
  );
};

export default InvoicesPage;
