import { useAuth } from "@clerk/nextjs";
import { useState, useMemo } from "react";
import { api, type RouterOutputs } from "~/utils/api";
import type { IFilterCriteria, FilterOption } from "~/types";
import PageContent from "~/components/common/PageContent";
import { List } from "~/components/common/List";
import InvoiceHeader from "~/components/invoices/InvoiceHeader";
import InvoiceItem from "~/components/invoices/InvoiceItem";
import InvoiceModal from "~/components/invoices/InvoiceModal";

type Invoice = RouterOutputs["invoice"]["getAll"][number];

const InvoicesPage = () => {
  const { userId } = useAuth();

  const activeId = userId as string;

  const { data } = api.invoice.getAll.useQuery({ userId: activeId });

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const handleNewInvoiceClick = () => setModalOpen(true);

  const [filterCriteria, setFilterCriteria] = useState<IFilterCriteria>({});

  const pendingInvoicesCount = data?.filter(
    (invoice) => invoice.status === "UNPAID",
  ).length;

  const handleFilterChange = (newCriteria: IFilterCriteria) => {
    setFilterCriteria(newCriteria);
  };

  const filterOptions: FilterOption[] = [
    { label: "Paid", value: "PAID" },
    { label: "Pending", value: "UNPAID" },
  ];

  const filteredInvoices = useMemo(() => {
    return (
      data?.filter((invoice) => {
        const nameToLower = invoice.distributor.name.toLowerCase();
        const filterToLower = filterCriteria.name?.toLowerCase() || "";

        const matchesDistributor = nameToLower.includes(filterToLower);
        const matchesStatus = filterCriteria.status
          ? invoice.status === filterCriteria.status
          : true;
        const matchesId = filterCriteria.id
          ? invoice.id.includes(filterCriteria.id)
          : true;

        return matchesStatus && matchesDistributor && matchesId;
      }) || []
    );
  }, [data, filterCriteria]);

  return (
    <PageContent>
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
            name={invoice.distributor.name}
            amountDue={invoice.totalDue}
            status={invoice.isPaid ? "PAID" : "UNPAID"}
          />
        )}
      />
      <InvoiceModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </PageContent>
  );
};

export default InvoicesPage;
